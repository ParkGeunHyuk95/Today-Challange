import { chat } from "../models/chat";

class chatService {
  static async getUserChallengeInfo({ userId }) {
    const getJoinCallenge = await chat.getJoinChallengeList({
      userId,
    });
    return getJoinCallenge;
  }
}

export { chatService };
