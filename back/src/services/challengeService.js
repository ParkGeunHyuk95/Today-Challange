import { Challenge } from "../models/Challenge";

class challengeService {
  // create/ post
  static async addChallenge({
    holdUserId,
    title,
    description,
    fromDate,
    toDate,
    mainImg,
    explainImg,
    method,
  }) {
    const newChallenge = {
      holdUserId,
      title,
      description,
      fromDate,
      toDate,
      mainImg,
      explainImg,
      method,
    };
    const createdChallenge = await Challenge.create({
      newChallenge,
    });
    return createdChallenge;
  }

  // 전체 불러오기 (get)
  static async getChallenges() {
    const challenges = await Challenge.findMany();
    return challenges;
  }

  // id 값을 게시물 1개 선택하기(params 값을 이용)
  static async findUniqueUser(id) {
    const findId = await Challenge.findUniqueId(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }

  static async findUniqueId(id) {
    const findId = await Challenge.findUnique(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }

  // id 값을 게시물 1개 선택하기(params 값을 이용)
  static async findUniqueId(id) {
    const findId = await Challenge.findUnique(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }

  // Delete
  static async deleteOne(id) {
    const deleteChallenge = await Challenge.delete(id);

    return deleteChallenge;
  }

  // 수정
  static async updateChallenge({
    id,
    title,
    description,
    fromDate,
    toDate,
    main,
    explain,
    method,
  }) {
    const updated = await Challenge.update({
      id,
      title,
      description,
      fromDate,
      toDate,
      main,
      explain,
      method,
    });
    return updated;
  }
  static async addImage(id, addedImage) {
    const createdChallenge = await Challenge.create({
      id,
      addedImage,
    });
    return createdChallenge;
  }
}

export { challengeService };
