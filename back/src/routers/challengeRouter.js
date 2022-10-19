import { Router } from "express";
import { challengeService } from "../services/challengeService";
import { addImage } from "../middlewares/addImage";
import { loginRequired } from "../middlewares/loginRequired";
import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const upload = addImage("uploads");
const multiImg = upload.fields([
  { name: "main", maxCount: 1 },
  { name: "explain", maxCount: 2 },
]);

const challengeRouter = Router();

challengeRouter.post("/", loginRequired, multiImg, async (req, res, next) => {
  // console.log(req);
  try {
    const holdUserId = req.currentUserId;
    const { title, description, fromDate, toDate } = req.body;

    const image = req.files;
    const mainImg = image.main[0];

    const explainImg = image.explain;
    const explainImgPath = explainImg.map((img) => img.path);

    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }

    const newChallenge = await challengeService.addChallenge({
      holdUserId,
      title,
      description,
      fromDate,
      toDate,
      mainImg: `uploads/${mainImg.path}`,
      explainImg: `uploads/${explainImgPath}`,
    });
    if (newChallenge.errorMessage) {
      throw new Error(newChallenge.errorMessage);
    }

    res.status(201).json({ newChallenge });
  } catch (error) {
    next(error);
  }
});

// Get (전체)
challengeRouter.get("/", async (req, res) => {
  const result = await challengeService.getChallenges();
  res.status(200).json({ result });
});

// Get (진행중인 챌린지 전체) 보류
challengeRouter.get("/ongoing", async (req, res) => {
  const result = await challengeService.getOngoing();
  res.status(200).json({ result });
});

// Get (선택한 항목 1개)
challengeRouter.get("/mine/:id", loginRequired, async (req, res) => {
  const userId = req.currentUserId;
  const { id } = req.params;

  // 해당 사용자 아이디로 챌린지 정보를 db에서 찾아 업데이트
  const updateChallenge = await challengeService.findUniqueUser({ userId, id });

  res.status(200).json({ updateChallenge });
});

// Delete
// 폴더의 파일도 삭제 할 수가 있는지?
// 시작 전 삭제 막기
challengeRouter.delete("/:id", loginRequired, async (req, res) => {
  const userId = req.currentUserId;
  const { id } = req.params;
  const foundChallenge = await challengeService.findUniqueId(id);

  const result = await challengeService.deleteOne(id);
  res.status(200).json({ result });
});

// 챌린지 시작 전에는 수정 못하는 코드 작성 // 3계층 분리...
challengeRouter.put("/:id", multiImg, loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { id } = req.params;
    const { title, description, fromDate, toDate } = req.body;

    const image = req.files;
    const mainImg = image.main[0];

    const explainImg = image.explain;
    const explainImgPath = explainImg.map((img) => img.path);

    if (image === undefined) {
      return res.status(400).send("cannot find image.");
    }
    if (dayCountsBetweenTodayAnd(req.body.fromDate) >= 0) {
      return res
        .status(400)
        .send("cannot modify it after the challenge begins.");
    }

    console.log(explainImgPath);
    const updatedChallenge = await prisma.challenge.update({
      where: {
        challengeId: Number(id),
      },
      data: {
        title,
        description,
        fromDate,
        toDate,
        mainImg: `uploads/${mainImg.path}`,
        explainImg: `uploads/${explainImgPath}`,
        startRemainingDate: dayCountsBetweenTodayAnd(fromDate),
        endRemainingDate: dayCountsBetweenTodayAnd(toDate) * -1,
      },
    });

    res.status(200).json({ updatedChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// // get(1개 불러오기/ login 한 유저꺼 불러오기)
// challengeRouter.get("/mine/:id", loginRequired, async (req, res) => {
//   // const userId = req.currentUserId;

//   const { id } = req.params;

//   const result = await challengeService.findUniqueId(id);

//   res.status(200).json({ result });
// });

export { challengeRouter };
