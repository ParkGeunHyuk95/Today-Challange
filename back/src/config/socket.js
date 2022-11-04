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
  // const server = http.createServer(app);
  // const io = socket(server);

  io.on("connection", (socket) => {
    // socket["nickname"] = "익명의 블롭피쉬";
    // socket.onAny((event) => {
    // console.log(`Socket Event: ${event}`);
    // console.log(socket);
    // });
    //   // // socket room name == socket id
    // socket.on("room",(msg,done)=>{
    //   console.log(msg)
    //   socket.on("enterRoom", (roomName, done) => {
    //     socket.join(roomName);
    //     done();
    //     socket.to(roomName).emit("welcome", socket.nickname);
    //     // //backend에서 func호출, frontEnd에서 실행
    //     // setTimeout(()=>{
    //     //   done()
    //     // }, 10000)
    //   });
    //   socket.on("disconnecting", () => {
    //     socket.rooms.forEach((room) =>
    //       socket.to(room).emit("bye", socket.nickname)
    //     );
    //   });
    //   //front code
    //   // socket.on("💧welcome/ bye", ()=>{addMessage("someone joined!")})
    //   //=> 콜백함수 사용하는용!(엔포느낌)
    socket.on("new_message", async (msg) => {
      // new message: event이름, msg:input value, done:백엔드 로직 끝나면 프론트로 이동-프론트에서 addMessage실행
      // socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
      // done();
      // ❓socket.emit("rooms", io.sockets.adapter.rooms);
      console.log();
      console.log("new message:", msg);
      // console.log("new message:", chat);
      const message = { msg };
      const data = await chat.storeChat({ message });
    });
    socket.on("enterRoom", (roomName, done) => {
      socket.join(roomName);
      console.log("roomName:", roomName);
      done();
      socket.to(roomName).emit("welcome");
    });

    socket.on("disconnecting", () => {
      socket.rooms.forEach((room) => socket.to(room).emit("bye"));
    });
    //   socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
    return server;
  });
};
export { socketConfig };
