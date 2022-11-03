const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Liked {
  static async filterLiked({ userId, challengeId }) {
    const filter = await prisma.liked.findMany({
      where: {
        userId: userId,
        challengeId: challengeId,
      },
    });
    console.log("filter:", filter[0]);
    console.log("filter:", filter);
    return filter;
  }
  static async createLiked({ likedId, userId, challengeId }) {
    const Liked = await prisma.liked.create({
      data: {
        likedId,
        user: {
          connect: { userId: userId },
        },
        challenge: {
          connect: { challengeId: challengeId },
        },
      },
    });
    return Liked;
    return;
  }

  static async removeLiked({ likedId }) {
    const liked = await prisma.liked.delete({
      where: {
        likedId: likedId,
      },
    });
    return;
  }
  static async getLikedList({ userId }) {
    const likedList = await prisma.liked.findMany({
      where: { userId: userId },
      select: {
        challenge: true,
      },
    });
    return likedList;
  }
  //likedCount
  static async getLikedCount({ challengeId }) {
    const likedList = await prisma.liked.findMany({
      where: {
        challengeId: Number(challengeId),
      },
    });
    // console.log("liked List model:", likedList.userId);
    return likedList;
  }
}

export { Liked };
