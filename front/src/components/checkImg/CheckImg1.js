import React, { useRef, useState } from "react";
import blankImg from "../../images/createChallengePage/blankImg.png";
import "../../styles/checkChallenge/checkImg.css";
import axios from "axios";
import * as Api from "../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckImg1 = ({ id }) => {
  const navigate = useNavigate();
  const formData = new FormData();
  const [firstImage, setFirstImage] = useState(blankImg);
  const [secondImage, setSecondImage] = useState(blankImg);
  const [thirdImage, setThirdImage] = useState(blankImg);
  const [fourthImage, setFourthImage] = useState(blankImg);
  const [fifthImage, setFifthImage] = useState(blankImg);
  const [sixthImage, setSixthImage] = useState(blankImg);
  const [seventhImage, setSeventhImage] = useState(blankImg);
  const firstFileInput = useRef(null);
  const secondFileInput = useRef(null);
  const thirdFileInput = useRef(null);
  const fourthFileInput = useRef(null);
  const fifthFileInput = useRef(null);
  const sixthFileInput = useRef(null);
  const seventhFileInput = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let keyValue of formData) {
      console.log("keyValue -> ", keyValue);
    }
    let res = {};
    try {
      res = await axios({
        method: "post",
        url: `http://localhost:5001/joinedChallenge/${id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          text: "챌린지 생성 성공",
        })
      }
    } catch (err) {
      //handle fail
      console.log("인증하기 실패", err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div id="checkImgContainer">
        <form
          name="firstImg"
          encType="multipart/form-data"
          acceptCharset="UTF-8"
        >
          <img
            className="img1"
            src={firstImage}
            onClick={(e) => {
              firstFileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ opacity: "0" }}
            accept="image/jpg, image/png, image/jpeg"
            name="explain"
            multiple
            ref={firstFileInput}
          />
        </form>
        <form
          name="secondImg"
          encType="multipart/form-data"
          acceptCharset="UTF-8"
        >
          <img
            className="img2"
            src={firstImage}
            onClick={() => {
              secondFileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ opacity: "0" }}
            accept="image/jpg, image/png, image/jpeg"
            name="explain"
            multiple
            ref={secondFileInput}
          />
        </form>
        <form
          name="thirdImg"
          encType="multipart/form-data"
          acceptCharset="UTF-8"
        >
          <img
            className="img3"
            src={firstImage}
            onClick={() => {
              thirdFileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ opacity: "0" }}
            accept="image/jpg, image/png, image/jpeg"
            name="explain"
            multiple
            ref={thirdFileInput}
          />
        </form>
        <form
          name="fourthImg"
          encType="multipart/form-data"
          acceptCharset="UTF-8"
        >
          <img
            className="img4"
            src={firstImage}
            onClick={() => {
              fourthFileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ opacity: "0" }}
            accept="image/jpg, image/png, image/jpeg"
            name="explain"
            multiple
            ref={fourthFileInput}
          />
        </form>
        <form
          name="fifthImg"
          encType="multipart/form-data"
          acceptCharset="UTF-8"
        >
          <img
            className="img5"
            src={firstImage}
            onClick={() => {
              fifthFileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ opacity: "0" }}
            accept="image/jpg, image/png, image/jpeg"
            name="explain"
            multiple
            ref={fifthFileInput}
          />
        </form>
        <form
          name="sixthImg"
          encType="multipart/form-data"
          acceptCharset="UTF-8"
        >
          <img
            className="img6"
            src={firstImage}
            onClick={() => {
              sixthFileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ opacity: "0" }}
            accept="image/jpg, image/png, image/jpeg"
            name="explain"
            multiple
            ref={sixthFileInput}
          />
        </form>
        <form
          name="seventhImg"
          encType="multipart/form-data"
          acceptCharset="UTF-8"
        >
          <img
            className="img7"
            src={firstImage}
            onClick={() => {
              seventhFileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ opacity: "0" }}
            accept="image/jpg, image/png, image/jpeg"
            name="explain"
            multiple
            ref={seventhFileInput}
          />
        </form>
      </div>
    </form>
  );
};

export default CheckImg1;
