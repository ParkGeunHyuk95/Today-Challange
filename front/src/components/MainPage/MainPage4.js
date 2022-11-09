import React from "react";
import NavBar from "../NavBar";
import "../../styles/mainpage/mainpage4.css";
import StyledButton from "../../styles/commonstyles/Button";
import { useNavigate } from "react-router-dom";
// import * as Api from "../../api";
const MainPage4 = () => {
  // Api.get("chllenges/mine/18").then((res) => console.log(res));
  let navigate = useNavigate();
  return (
    <div className="mainPage4">
      <NavBar />
      <div className="mainPage4TextContainer">
        {/* <h1 className="mainPage4Title">지구를 살리는 환경습관 기르는</h1>
        <div className="textBox">
          <h1 className="missioncheck mainPage4Title"> 오늘내일</h1>
          <h1 className="mainPage4Title">지금 시작하기</h1>
        </div> */}
        <div id="flip">
          <div>
            <h1 className="mainPage4Title missioncheck">
              하나뿐인 우리의 지구를 지키기 위해
            </h1>
          </div>
          <div>
            <h1 className="mainPage4Title missioncheck">
              환경오염으로 아파하는 지구를 위해
            </h1>
          </div>
          <div>
            <h1 className="mainPage4Title missioncheck">
              작은 실천으로 지구에게 큰 도움되는
            </h1>
          </div>
        </div>
      </div>
      <div className="buttonContainer">
        <StyledButton
          className="main4Btn"
          onClick={() => {
            navigate("network");
          }}
        >
          <h1>챌린지하러 가기</h1>
        </StyledButton>
      </div>
      <div className="footer">
        <p className="footerText"> 오늘내일 created by 5늘</p>
        <p className="footerText"> 문의:whgkdms777@gmail.com</p>
      </div>
    </div>
  );
};

export default MainPage4;
