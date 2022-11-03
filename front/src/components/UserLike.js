import React, { useState, useEffect, useCallback } from "react";
import { Button, Col } from "react-bootstrap";
import * as Api from "../../src/api";
import likeimg from "../images/userLiked/like.png";
import likedimg from "../images/userLiked/liked.png";
import "../styles/network/userLike.css";
function UserLike({ challengeId }) {
  const [likeImoticon, setLikeImoticon] = useState(false);
  const [countLike, setCountLike] = useState("0");
  // const myId = 1;
  const [myId,setMyid]=useState('')
  const [likeStatus, setLikeStatus] = useState(false);
  const [checkUserId, setCheckUserId] = useState("");
  useEffect(()=>{
    Api.get('currentUser').then((res)=>setMyid(res.data.userId))
    Api.get('liked').then((res)=>setCheckUserId(res.data))
    Api.get(`likedCount/${challengeId}`).then((res) =>
    setCountLike(res.data.length))
    Api.get(`likedCount/${challengeId}`).then((res)=>console.log('asd',res.data.map((item)=>item.userId)))
  },[])
  useEffect(()=>{
    Api.get(`likedCount/${challengeId}`).then((res) =>
    setCountLike(res.data.length))
  },[countLike])
  console.log('이건뭐임',checkUserId)
  return (
    <div>
      <div
        onClick={(e) => {
          
          Api.post("liked", {
            challengeId,
          }).then((res)=> res=='실패'? null: setCountLike(res.data))
          
        }}
        id="userLike"
        className="likeButton"
      >
        {likeStatus ? <img src={likedimg} /> : <img src={likeimg} />}
        <span className="ms-2">{countLike} Likes</span>
      </div>
    </div>
  );
}

export default UserLike;
