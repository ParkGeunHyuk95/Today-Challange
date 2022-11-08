import { chat } from "../models/chat";

class chatService {
  static async getUserChallengeInfo({ userId }) {
    const getJoinCallenge = await chat.getChallengeList({
      userId,
    });
    return getJoinCallenge;
  }
}

export { chatService };
