import React, { useContext, useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import ChallengeInfo from "../components/createChallenge/ChallengeInfo";
import MainImgUpoloader from "../components/createChallenge/MainImgUploader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import blankImg from "../images/createChallengePage/blankImg.png";
import { UserStateContext } from "../App";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoodImg from "../components/createChallenge/GoodImg";
import BadImg from "../components/createChallenge/BadImg";
import { DispatchContext } from "../App";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import "../styles/createChallengePage.css";
import axios from "axios";
import Swal from "sweetalert2";
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
const CreateChallenge = () => {
  const navigate = useNavigate("/");
  const userState = useContext(UserStateContext);
  const [user, setUsers] = useState([]);
  const dispatch = useContext(DispatchContext);
  const isLogin = !!userState.user;
  const [challengeImage, setChallengeImage] = useState(blankImg);
  const backendPortNumber = "5001";
  const serverUrl =
    "http://" + window.location.hostname + ":" + backendPortNumber + "/";
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
  const formData = new FormData();
  const [goodImage, setGoodImage] = useState(blankImg);
  const [badImage, setBadImage] = useState(blankImg);

  const handleSubmit = (e) => {
    e.preventDefault();
    let res = {};

    for (let key of formData.entries()) {
      console.log({ key });
    }
    try {
      axios({
        method: "post",
        url: "http://localhost:5001/challenges/",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
    } catch (err) {
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
              <MainImgUpoloader
                formData={formData}
                setChallengeImage={setChallengeImage}
                challengeImage={challengeImage}
              ></MainImgUpoloader>
              <ChallengeInfo
                formData={formData}
                setTitle={setTitle}
                setMethod={setMethod}
                setDescription={setDescription}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                title={title}
                method={method}
                descroption={description}
                startDate={startDate}
                endDate={endDate}
              ></ChallengeInfo>
            </Inner>
            <InnerCheckImg>
              <ImgTitle>인증샷 예시</ImgTitle>
              <CheckImg>
                <GoodImg
                  formData={formData}
                  goodImage={goodImage}
                  setGoodImage={setGoodImage}
                ></GoodImg>
                <BadImg
                  formData={formData}
                  badImage={badImage}
                  setBadImage={setBadImage}
                ></BadImg>
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

export default CreateChallenge;
