import "dotenv/config";
import { app } from "./src/app";
import { socketConfig } from "./src/config/socket";
console.log("app.js!!!!제발", socketConfig());
// socketConfig.server.listen(5002, () => {
//   console.log("socket.io 서버 시작");
// });

const PORT = process.env.SERVER_PORT || 5000;

socketConfig(
  app.listen(PORT, () => {
    console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
  }),
  app
);

// import { Socket } from "socket.io-client";
// import socket from "socket.io";
// import http from "http";

// // const server = http.createServer(app);
// console.log("index~~~~~~~~~~~~~~~!!!!!");
// const io = socket({ app });

// io.on("connection", (socket) => {
//   socket["nickname"] = "익명의 블롭피쉬";
//   socket.onAny((event) => {
//     console.log(`Socket Event: ${event}`);
//   });
//   // // socket room name == socket id
//   // socket.on("room",(msg,done)=>{
//   //   console.log(msg)
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

//   socket.on("new_message", (msg, room, done) => {
//     // new message: event이름, msg:input value, done:백엔드 로직 끝나면 프론트로 이동-프론트에서 addMessage실행
//     socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
//     done();
//   });

//   socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
// });
