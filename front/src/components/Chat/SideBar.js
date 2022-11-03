import React, { useContext } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { AppContext } from '../../Context/AppContext'
import "../../styles/Chat.css"
const SideBar = () => {
  const {socket,room,setRoom}=useContext(AppContext)
  
  return (
    <div>
      <h2>Avaliable rooms</h2>
      <ListGroup>
        {/* {rooms.map((room,idx)=>(
            <ListGroup.Item key={idx} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>{room}

            </ListGroup.Item>
        ))} */}
        <ListGroup.Item>{room}</ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default SideBar
