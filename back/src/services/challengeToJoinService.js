import { ChallengeToJoin } from "../models/ChallengeToJoin";

class challengeToJoinService {
  static async getChallenges() {
    const challenges = await ChallengeToJoin.getChallengeToJoin();
    return challenges;
  }
}

export { challengeToJoinService };
