const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class joinedChallenge {
  // 참여자 수 세기 (joinedChallenge 에서 chalngId = 1인 코드를 찾아 센다)
  static async count({ id }) {
    const countJoinedChallenge = await prisma.joinedChallenge.count({
      where: {
        chalngId: Number(id),
      },
    });
    return countJoinedChallenge;
  }
  // 인증 업로드 코드
  static async create({ id, userId, countUploads, image, description }) {
    const PORT = process.env.SERVER_PORT || 5000;
    const addedImage = `http://localhost:${PORT}/${image}`;
    const createdChallenge = await prisma.joinedChallenge.create({
      data: {
        user: {
          connect: { userId: userId },
        },
        countUpload: countUploads,
        addedImage: addedImage,
        description: description,
        challenges: {
          connect: {
            challengeId: Number(id),
          },
        },
      },
    });
    return createdChallenge;
  }

  static async findUnique(challengeId) {
    // 인증한 챌린지의 정보 불러오기
    const challengeInfo = await prisma.challenge.findUnique({
      where: { challengeId: Number(challengeId) },
    });
    return challengeInfo;
  }

  static async findMany(challengeId) {
    // 해당 챌린지의 인증 전부 가져오기
    const challengeInfo = await prisma.joinedChallenge.findMany({
      where: { chalngId: Number(challengeId) },
    });
    return challengeInfo;
  }
}

export { joinedChallenge };
