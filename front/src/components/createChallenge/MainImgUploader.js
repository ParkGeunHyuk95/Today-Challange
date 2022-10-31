import React, { useState, useRef, useEffect } from "react";
import blankImg from "../../images/createChallengePage/blankImg.png";
import MainImgUploader from "../../styles/createChallenge/MainImgUploader.css";

const MainImgUpoloader = ({ challengeImage, setChallengeImage, formData }) => {
  //useState로 챌린지메인이미지 생성

  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setChallengeImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setChallengeImage(blankImg);
      return;
    }

    // if (files) {
    //   FormData.append("file", files);
    // }
    //화면에 챌린지 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setChallengeImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    formData.append("mainImg", challengeImage);
  }, []);
  return (
    <>
      {/**useRef()변수를 생성해서 사진을 클릭하면 파일 업로더를 띄울 수 있도록 onClick함수의 이벤트에 넣어줌 */}
      <div className="mainInner">
        <form name="mainImg" encType="multipart/form-data">
          <img
            className="main"
            src={challengeImage}
            onClick={() => {
              fileInput.current.click();
            }}
          ></img>
        </form>
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/jpg, image/png, image/jpeg"
          name="main"
          onChange={onChange}
          ref={fileInput}
        ></input>
      </div>
    </>
  );
};

export default MainImgUpoloader;
