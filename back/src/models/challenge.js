const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Challenge {
  // create/ post
  static async create({ newChallenge }) {
    // console.log(newChallenge.explainImg);
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

  // 수정
  static async update({ id, toUpdate }) {
    console.log("수정 되나? 모델:", toUpdate.title, toUpdate.mainImg);
    const renewChallenge = await prisma.challenge.update({
      where: {
        challengeId: Number(id),
      },
      data: {
        title: toUpdate.title,
        description: toUpdate.description,
        fromDate: toUpdate.fromDate,
        toDate: toUpdate.toDate,
        method: toUpdate.method,
        mainImg: toUpdate.mainImg,
        explainImg: toUpdate.explainImg,
      },
    });

    return renewChallenge;
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
export { Challenge };
