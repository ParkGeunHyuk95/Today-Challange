import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NetworkCard from "../components/NetworkCard";
import { useParams } from "react-router-dom";
import "../styles/checkChallenge.css";
import * as Api from "../api";
import Dropdown from "../components/Dropdown";
import CheckDropdown from "../components/Dropdown";
import StyledButton from "../styles/commonstyles/Button";

const CheckChallenge = () => {
  let { id } = useParams();
  let realId = parseInt(id);
  const [countPerson, setCountPerson] = useState(0);
  const [challengeData, setChallengeData] = useState([]);
  useEffect(() => {
    Api.get(`challenges/mine/${realId}`).then((res) =>
      setChallengeData(res.data.updateChallenge)
    );
    Api.get("countJoinUser").then((res) => setCountPerson(res.data));
  }, []);
  // Api.get(`challenges/mine/:${realId}}`).then((res)=>console.log(res))
  console.log(challengeData.fromDate);
  console.log(challengeData.toDate - challengeData.fromDate);
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

  return (
    <div className="checkChallenge">
      <NavBar />
      <div className="upperSection"></div>
      <div className="checkText">
        <a>챌린지 인증하기</a>
      </div>
      <div className="checkContents">
        <div className="mainimg">
          <div className="imgsize">
            <NetworkCard item={challengeData} countPerson={countPerson} />
          </div>
        </div>
        <div className="mainContent">
          <div className="imgContents">이미지들</div>
          <div>
            <label
              htmlFor="input-file"
              className="OOTDWrite-input-file"
              onChange={addImg}
            >
              <input
                type="file"
                multiple="multiple"
                id="input-file"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
              />
            </label>
          </div>
          <div className="pointContents">
            <div>참가 포인트 -50</div>
            <div>획득 최대 포인트 {dif * 10}</div>
          </div>
          <div className="buttonContents">
            <StyledButton>인증샷 업로드</StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckChallenge;
