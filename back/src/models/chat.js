const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class chat {
  static async findChallenge({ room }) {
    console.log(typeof room);
    const challengeId = await prisma.challenge.findFirst({
      where: {
        title: room,
      },
      select: {
        challengeId: true,
      },
    });
    return challengeId;
  }
  static async storeChat({ chatData }) {
    const challengeId = chatData.challengeId;

    const data = await prisma.chat.create({
      data: {
        content: chatData.content,
        userId: chatData.userId,
        name: chatData.name,
        date: chatData.date,
        time: chatData.time,
        challenge: {
          connect: { challengeId: challengeId.challengeId },
          // connect: { challengeId: 92 },
        },
      },
    });
    console.log("model data", data);
  }

  static async getMessage({ challengeId }) {
    const getMessages = await prisma.chat.findMany({
      where: {
        challengeId: challengeId.challengeId,
      },
    });
    console.log(
      "🦄🦄🦄model))-getMessage:채널에 있는 모든 메세지!!!!!1",
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
