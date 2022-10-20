import React, { useRef, useState, useEffect, useNavigate } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/ChallengeDetailModal.css";
// import UserLike from "./UserLike";
import * as Api from "../../api";

const ChallengeDetail = () => {
  const navigate = useNavigate();

  //useState로 선택한 챌린지 image URL 상태를 생성함.
  const [challengeImage, setChallengeImage] = useState("");
  //useState로 D-day 상태를 생성함.
  const [challengeDday, setChanllegeDday] = useState("");
  // 챌린지 제목
  const [challengeTitle, setChanllegeTitle] = useState("");
  // 챌린지 세부 내용
  const [challengeDescription, setChallengeDescription] = useState("");
  // 해당 챌린지에 참여한 인원수
  const [challengeJoinedNumber, setChallengeJoinedNumber] = useState("");
  // 해당 챌린지 완수시 얻을 수 있는 point
  const [challengePoint, setchallengePoint] = useState("");
  // 챌린지 인증 방법 설명
  const [challengeManual, setChallengeManual] = useState("");
  // Good or Bad 인증사진 URL 상태를 생성함.
  const [goodImage, setGoodImage] = useState("");
  const [badImage, setBadImage] = useState("");

  // useEffect(() => {
  //   Api.get("challenges", challengeId).then((res) => setTitle(res.data.title));
  // }, []);
  // const selectedChallenge = res.data;

  // challengeImage: selectedChallenge.mainImg;
  // challengeDday: selectedChallenge.endRemainingDate;
  // challengeTitle: selectedChallenge.title;
  // challengeDescription: selectedChallenge.description;
  // challengeJoinedNumber: selectedChallenge.joinedNumber;
  // challengePoint: selectedChallenge.point;
  // challengeManual: selectedChallenge.manual;
  // challengeGoodImage: selectedChallenge.explainImg[0];
  // challengeBadImage: selectedChallengeexplainImg[1];

  const challengeShowDetail = async (e) => {
    const res = await Api.get("challenges", challengeId);
    const selectedChallenge = res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // "currentUser" 엔드포인트로 post요청함.
      await Api.put("userToChallenge", {
        // challengeId: challengeId,
      });

      navigate("/network");
    } catch (err) {
      console.log("챌린지 참가에 실패하였습니다.", err);
    }
  };

  //모달창 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const favoriteChallenge = () => {};

  return (
    <>
      <div className="modalBackground">
        <div className="challengeDetailModal">
          <div className="challengeDetailModalContents">
            <img
              className="challengeModalCloseBtn"
              src={Close_round_light}
              onClick={closeModal}
              width="32px"
              height="32px"
              alt="닫기 버튼"
            ></img>
            {/* 챌린지 사진, 제목, 세부내용 */}
            <div className="challengeDetailTop">
              <div className="challengeTopLeft">
                <img
                  className="challengeImage"
                  // src={selectedChallenge.img}
                  width="310"
                  height="240"
                  margin="0"
                  alt=""
                ></img>
                <p className="chanllegeDday">
                  <img src={TimeLight} alt="시계"></img> 챌린지 시작까지{" "}
                  {chanllegeDday}일 전
                </p>
              </div>
              <div className="challengeTopRight">
                <span>
                  <img src={OfficialChallenge} alt="V체크"></img> 공식 챌린지
                  <img
                    className="FavoriteLight"
                    src={FavoriteLight}
                    style={{ marginLeft: 170 }}
                    alt="하트"
                  ></img>
                </span>
                {/* <a>
                  <img
                    className="FavoriteLight"
                    src={FavoriteLight}
                    style={{ marginLeft: 170 }}
                    alt="하트"
                  ></img>
                </a> */}
                <h4>1주일간 배달용기 받지않기</h4>
                <div
                  className="challengeScroll"
                  style={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    width: 290,
                    height: 170,
                    padding: 10,
                    backgroundColor: "gray",
                    marginTop: 0,
                  }}
                >
                  {/* {selectedChallenge.description} */}
                </div>
              </div>
            </div>
            {/* 참가인원, 포인트 */}
            <div className="challengeDetailMiddle">
              <p className="challengeJoinNumber" style={{ color: "#9C9C9C" }}>
                <img src={UserFill} alt="사람" style={{ marginLeft: 80 }}></img>
                참가인원
                <span style={{ color: "black" }}> {challengeJoinNumber}명</span>
              </p>
              <p
                className="challengePoint"
                style={{ color: "#9C9C9C", marginLeft: 250 }}
              >
                <img src={Gift} alt="선물상자"></img>
                포인트
                <span style={{ color: "black" }}>
                  {" "}
                  총 {challengePoint}포인트
                </span>
              </p>
            </div>

            {/* 챌린지 인증방법 */}
            <div className="challengeDetailBottom">
              <div className="challengeManual">
                <span style={{ marginLeft: 30 }}>챌린지 인증방법</span>
                <p style={{ marginLeft: 30, marginTop: 10, marginBottom: 0 }}>
                  "배달용기 필요없어요" 문구가 적힌 영수증을 사진 찍기
                </p>
              </div>

              <div className="challengeManualDescription">
                <div className="challengeManualDescriptionLeft">
                  <p style={{ marginTop: 0, marginBottom: 5 }}>
                    <img src={Happy} alt="웃는 얼굴"></img> 이렇게 찍어주세요!
                  </p>
                  <img
                    // src={selectedChallenge.explainImg}
                    style={{ width: 240, height: 180, margin: 0 }}
                    alt=""
                  ></img>
                  <p
                    style={{ color: "orange", marginTop: 10, marginBottom: 5 }}
                  >
                    문구가 잘 보이도록 밝은 곳에서 찍힌 사진
                  </p>
                </div>

                <div className="challengeManualDescriptionRight">
                  <p style={{ marginTop: 0, marginBottom: 5 }}>
                    <img src={Sad} alt="찡그린 얼굴"></img> 이렇게 하면 안돼요!
                  </p>
                  <img
                    // src={selectedChallenge.explainImg}
                    style={{ width: 240, height: 180, margin: 0 }}
                    alt=""
                  ></img>
                  <p
                    style={{ color: "orange", marginTop: 10, marginBottom: 5 }}
                  >
                    문구가 명확히 보이지 않는 사진
                  </p>
                </div>
              </div>
            </div>

            <button className="challengeJoinBtn" onClick={handleSubmit}>
              참가하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChallengeDetail;