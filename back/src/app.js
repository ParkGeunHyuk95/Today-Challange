import cors from "cors";
import express from "express";
import { userRouter } from "./routers/userRouter";
import { pointRouter } from "./routers/pointRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { challengeRouter } from "./routers/challengeRouter";
import { joinedChallengeRouter } from "./routers/joinedChallengeRouter";
import { userToChallengeRouter } from "./routers/userToChallengeRouter";
import { likedRouter } from "./routers/likedRouter";
// import { Socket } from "socket.io-client";
import socket from "socket.io";
import http from "http";

const app = express();
app.use(cors());

const server = http.createServer(app);
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
  console.log(socket);
  // });
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
});
server.listen(5002, () => {
  console.log("socket.io 서버 시작");
});

app.use(express.static("userImg"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("data project root api");
});
app.use(userRouter);

app.use("/challenges", challengeRouter);
app.use("/joinedChallenge", joinedChallengeRouter);
app.use(userToChallengeRouter);
app.use(pointRouter);
app.use(likedRouter);
app.use(errorMiddleware);

export { app };
