import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "../../styles/network/networkcard.css";
import * as Api from "../../api";
import UserLike from "../UserLike";
const MychallengeCard = ({ item }) => {
  var today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;
  let navigate = useNavigate();
  const mainImg = item.challenge.mainImg;
  const [person, setPerson] = useState();
  const [user, setUser] = useState("");
  useEffect(() => {
    Api.get(`countJoinUser/${item.challenge.challengeId}`).then((res) =>
      setPerson(res)
    );
    Api.get("currentUser").then((res) => setUser(res.data));
  }, []);
  console.log(item.challenge.holdUserId);
  console.log(user.userId);
  return (
    <Card
      id="cardBody12"
      className="mb-3 ms-3 mr-5 card-body"
      style={{
        width: "16rem",
        borderRadius: "3%",
        border:
          new Date(item.challenge.fromDate) <= new Date(dateString)
            ? "none "
            : "2px solid #6A71E6",
        background:
          new Date(item.challenge.fromDate) <= new Date(dateString)
            ? "rgb(179, 176, 176, 0.6)"
            : "none",
      }}
    >
      <Card.Body>
        <div className="imageWrap">
          <Card.Img className="mb-3 imgSize" src={mainImg} alt="대표 사진" />

          <Card.Title>{item?.challenge.title}</Card.Title>

          <div className="cardtext">
            👨‍👧‍👧 {person?.data}
            <UserLike challengeId={item.challenge.challengeId} />
          </div>
          <div className="duration">
            <a className="cardSubText">
              {item?.challenge.fromDate}-{item?.challenge.toDate}
            </a>{" "}
          </div>
          <button
            className="networkButton"
            onClick={() => {
              navigate(`/checkChallenge/${item.challenge.challengeId}`);
            }}
          >
            인증하기
          </button>
          {user.userId === item.challenge.holdUserId ? (
            <button
              className="editButton"
              onClick={() => {
                navigate(`/editChallenge/${item.challenge.challengeId}`);
              }}
            >
              수정하기
            </button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MychallengeCard;
