import React, { useContext, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AppContext } from "../../Context/AppContext";
import "../../styles/Chat.css";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
const SideBar = () => {
  const {
    socket,
    room,
    setRoom,
    currentRoom,
    setCurrentRoom,
    rooms,
    setRooms,
  } = useContext(AppContext);
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  const joinRoom = (room) => {
    socket.emit("enterRoom", room);
    setCurrentRoom(room);
  };
  useEffect(() => {
    if (isLogin) {
      Api.get("userToChallenge").then((res) => setRooms(res.data));
    }
   
  }, []);
  
  
  console.log(currentRoom)
  return (
    <div>
      <h2>Avaliable rooms</h2>
      <ListGroup>
        {!!rooms &&
          rooms.map((room, idx) => (
            <ListGroup.Item
              key={idx}
              onClick={() => joinRoom(room?.challenge?.title)}
              active={room.challenge.title == currentRoom}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {room.challenge.title}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default SideBar;
