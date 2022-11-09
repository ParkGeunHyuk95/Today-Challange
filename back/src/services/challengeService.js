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

  static async findUpdateJoinedChallengeId(id) {
    const findId = await Challenge.findUnique(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    // //title, description, from, to가 null이 아니라면 아래의 if 문을 실행
    // if (toUpdate.title) {
    //   const fieldToUpdate = "title";
    //   const newValue = toUpdate.title;
    //   project = await Project.update({ UserId, fieldToUpdate, newValue });
    // }

    // //description 값은 필수가 아니기 때문에 ""으로 아무값이 들어오지 않아도 수정될수있게 null값이어도 실행
    // const fieldToUpdate = "description";
    // const newValue = toUpdate.description;
    // project = await Project.update({ userId, fieldToUpdate, newValue });

    // if (toUpdate.fromDate) {
    //   const fieldToUpdate = "fromDate";
    //   const newValue = toUpdate.fromDate;
    //   project = await Project.update({ userId, fieldToUpdate, newValue });
    // }

    // if (toUpdate.toDate) {
    //   const fieldToUpdate = "toDate";
    //   const newValue = toUpdate.toDate;
    //   project = await Project.update({ userId, fieldToUpdate, newValue });
    // }
    console.log("수정 되나? 서비스:", toUpdate.title, toUpdate.mainImg);
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
  static async updateChallenge({ id, toUpdate }) {
    const updated = await Challenge.update({
      id,
      toUpdate,
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
