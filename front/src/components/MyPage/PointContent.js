import React from "react";
import * as Api from "../../api";
import styled from "styled-components";
import arrow_drop_down from "../../images/myPage/arrow_drop_down.svg";

const Border = styled.div`
  margin-left: 120px;
  weight: 100px;
`;
const Title = styled.h2`
  font-size: 25px;
  font-family: "Nanum Gothic", sans-serif;
  text-align: left;
  margin-top: 100px;
  margin-left: 100px;
`;

const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 20px auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const PointTitle = styled.div`
  display: flex;
  flex-direction: row;

  align-item: center;
`;

const ChallengeTitle = styled.h3`
  font-size: 23px;
  font-weight: bold;
  font-family: "Nanum Gothic", sans-serif;
  text-align: left;
`;

const JoinedChallengePoint = styled.div`
  weight: 100%;
  padding-right: 20%;
`;

const EachJoinedChallenge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const JoinedChallengeDetail = styled.h3`
  font-size: 20px;
  font-weight: bold;
  font-family: "Nanum Gothic", sans-serif;
`;

const Description = styled.h4`
  font-size: 20px;
  font-family: "Nanum Gothic", sans-serif;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 50px;
`;
const ChallengeCreatePoint = styled.h5`
  font-size: 20px;
  font-weight: bold;
  color: red;
  font-family: "Nanum Gothic", sans-serif;
  margin-top: 15px;

  display: flex;
  flex-direction: column;
  align-item: center;
`;
const Point = styled.h5`
  font-size: 20px;
  font-weight: bold;
  color: #6a71e6;
  font-family: "Nanum Gothic", sans-serif;
  // text-align: right;
  margin-top: 15px;
  // padding-right: 150%;
`;

const Each = styled.div`
  weight: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  .item:nth-child(3) {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }
`;

const StyledButton = styled.button`
  background-color: #6a71e6;
  color: #ffffff;
  font-size: 25px;
  padding: 0.1em 3em;
  border: 0;
  border-radius: 5px;
  display: flex;
  border-radius: 6px;
  margin: 20px auto;
`;

const CreateFont = styled.h2`
  padding: 0.2em 2em;
`;
const data2 = [
  {
    challengeId: 5,
    title: "제목 ",
    holdUserId: "6d93b31c-b5f2-4f9f-a65f-014792effe88",
    description: "내용 ",
    method: "asd",
    fromDate: "2022-10-22",
    toDate: "2022-11-19",
    mainImg: "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321275.jpg",
    explainImg:
      "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321291.jpg,uploads\\프론트엔드 - 복사본-1666282321295.png",
    createdAt: "2022-10-20T16:12:01.300Z",
    updatedAt: "2022-10-20T16:12:01.300Z",
    description: "재활용하기",
    countUpload: 0,
  },
  {
    challengeId: 5,
    title: "제목 ",
    holdUserId: "6d93b31c-b5f2-4f9f-a65f-014792effe88",
    description: "내용 ",
    method: "asd",
    fromDate: "2022-10-22",
    toDate: "2022-11-19",
    mainImg: "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321275.jpg",
    explainImg:
      "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321291.jpg,uploads\\프론트엔드 - 복사본-1666282321295.png",
    createdAt: "2022-10-20T16:12:01.300Z",
    updatedAt: "2022-10-20T16:12:01.300Z",
    description: "ㅁㄴㅇ",
    countUpload: 0,
  },
  {
    challengeId: 5,
    title: "제목 ",
    holdUserId: "6d93b31c-b5f2-4f9f-a65f-014792effe88",
    description: "내용 ",
    method: "asd",
    fromDate: "2022-10-22",
    toDate: "2022-11-19",
    mainImg: "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321275.jpg",
    explainImg:
      "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321291.jpg,uploads\\프론트엔드 - 복사본-1666282321295.png",
    createdAt: "2022-10-20T16:12:01.300Z",
    updatedAt: "2022-10-20T16:12:01.300Z",
    description: "ㅁㄴㅇ",
    countUpload: 0,
  },
];
// 참가버튼 누르면 포인트 10 획득, 챌린지 개설하기 버튼 누르면 포인트 -50

const PointContent = () => {
  // const [point, setPoint] = useState("");
  return (
    <>
      <Border>
        <Title>포인트 획득 내역</Title>
        <Inner>
          {data2.map((x, i) => {
            return (
              <Each>
                <PointTitle className="item">
                  <img src={arrow_drop_down}></img>
                  <ChallengeTitle>
                    {data2[i].title}({data2[i].fromDate}~{data2[i].toDate})
                  </ChallengeTitle>
                </PointTitle>
                <ChallengeCreatePoint className="item">
                  -50
                </ChallengeCreatePoint>
                <JoinedChallengePoint className="item">
                  {[1, 2, 3].map((x) => {
                    return (
                      <EachJoinedChallenge>
                        <JoinedChallengeDetail>22.11.01</JoinedChallengeDetail>
                        <JoinedChallengeDetail>
                          포인트 획득
                        </JoinedChallengeDetail>
                        <Point>10</Point>
                      </EachJoinedChallenge>
                    );
                  })}
                </JoinedChallengePoint>
              </Each>
            );
          })}
        </Inner>
        <StyledButton>
          <CreateFont>더보기</CreateFont>
        </StyledButton>
      </Border>
    </>
  );
};

export default PointContent;
