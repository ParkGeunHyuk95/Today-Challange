import React, { useContext, useEffect } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { AppContext } from '../../Context/AppContext'
import "../../styles/Chat.css"
const SideBar = () => {
  const {socket,room,setRoom,currentRoom,setCurrentRoom,rooms,setRooms}=useContext(AppContext)
  
  const getRooms=()=>{
    //룸목록가져와야함

  }
  const joinRoom=()=>{
    socket.emit('enterRoom',room,currentRoom);
    setCurrentRoom(room)
  }
  useEffect(()=>{
    getRooms();
  },[])
  return (
    <div>
      <h2>Avaliable rooms</h2>
      <ListGroup>
        {/* {rooms.map((room,idx)=>(
            <ListGroup.Item key={idx} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>{room}

            </ListGroup.Item>
        ))} */}
        <ListGroup.Item>{currentRoom}</ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default SideBar
