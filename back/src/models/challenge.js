const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class challenge {
  // create/ post(유저별로 수정할 것)
  static async create({ newChallenge }) {
    const createdChallenge = await prisma.challenge.create({
      data: newChallenge,
    });
    return createdChallenge;
  }

  // 전체 불러오기 (get)
  static async findMany() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }

  // (params 값) 게시물 1개 선택
  static async findUnique(id) {
    const challenge = await prisma.challenge.findUnique({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
  static async findMany() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }

  // (params 값) 게시물 1개 선택
  static async findUniqueId(id) {
    const challenge = await prisma.challenge.findUnique({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
  // Delete
  static async delete(id) {
    const challenge = await prisma.challenge.delete({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
}
export { challenge };
