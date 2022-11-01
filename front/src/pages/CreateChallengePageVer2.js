import React, { useContext, useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import ChallengeInfo from "../components/createChallenge/ChallengeInfo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import blankImg from "../images/createChallengePage/blankImg.png";
import { UserStateContext } from "../App";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DispatchContext } from "../App";
import "../styles/createChallengePage.css";
import axios from "axios";
import happy from "../images/createChallengePage/happy.png";
import { addDays } from "date-fns";
import sad from "../images/createChallengePage/sad.png";
import Swal from "sweetalert2";

const CreateChallenge = () => {
  const navigate = useNavigate("/");
  const userState = useContext(UserStateContext);
  const [user, setUsers] = useState([]);
  const dispatch = useContext(DispatchContext);
  const isLogin = !!userState.user;
  const formData = new FormData();
  //mainImg
  const [challengeImage, setChallengeImage] = useState({
    image_file: "",
    preview_URL: "../images/createChallengePage/blankImg.png",
  });

  {
    /**ChallengeInfo.js*/
  }
  //useState로 챌린지이름 생성
  const [title, setTitle] = useState("");
  //useState로 챌린지인증방법 생성
  const [method, setMethod] = useState("");
  //useState로 챌린지 설명 생성
  const [description, setDescription] = useState("");
  //useState로 챌린지 시작날짜 생성
  const [startDate, setStartDate] = useState(new Date());
  //useState로 챌린지 끝날짜 생성
  const [endDate, setEndDate] = useState(new Date());
  //날짜 yyyy-MM-dd형식으로 구현
  var startYear = startDate.getFullYear();
  var startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
  var startDay = ("0" + startDate.getDate()).slice(-2);
  var fromDate = startYear + "-" + startMonth + "-" + startDay;
  /**endDate yyyy-MM-dd형식으로 변경 */
  var endYear = endDate.getFullYear();
  var endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
  var endDay = ("0" + endDate.getDate()).slice(-2);
  var toDate = endYear + "-" + endMonth + "-" + endDay;

  //goodImg and badImg
  const [goodImage, setGoodImage] = useState({
    image_file: "",
    preview_URL: "../images/createChallengePage/blankImg.png",
  });
  const [badImage, setBadImage] = useState({
    image_file: "",
    preview_URL: "../images/createChallengePage/blankImg.png",
  });

  const explainImg = new Array();
  const mainFileInput = useRef(null);
  const goodFileInput = useRef(null);
  const badFileInput = useRef(null);
  const descriptionRef = useRef(null);

  //mainImg 미리보기 및 setChallengeImg 담기
  const MainImgHandler = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setChallengeImage({
          image_file: e.target.files[0],
          preview_URL: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  //challengeInfo
  const onStartDate = (data) => {
    setStartDate(data);
  };
  const onEndDate = (data) => {
    setEndDate(data);
  };
  const handleSetValue = (e) => {
    const text = descriptionRef.current.value;
    setDescription(text);
  };

  //goodImg 미리보기 및 setGoodImg 담기
  const onChangeGoodImage = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setGoodImage({
          image_file: e.target.files[0],
          preview_URL: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  //badImg 미리보기 및 setBadImg 담기
  const onChangeBadImage = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBadImage({
          image_file: e.target.files[0],
          preview_URL: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // useEffect(() => {
  formData.append("mainImg", challengeImage.image_file);
  formData.append("title", JSON.stringify(title));
  formData.append("method", JSON.stringify(method));
  formData.append("description", JSON.stringify(description));
  formData.append("fromDate", JSON.stringify(fromDate));
  formData.append("toDate", JSON.stringify(toDate));
  formData.append("explainImg[]", goodImage.image_file);
  formData.append("explainImg[]", badImage.image_file);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let keyValue of formData) {
      console.log("keyValue -> ", keyValue);
    }
    let res = {};
    try {
      res = await axios({
        method: "post",
        url: "http://localhost:5001/challenges/",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log("res : ", res);
    } catch (err) {
      //handle fail
      console.log("챌린지 생성 실패", err);
    }
    // Swal.fire({
    //   position: "top-center",
    //   icon: "success",
    //   text: "챌린지 생성 성공",
    // }).then(function () {
    //   navigate("/network", { replace: true });
    // });
  };

  return (
    <>
      {isLogin === true ? (
        <form onSubmit={handleSubmit}>
          <div className="createChallenge">
            <NavBar />
            <Title>챌린지 개설하기</Title>
            <Line></Line>
            <Inner>
              {/**useRef()변수를 생성해서 사진을 클릭하면 파일 업로더를 띄울 수 있도록 onClick함수의 이벤트에 넣어줌 */}
              <div className="mainInner">
                <img src="" alt=""></img>
                <form name="mainImg" encType="multipart/form-data">
                  <img
                    className="main"
                    src={challengeImage.preview_URL}
                    onClick={() => {
                      console.log(
                        "mainImgOnClick",
                        mainFileInput.current.click()
                      );
                      mainFileInput.current.click();
                    }}
                  ></img>
                </form>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/jpg, image/png, image/jpeg"
                  name="main"
                  onChange={MainImgHandler}
                  ref={mainFileInput}
                ></input>
              </div>

              <div className="inner">
                <span className="infoSpan">이름</span>
                <input
                  className="infoInput"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder=" ex) 주 1회 플로깅"
                ></input>
                <span className="infoSpan">인증방법</span>
                <input
                  className="infoInput"
                  onChange={(e) => setMethod(e.target.value)}
                  placeholder=" ex) 쓰레기 봉투 인증"
                ></input>
                <span className="infoSpan">설명</span>

                <textarea
                  className="description"
                  ref={descriptionRef}
                  value={description}
                  onChange={handleSetValue}
                  placeholder=" 조깅을 하면서 쓰레기를 줍는 활동 "
                  maxLength={450}
                ></textarea>

                <span className="infoSpan">기간(시작일 ~ 종료일)</span>
                <div className="date">
                  <label for="startDate"></label>
                  <DatePicker
                    dateFormat="yyyy-MM-dd"
                    selected={startDate}
                    selectsStart
                    handlerWeek={startDate}
                    onChange={onStartDate}
                    locale={ko}
                    highlightDates={addDays(new Date(), 7)}
                    minDate={new Date()}
                  />

                  <p className="dateRange">~</p>
                  <label for="endDate"></label>
                  <DatePicker
                    dateFormat="yyyy-MM-dd"
                    selected={endDate}
                    selectsEnd
                    filterDate={(date) => {
                      const day = date.getDay();

                      const dayOfStartDay = startDate.getDay();

                      if (dayOfStartDay === 0) {
                        return day === 6;
                      }

                      return day === dayOfStartDay - 1;
                    }}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={addDays(startDate, 76)}
                    onChange={onEndDate}
                    locale={ko}
                  />
                </div>
              </div>
            </Inner>
            <InnerCheckImg>
              <ImgTitle>인증샷 예시</ImgTitle>
              <CheckImg>
                <div className="checkImgInner">
                  <div className="checkImg">
                    <div className="goodImg">
                      <span>
                        <img className="icon" src={happy}></img>이렇게
                        찍어주세요!
                      </span>
                      <form name="explainImg" encType="multipart/form-data">
                        <img
                          className="img"
                          src={goodImage.preview_URL}
                          onClick={() => {
                            goodFileInput.current.click();
                          }}
                        ></img>
                      </form>
                      <input
                        type="file"
                        style={{ opacity: "0" }}
                        accept="image/jpg, image/png, image/jpeg"
                        name="explain"
                        multiple
                        onChange={onChangeGoodImage}
                        ref={goodFileInput}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="checkImgInner">
                  <div className="checkImg">
                    <div className="badImg">
                      <span>
                        <img className="icon" src={sad}></img>이렇게 찍으면
                        안돼요!
                      </span>
                      <form name="explainImg" encType="multipart/form-data">
                        <img
                          className="img"
                          src={badImage.preview_URL}
                          onClick={() => {
                            badFileInput.current.click();
                          }}
                        ></img>
                      </form>
                      <input
                        type="file"
                        style={{ opacity: "0" }}
                        accept="image/jpg, image/png, image/jpeg"
                        name="explain"
                        multiple
                        onChange={onChangeBadImage}
                        ref={badFileInput}
                      ></input>
                    </div>
                  </div>
                </div>
              </CheckImg>
            </InnerCheckImg>
            <StyledButton>
              <CreateFont>챌린지 생성하기</CreateFont>
            </StyledButton>
          </div>
        </form>
      ) : (
        navigate("/challenge")
      )}
    </>
  );
};

{
  /**챌린지 개설하기 스타일 설정 */
}
const Title = styled.h2`
  font-size: 25px;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
`;
const Line = styled.hr`
  border: solid 1px #9c9c9c;
  width: 160px;
  position: relative;
  margin: auto;
  justify-content: center;
  display: flex;
`;
const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 20px auto;
  justify-content: center;
  display: flex;
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
const InnerCheckImg = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ImgTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 10px;
`;
const CheckImg = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export default CreateChallenge;
