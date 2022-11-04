import { Liked } from "../models/Liked";
import { v4 as uuidv4 } from "uuid";

class likedService {
  static async createLiked({ userId, challengeId }) {
    const likedId = uuidv4();

    const filter = await Liked.filterLiked({ userId, challengeId });

    if (filter[0] !== undefined) {
      const likedId = filter[0].likedId;
      await Liked.removeLiked({ likedId });
      const errorMessage = "liked 해제";
      return errorMessage;
    } else {
      await Liked.createLiked({ likedId, userId, challengeId });
    }

    const getLiked = await Liked.likedCount({ challengeId });
    console.log(getLiked);
    return getLiked;
    // return addLiked;
  }

  static async deleteLiked({ likedId }) {
    await Liked.removeLiked({ likedId });
  }

  static async getLiked({ userId }) {
    const getLiked = await Liked.getLikedList({ userId });
    return getLiked;
  }

  static async getLikedCount({ challengeId }) {
    const getLiked = await Liked.getLikedCount({ challengeId });
    console.log("liked List model:", getLiked);

    return getLiked;
  }
}

export { likedService };
