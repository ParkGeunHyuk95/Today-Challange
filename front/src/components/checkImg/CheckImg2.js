import React, { useEffect, useRef, useState } from "react";
import blankImg from "../../images/createChallengePage/blankImg.png";
import "../../styles/checkChallenge/checkImg.css";
import axios from "axios";
import * as Api from "../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import CheckImgSlide from "../CheckImgSlide";

const CheckImg2 = ({ id,dif }) => {
  console.log("id", id);
  const [imgData,setImgData]=useState(null)
  const navigate = useNavigate();
  const [image, setImage] = useState({
    image_file: blankImg,
    preview_URL: blankImg,
  });
  let inputRef = useRef(null);
  useEffect(() => {
    Api.get(`joinedChallenge/mypage/${id}`).then((res) => {
      // console.log("res", res.data[0].addedImage);
      setImgData(res.data)
    });
  },[]);
  console.log(imgData?.length)
  console.log(dif+1)
  // const [firstImage, setFirstImage] = useState(blankImg);
  // const [secondImage, setSecondImage] = useState(blankImg);
  // const [thirdImage, setThirdImage] = useState(blankImg);
  // const [fourthImage, setFourthImage] = useState(blankImg);
  // const [fifthImage, setFifthImage] = useState(blankImg);
  // const [sixthImage, setSixthImage] = useState(blankImg);
  // const [seventhImage, setSeventhImage] = useState(blankImg);
  // const firstFileInput = useRef(null);
  // const secondFileInput = useRef(null);
  // const thirdFileInput = useRef(null);
  // const fourthFileInput = useRef(null);
  // const fifthFileInput = useRef(null);
  // const sixthFileInput = useRef(null);
  // const seventhFileInput = useRef(null);

  //이미지 저장
  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };
  //이미지 삭제
  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "img/default_image.png",
    });
  };

  const sendImageToServer = async () => {
    let res = {};
    if (image.image_file) {
      console.log("image.image)file", image.image_file);
      const formData = new FormData();
      formData.append("image", image.image_file);
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
          Api.put('addpoint').then((res)=>console.log('하핫',res))
          Swal.fire({
            position: "top-center",
            icon: "success",
            text: "업로드 성공",
          });
        }
      } catch (err) {
        // handle fail
        Swal.fire({
          position: "top-center",
          icon: "error",
          text: "업로드 실패",
        });
        console.log("인증하기 실패", err);
      }
    } else {
      alert("사진을 등록하세요");
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   for (let keyValue of formData) {
  //     console.log("keyValue -> ", keyValue);
  //   }
  //   let res = {};
  //   try {
  //     res = await axios({
  //       method: "post",
  //       url: `http://localhost:5001/joinedChallenge/${id}`,
  //       data: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //       },
  //     });
  //     if (res.status === 200 || res.status === 201) {
  //       Swal.fire({
  //         position: "top-center",
  //         icon: "success",
  //         text: "챌린지 생성 성공",
  //       });
  //     }
  //   } catch (err) {
  //     //handle fail
  //     console.log("인증하기 실패", err);
  //   }
  // };
  return (
    <div className="allcheck">
    <form encType="multipart/form-data" acceptCharset="UTF-8">
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        onChange={saveImage}
        //클릭할 때마다 file input의 value값을 초기화 하지 않으면 버그가 발생할 수 있음
        //사진 등록을 두 개 띄우고 첫번째 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
        onClick={(e) => (e.target.value = null)}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none"}}
      ></input>
      <div className="img-wrapper">
        <img style={{width:'30%'}} src={image.preview_URL}></img>
      </div>
      <div className="upload-btn">
        <button disabled={!!imgData&&dif&&imgData.length>=dif+1} type="button" onClick={() => inputRef.click()}>
          미리보기
        </button>
        <button type="button" onClick={deleteImage}>
          삭제하기
        </button>
        <button disabled={!!imgData&&dif&&imgData.length>=dif+1} type="button" onClick={sendImageToServer}>
          업로드하기
        </button>
      </div>
      {/* <div id="checkImgContainer">
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
      </div> */}
    </form>
    <div className="checkImgCarousel">
    <CheckImgSlide imgData={imgData}/>
    </div>
    </div>
  );
};

export default CheckImg2;
