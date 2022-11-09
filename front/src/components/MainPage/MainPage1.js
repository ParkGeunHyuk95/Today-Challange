import React, { useContext } from "react";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../signUpModal/SignUpModal";
import "../../styles/mainpage/mainpage1.css";
import vector from "../../images/mainpage/Vector 10.png";
import StyledButton from "../../styles/commonstyles/Button";
import NavBar from "../NavBar";
import ok from "../../images/Ok.png";
import scroll from "../../images/scroll.png";
import { useNavigate } from "react-router-dom";
import { DispatchContext, UserStateContext } from "../../App";
import logoF from "../../images/logoF.png";
// import imageCompression from "browser-image-compression";
import todayLogo from "../../images/todayLogo.png";
const MainPage1 = () => {
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  //열기, 닫기를 부모로부터 받아옴
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const navigate = useNavigate();
  //로그인 모달창 노출
  const showLoginModal = () => {
    setLoginModalOpen(true);
    setSignUpModalOpen(false);
  };

  // //회원가입 모달창 노출
  //   const showSignUpModal = () => {
  //     setSignUpModalOpen(true);
  //   };

  // const isLogin= !!userState.user;
  const isLogin = !!userState.user;
  // const logout=()=>{
  //   sessionStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');
  //   dispatchEvent({type:'LOGOUT'});
  //   alert('로그아웃 완료')
  //   navigate('/')
  // }

  return (
    <>
      <div className="mainPage1">
        <NavBar />
        <div className="mainPageContainer">
          <a className="warmFont aMainPage1 todayColor">
            나도 살고 지구도 사는
          </a>
          <a className="warmFont fontColorWhite aMainPage1 mainTitle2">
            환경 습관 기르기 프로젝트
          </a>
          <div className="secondlinetext">
            <a className="missioncheck aMainPage1">
              {/* <img src={logoF} className="mainLogo" /> */}
            </a>
            {/* <div className="todayLogo"></div> */}
            {/* <img src={todayLogo} className="todayLogo"></img> */}
            {/* <span className="mainTitleFont todayColor">
              오늘 내<span className=" mainTitleFont todayTaskColor">일</span>
            </span> */}
          </div>
          <div className="buttonContainer">
            <StyledButton
              style={{ fontSize: "2rem" }}
              onClick={() => {
                navigate("/network");
              }}
            >
              챌린지
            </StyledButton>
            {isLogin === false ? (
              <StyledButton
                style={{ fontSize: "2rem" }}
                onClick={showLoginModal}
              >
                로그인
              </StyledButton>
            ) : (
              <StyledButton
                style={{ fontSize: "2rem" }}
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                마이페이지
              </StyledButton>
            )}

            {loginModalOpen && (
              <LoginModal
                setLoginModalOpen={setLoginModalOpen}
                signUpModalOpen={signUpModalOpen}
                setSignUpModalOpen={setSignUpModalOpen}
              />
            )}
            {signUpModalOpen && (
              <SignUpModal
                signUpModalOpen={signUpModalOpen}
                setSignUpModalOpen={setSignUpModalOpen}
              />
            )}
          </div>
        </div>
        <div className="scroll">
          <span className="titleScroll">
            <img src={todayLogo} className="LogoScroll" />이 궁금하다면?
          </span>
          {/* <img src={scroll} className="scrollLogo"></img> */}
        </div>
      </div>
    </>
  );
};

export default MainPage1;
