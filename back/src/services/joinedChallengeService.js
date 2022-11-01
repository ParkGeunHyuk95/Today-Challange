import { JoinedChallenge } from "../models/JoinedChallenge";

class joinedChallengeService {
  static async count({ id }) {
    const countJoinedChallenge = await JoinedChallenge.count({
      id,
    });
    return countJoinedChallenge;
  }
  static async addChallenge({ id, userId, countUploads, image, description }) {
    const createdChallenge = await JoinedChallenge.create({
      id,
      userId,
      countUploads,
      image,
      description,
    });
    return createdChallenge;
  }
  // 인증한 챌린지의 정보 불러오기
  static async findChallenge(challengeId) {
    const challengeInfo = await JoinedChallenge.findUnique(challengeId);
    return challengeInfo;
  }

  static async findJoinedChallenges(challengeId) {
    const challengeInfo = await JoinedChallenge.findMany(challengeId);
    return challengeInfo;
  }
}

export { joinedChallengeService };
