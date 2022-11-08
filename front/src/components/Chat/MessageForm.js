import React, { useContext, useEffect, useRef, useState } from "react";
import "../../styles/Chat.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { UserStateContext } from "../../App";
import { AppContext } from "../../Context/AppContext";
import * as Api from "../../api";
const MessageForm = () => {
  const [user, setUser] = useState(null);
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("messageRoom", roomId, message, user, time, todayDate);
    setMessage("");
  };
  useEffect(() => {
    Api.get("currentUser").then((res) => setCurrentUserId(res.data.userId));
    Api.get("userImg").then((res) => setProfileImage(res.data));
    Api.get("currentUser").then((res) => setName(res.data.name));
    Api.get("currentUser").then((res) => setUser(res.data));
  }, []);
  
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  const { socket, currentRoom, setMessages, messages } = useContext(AppContext);
  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  };
  const todayDate = getFormattedDate();

  useEffect(() => {
    socket.off("room-messages").on("room-messages", (roomMessages) => {
      setMessages(roomMessages);
    });
  }, [currentRoom]);
  
  useEffect(()=>{
    scrollToBottom();
  },[messages])
  console.log(messages)
  return (
    <>
      <div className="messagesOutput">
        {user ? (
          <div className="alert alert-info">
            {currentRoom
              ? `You are in the ${currentRoom} room`
              : "참여할 채팅방을 클릭해주세요"}
          </div>
        ) : (
          <div className="alert alert-danger">Please login</div>
        )}
        {user &&
          messages.map(({ _id:date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center messageDateIndicator">
                {date}
              </p>
              {messagesByDate?.map(
                ({ content, time, userId: sender,name:name }, msgIdx) => (
                  <div
                    className={
                      sender == currentUserId
                        ? "incomingMessage"
                        : "message"
                    }
                    key={msgIdx}
                  >
                    <div className="messageInner">
                      <div className="d-flex align-items-center mb-3">
                        <p className="messageSender">
                          {sender == currentUserId ? "You" : name}
                        </p>
                      </div>
                      <p className="messageContent">{content}</p>
                      <p className="messageTimestampLeft">{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
           <div ref={messageEndRef} />
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
