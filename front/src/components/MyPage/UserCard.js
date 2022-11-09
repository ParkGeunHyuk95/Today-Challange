import React, { useRef, useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/mypage/mypage.css";
import UserEditForm from "./UserEditForm";
import * as Api from "../../api";
import axios from "axios";

const UserCard = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    Api.get("currentUser").then((res) => setName(res.data.name));
    Api.get("userImg").then((res) => setProfileImage(res.data));
  }, []);
  const [showForm, setShowForm] = useState(false);
  const [showContent, setShowContent] = useState("정보수정");
  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdW1f0vtx6CSeYeTkNJtlAR27mmUGtANNA1g&usqp=CAU"
  );
  // const [img, setImg] = useState("");
  const formData = new FormData();
  const fileInput = useRef(null);

  const onChangeImage = (e) => {
    // let res = {};
    let img = "";
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async function () {
      img = reader.result;
      console.log("img", img);
      try {
        await Api.put("userImg", {
          img,
        });
        // console.log("res.data :", res.data);
      } catch (err) {
        console.log("userImg 업로드 실패!");
        // }
      }
      try {
        const res = await Api.get("userImg");
        setProfileImage(res.data);
        console.log("getRes : ", res.data);
        // console.log("profileImage : ", profileImage);
      } catch (err) {
        console.log("유저이미지를 get하지 못함", err);
      }
    };
  };
  console.log("profileImage :", profileImage);
  return (
    <div className="userprofile">
      <form className="imageForm" encType="multipart/form-data">
        <img
          className="profileImage"
          src={profileImage}
          encType="multipart/form-data"
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/jpg, image/png, image/jpeg"
          name="Img"
          onChange={onChangeImage}
          ref={fileInput}
        ></input>
      </form>
      <h2>{name}</h2>

      {showForm == true ? (
        <>
          <UserEditForm
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            showForm={showForm}
            setShowForm={setShowForm}
            setShowContent={setShowContent}
            showContent={showContent}
          />
          
        </>
      ) : (
        <>
          <StyledButton
            onClick={() => {
              showForm == true ? setShowForm(false) : setShowForm(true);
              showContent == "정보수정"
                ? setShowContent("취소하기")
                : setShowContent("정보수정");
              Api.get("currentUser").then((res) => setName(res.data.name));
            }}
          >
            {showContent}
          </StyledButton>
        </>
      )}
    </div>
  );
};

export default UserCard;
