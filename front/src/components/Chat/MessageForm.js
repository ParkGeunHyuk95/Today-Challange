import React, { useContext, useState } from "react";
import "../../styles/Chat.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import {UserStateContext} from '../../App'
const MessageForm = () => {
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    const userState = useContext(UserStateContext);
    const isLogin = !!userState.user;
    const [message,setMessage]=useState('')
  return (
    <>
    <div className="messagesOutput">
      <div className="alert alert-info">You are in the 뭐시기뭐시기 room</div>
      <div className="messageInner"></div>
    </div>
    <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your message"
                disabled={!isLogin}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "orange" }}
              disabled={!isLogin}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
    
  );
};

export default MessageForm;
