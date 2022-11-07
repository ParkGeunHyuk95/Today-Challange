import { loginRequired } from "../middlewares/loginRequired";
import { Router } from "express";
import { chatService } from "../services/chatService";
const chatRouter = Router();

//user별 참가한 챌린지 조회(마이페이지)
chatRouter.get("/userToChat", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const userJoinChallengeList = await chatService.getUserChallengeInfo({
      userId,
    });
    const title = userJoinChallengeList.map((obj) => {
      return obj.challenge.title;
    });
    //   res.status(200).send(title);
    res.status(200).send(userJoinChallengeList);
  } catch (error) {
    next(error);
  }
});
export { chatRouter };
