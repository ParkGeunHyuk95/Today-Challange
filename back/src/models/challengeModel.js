const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class challengeModel {
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

  // Get (선택한 항목)
}
export { challengeModel };
