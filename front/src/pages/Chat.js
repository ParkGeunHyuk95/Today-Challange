import React from "react";
import MessageForm from "../components/Chat/MessageForm";
import SideBar from "../components/Chat/SideBar";
import NavBar from "../components/NavBar";
import "../styles/Chat.css";
import { Col, Container, Row } from 'react-bootstrap'
const Chat = () => {
  return (
    <div className="chatpage">
      <NavBar />
      <div className="chatContainer">
      <Container>
    <Row>
      <Col md={4}><SideBar/></Col>
      <Col md={8}><MessageForm/></Col>
    </Row>
   </Container>
      </div>
    </div>
  );
};

export default Chat;
