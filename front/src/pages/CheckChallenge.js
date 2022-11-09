import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NetworkCard from "../components/NetworkCard";
import { useParams } from "react-router-dom";
import "../styles/checkChallenge.css";
import * as Api from "../api";
import Dropdown from "../components/Dropdown";
import CheckDropdown from "../components/Dropdown";
import StyledButton from "../styles/commonstyles/Button";
import CheckChallengeCard from "../components/CheckChallengeCard";
import CheckImg1 from "../components/checkImg/CheckImg1";
import CheckImg2 from "../components/checkImg/CheckImg2";
import CheckImg3 from "../components/checkImg/CheckImg3";
import CheckImg4 from "../components/checkImg/CheckImg4";
import { Carousel } from "react-bootstrap";

const CheckChallenge = () => {
  let { id } = useParams();
  let realId = parseInt(id);
  const [countPerson, setCountPerson] = useState(0);
  const [challengeData, setChallengeData] = useState([]);
  const [checkPerWeek, setCheckPerWeek] = useState(1);
  useEffect(() => {
    Api.get(`challenges/mine/${realId}`).then((res) =>
      setChallengeData(res.data.updateChallenge)
    );
    Api.get(`countJoinUser/${id}`).then((res) => setCountPerson(res.data));
  }, []);
  // Api.get(`challenges/mine/:${realId}}`).then((res)=>console.log(res))

  const [checkImg, setCheckImg] = useState([]);
  const addImg = (e) => {
    const nowSelectImageList = e.target.files;
    const nowImageURLList = [...checkImg];
    for (let i = 0; i < nowSelectImageList.length; i += 1) {
      const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
      nowImageURLList.push(nowImageUrl);
    }

    setCheckImg(nowImageURLList);
  };
  const getDateDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const diffDate = date1.getTime() - date2.getTime();
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };
  let dif = getDateDiff(challengeData.fromDate, challengeData.toDate);
  const countImage = dif + 1;
  const countWeek = countImage / 7;
  console.log("이미지갯수", countImage);
  console.log("몇주차?", countWeek);

  return (
    <div className="checkChallenge">
      <NavBar />
      <div className="upperSection">asd</div>
      <div className="checkText">
        <a>챌린지 인증하기</a>
      </div>
      <div className="checkContents">
        <div className="mainimg">
          <div className="imgsize">
            <CheckChallengeCard item={challengeData} person={countPerson} />
          </div>
        </div>
        <div className="mainContent">
          {/* <div className="countweek">
            <button
              className="checkBtn"
              onClick={() => {
                setCheckPerWeek(1);
              }}
            >
              1주차
            </button>
            <button
              className="checkBtn"
              disabled={countWeek < 2}
              onClick={() => {
                setCheckPerWeek(2);
              }}
            >
              2주차
            </button>
            <button
              className="checkBtn"
              disabled={countWeek < 3}
              onClick={() => {
                setCheckPerWeek(3);
              }}
            >
              3주차
            </button>
            <button
              className="checkBtn"
              disabled={countWeek < 4}
              onClick={() => {
                setCheckPerWeek(4);
              }}
            >
              4주차
            </button>
          </div> */}
          <div className="imgContents">
            
            <CheckImg2 id={id} /> 
         
          </div>
          
          
          <div className="pointContents">
            <div>참가 포인트 -50</div>
            <div>획득 최대 포인트 {dif * 10 + 10}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckChallenge;
