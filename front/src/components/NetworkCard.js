import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/network/networkcard.css";
import ChallengeDetailModal from "./ChallengeDetailModal/ChallengeDetailModal";
import UserLike from "./UserLike";
import * as Api from "../api";
const NetworkCard = ({ item, countPerson }) => {
  const getDateDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const diffDate = date1.getTime() - date2.getTime();
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };
  const [challengeDetailModalOpen, setChallengeDetailModalOpen] =
    useState(false);
  const [challengeItem, setChallengeItem] = useState(null);
  
  const showChallengeDetailModalOpen = () => {
    setChallengeDetailModalOpen(true);
    setChallengeItem(item.challengeId);
  };
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  const Id = item.challengeId;
  const mainImg = item.mainImg;
  
  const [person, setPerson] = useState();
  useEffect(() => {
    Api.get("countJoinUser", item.challengeId).then((res) => setPerson(res));
  }, []);
  console.log(person);
  return (
    <Card
      id="cardBody"
      className="mb-3 ms-3 mr-5 card-body"
      style={{
        width: "16rem",
        borderRadius: "3%",
        border:
          new Date(item.fromDate) <= new Date(dateString)
            ? "none "
            : "2px solid #6A71E6",
        background:
          new Date(item.fromDate) <= new Date(dateString)
            ? "rgb(179, 176, 176, 0.6)"
            : "none",
      }}
    >
      <Card.Body>
        <div className="imageWrap">
          <Card.Img
            className="mb-3"
            src={mainImg}
            alt="대표 사진"
            onClick={showChallengeDetailModalOpen}
          />

          <Card.Title onClick={showChallengeDetailModalOpen}>
            {item?.title}
          </Card.Title>

          <div className="cardtext">
            👨‍👧‍👧 {countPerson}
            <UserLike challengeId={item.challengeId} />
          </div>
          <div className="duration">
            <a className="cardSubText">
              {item?.fromDate}-{item?.toDate}
            </a>{" "}
          </div>

          {challengeDetailModalOpen && (
            <ChallengeDetailModal
              setChallengeDetailModalOpen={setChallengeDetailModalOpen}
              item={item}
            />
          )}
         
        </div>
      </Card.Body>
    </Card>
  );
};

export default NetworkCard;
