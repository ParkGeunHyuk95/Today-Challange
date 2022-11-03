import React, { useState, useEffect, useCallback } from "react";
import { Button, Col } from "react-bootstrap";
import * as Api from "../../src/api";
import likeimg from "../images/userLiked/like.png";
import likedimg from "../images/userLiked/liked.png";
import "../styles/network/userLike.css";
function UserLike({ challengeId }) {
  
  const [countLike, setCountLike] = useState("0");
  // const myId = 1;
  const [myId,setMyid]=useState(null)
  const [likeStatus, setLikeStatus] = useState(false);
  const [checkUserId, setCheckUserId] = useState("");
//      useEffect(()=>{
//   liked.forEach(x=>{
//     x.userId === myId && setLike(true)
//   })
// },[])
  useEffect(()=>{
    
    Api.get('currentUser').then((res)=>setMyid(res.data.userId))
    Api.get(`likedCount/${challengeId}`).then((res) =>
    setCountLike(res.data.length))
   
  },[])
  useEffect(()=>{
    Api.get(`likedCount/${challengeId}`).then((res) =>
    setCountLike(res.data.length))
  },[countLike])
  
  useEffect(()=>{
    Api.get(`likedCount/${challengeId}`).then((res)=>(res.data.forEach(x => {
      x.userId === myId && setLikeStatus(true)
     })))
  },[myId])
  
  return (
    <div>
      <div
        onClick={async() => {
          let res={}
         
          res=await Api.post("liked", {
            challengeId,
          })
          {
            res?.data==='liked 해제'? setLikeStatus(false): setLikeStatus(true)
          }
          setCountLike(res.data)
          // checkUserId==myId ? setLikeStatus(false): setLikeStatus(true)
         
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
