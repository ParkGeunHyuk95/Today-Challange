import React, { useRef, useState, useEffect, useContext } from "react";
import "../../styles/ChallengeDetailModal.css";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Close_round_light from "../../images/Close_round_light.png";
import TimeLight from "../../images/challenge/TimeLight1x.png";
import OfficialChallenge from "../../images/challenge/OfficialChallenge1x.png";
import FavoriteLight from "../../images/challenge/FavoriteLight1x.png";
import UserFill from "../../images/challenge/UserFill1x.png";
import Gift from "../../images/challenge/Gift1x.png";
import Happy from "../../images/challenge/Happy1x.png";
import Sad from "../../images/challenge/Sad1x.png";

import { UserStateContext } from "../../App";
import * as Api from "../../api";
import Swal from "sweetalert2";
import UserLike from "../UserLike";
import { AppContext } from "../../Context/AppContext";

function ChallengeDetailModal({
  setChallengeDetailModalOpen,
  item
}) {
  const closeChallengeDetailModal = () => {
    setChallengeDetailModalOpen(false);
  };
  const [peopleCount,setPeopleCount]=useState(0)
  console.log('123',item.challengeId)
  const getDateDiff=(d1,d2)=>{
    const date1=new Date(d1);
    const date2=new Date(d2);
    const diffDate=date1.getTime()-date2.getTime();
    return Math.abs(diffDate/(1000*60*60*24));
  }
  let dif=getDateDiff(item.fromDate,item.toDate)
  const {socket,currentRoom,setCurrentRoom}=useContext(AppContext)
  const handleRoomSubmit=(e)=>{
    e.preventDefault();
    socket.emit('enterRoom',item.title,()=>{
      setCurrentRoom(item.title)
      console.log(currentRoom)
    })
    
  }
  
  useEffect(()=>{
    Api.get('/countJoinUser', {
      'challengeId': item.challengeId
    }).then((res)=>setPeopleCount(res))
  },[])
  return (
    <>
      <div className="modalBackground">
        <div className="challengeDetailModal">
          <div className="challengeDetailModalContents">
            <img
              className="challengeModalCloseBtn"
              src={Close_round_light}
              setChallengeDetailModalOpen={setChallengeDetailModalOpen}
              onClick={closeChallengeDetailModal}
              width="32px"
              height="32px"
              alt="닫기 버튼"
            ></img>

            {/* 챌린지 사진, 제목, 세부내용 */}
            <div className="challengeDetailTop">
              <div className="challengeTopLeft">
                <img
                  className="challengeImage"
                  src={item.mainImg}
                  alt=""
                ></img>
                <p className="chanllegeDday">
                  <img src={TimeLight} alt="시계"></img> 챌린지 시작까지{" "}
                  {/* {challengeDday}일 전 */} 일전
                </p>
              </div>
              <div className="challengeTopRight">
                <span>
                  <img src={OfficialChallenge} alt="V체크"></img> 공식 챌린지
                  <img
                    className="FavoriteLight"
                    src={FavoriteLight}
                    alt="하트"
                  ></img>
                </span>

                <h5>{item.title}</h5>
                <div className="challengeScroll">
                  {item.description}
                </div>
              </div>
            </div>

            {/* 참가인원, 포인트 */}
            <div className="challengeDetailMiddle">
              <div className="challengeJoinNumber">
                <p className="personNum colorGray">
                  <img src={UserFill} alt="사람"></img>
                  참가인원
                </p>
                <span className="colorBlack"> {/*challengeJoinedNumber*/}명</span>
              </div>

              <div classNmae="challengePoint">
                <p className="expectedPoint colorGray">
                  <img src={Gift} alt="선물상자"></img>
                  포인트
                  <span className="colorBlack"> 총 {dif*10}포인트</span>
                </p>
              </div>
            </div>

            {/* 챌린지 인증방법 */}
            <div className="challengeDetailBottom">
              <div className="challengeManual">
                <span className="manualTitle">챌린지 인증방법</span>
                <p>{item.method}</p>
              </div>

              <div className="challengeManualDescription">
                <div className="challengeManualDescriptionLeft">
                  <a>
                    <img src={Happy} alt="웃는 얼굴"></img> 이렇게 찍어주세요!
                  </a>
                  <img
                    className="explainImage"
                    src={item.explainImg.split(',')[0]}
                    alt=""
                  ></img>
                  <a className="colorOrange">문구가 잘 보이도록 찍힌 사진</a>
                </div>

                <div className="challengeManualDescriptionRight">
                  <a>
                    <img src={Sad} alt="찡그린 얼굴"></img> 이렇게 하면 안돼요!
                  </a>
                  <img
                    className="explainImage"
                    src={item.explainImg.split(',')[1]}
                    alt=""
                  ></img>
                  <a className="colorOrange">문구가 명확히 보이지 않는 사진</a>
                </div>
              </div>
            </div>

            <button className="challengeJoinBtn" type="submit" onClick={handleRoomSubmit}>
              참가하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeDetailModal;
