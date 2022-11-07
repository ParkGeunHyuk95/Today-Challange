const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class chat {
  static async storeChat({ chatData }) {
    console.log("chat model::", chatData);
    const data = await prisma.chat.create({
      data: {
        content: chatData.content,
        userId: chatData.userId,
        name: chatData.name,
        date: chatData.date,
        time: chatData.time,
        challenge: {
          // connect: { challengeId: Number(chatData.challengeId) },
          connect: { challengeId: 92 },
        },
      },
    });
  }

  static async getMessage(room) {
    console.log("model))-getMessage: challenge title ", room);
    const getMessages = await prisma.challenge.findUnique({
      where: {
        title: room,
      },
    });
    console.log(
      "model))-getMessage:채널에 있는 모든 메세지!!!!!1",
      getMessages
    );
    return getMessages;
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
