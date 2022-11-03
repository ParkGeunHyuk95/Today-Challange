import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import "../../styles/Chat.css"
const SideBar = () => {
    const rooms = ["플로깅", "비건", "분리수거", "쓰레기줍기","노샴푸","대중교통이용","포장하기"];
  return (
    <div>
      <h2>Avaliable rooms</h2>
      <ListGroup>
        {rooms.map((room,idx)=>(
            <ListGroup.Item key={idx} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>{room}

            </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default SideBar
