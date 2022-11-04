// import { Socket } from "socket.io-client";
import socket from "socket.io";
import { chat } from "../models/chat";

const socketConfig = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // app.get("/rooms", (req, res) => {
  // room title 가져오기
  //   res.json(rooms);
  // });
  async function getLastMessagesFromRoom(room) {
    // 룸 타이틀에 해당하는 메세지 모두 가져오기
    // let roomMessages = await Message.aggregate([
    //   { $match: { to: room } },
    //   { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
    // ]);
    // return roomMessages;
  }
  function sortRoomMessagesByDate(messages) {
    // return messages.sort(function (a, b) {
    //   let date1 = a._id.split("/");
    //   let date2 = b._id.split("/");
    //   date1 = date1[2] + date1[0] + date1[1];
    //   date2 = date2[2] + date2[0] + date2[1];
    //   return date1 < date2 ? -1 : 1;
    // });
  }

  //소켓연결
  io.on("connection", (socket) => {
    socket.on("new-user", (socket) => {
      // const members = await User.find();
      // io.emit("new-user", members);
      // console.log(members);
      console.log(socket);
    });
    socket.on("enterRoom", async (room, done) => {
      socket.join(room);
      룸;
      done();
      // 룸 타이틀에 해당하는 모든 메세지 가져온 후에 데이터 정렬하고 그거 프론트에 보내기
      // let roomMessages = await getLastMessagesFromRoom(room);
      // roomMessages = sortRoomMessagesByDate(roomMessages);
      // socket.emit("room-messages", roomMessages);
    });
    socket.on("messageRoom", async (room, content, sender, time, date) => {
      const newMessages = await Message.create({
        content,
        from: sender,
        time,
        date,
        to: room,
      });
      let roomMessages = await getLastMessagesFromRoom(room);
      roomMessages = sortRoomMessagesByDate(roomMessages);
      // sending message to room
      io.to(room).emit("room-messages", roomMessages);
      socket.broadcast.emit("notifications", room);
    });
  });
  // io.on("connection", (socket) => {
  //   // socket["nickname"] = "익명의 블롭피쉬";
  //   // socket.onAny((event) => {
  //   // console.log(`Socket Event: ${event}`);
  //   // console.log(socket);
  //   // });
  //   //   // // socket room name == socket id
  //   // socket.on("room",(msg,done)=>{
  //   //   console.log(msg)
  //   //   socket.on("enterRoom", (roomName, done) => {
  //   //     socket.join(roomName);
  //   //     done();
  //   //     socket.to(roomName).emit("welcome", socket.nickname);
  //   //     // //backend에서 func호출, frontEnd에서 실행
  //   //     // setTimeout(()=>{
  //   //     //   done()
  //   //     // }, 10000)
  //   //   });
  //   //   socket.on("disconnecting", () => {
  //   //     socket.rooms.forEach((room) =>
  //   //       socket.to(room).emit("bye", socket.nickname)
  //   //     );
  //   //   });
  //   //   //front code
  //   //   // socket.on("💧welcome/ bye", ()=>{addMessage("someone joined!")})
  //   //   //=> 콜백함수 사용하는용!(엔포느낌)
  //   socket.on("new_message", async (msg) => {
  //     // new message: event이름, msg:input value, done:백엔드 로직 끝나면 프론트로 이동-프론트에서 addMessage실행
  //     // socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
  //     // done();
  //     // ❓socket.emit("rooms", io.sockets.adapter.rooms);
  //     console.log();
  //     console.log("new message:", msg);
  //     // console.log("new message:", chat);
  //     const message = { msg };
  //     const data = await chat.storeChat({ message });
  //   });
  //   socket.on("enterRoom", (roomName, done) => {
  //     socket.join(roomName);
  //     console.log("roomName:", roomName);
  //     done();
  //     socket.to(roomName).emit("welcome");
  //   });

  //   socket.on("disconnecting", () => {
  //     socket.rooms.forEach((room) => socket.to(room).emit("bye"));
  //   });
  //   //   socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
  //   return server;
  // });
};
export { socketConfig };
