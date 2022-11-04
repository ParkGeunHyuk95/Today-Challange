const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class chat {
  static async storeChat({ message }) {
    console.log("model::", message.msg);
    const data = await prisma.chat.create({
      data: {
        content: message.msg,
        roomId: "hello",
        userId: "ajsjsakdh",
        name: "sdkj",
        challenge: {
          connect: { challengeId: 1 },
        },
      },
    });
  }

  static async getJoinChallengeList({ userId }) {
    const JoinChallengeList = await prisma.userToChallenge.findMany({
      where: {
        userId: userId,
      },
      select: {
        userToChallengeId: true,
        challenge: true,
      },
    });
    return JoinChallengeList;
  }

  // static async createRoom() {
  //   await prisma.chat.create();
  // }
}

export { chat };
