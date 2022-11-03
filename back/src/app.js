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
const io = socket(server);

io.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket event: ${event}`);
  });
  // // socket room name == socket id
  // socket.on("room",(msg,done)=>{
  //   console.log(msg)
  socket.on("enterRoom", (roomName, done) => {
    socket.join(roomName);
    done();
    // //backend에서 func호출, frontEnd에서 실행
    // setTimeout(()=>{
    //   done()
    // }, 10000)
  });
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
