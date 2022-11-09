const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ChallengeToJoin {
  static async getChallengeToJoin() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }
}

export { ChallengeToJoin };
