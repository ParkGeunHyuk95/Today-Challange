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

  // 🌈 app.get("/rooms", (req, res) => {
  // room title 가져오기
  //   res.json(rooms);
  //endpoint있는거는 router 따로 팠음
  // });
  const getLastMessagesFromRoom = async ({ challengeId }) => {
    // 룸 타이틀에 해당하는 메세지 모두 가져오기
    console.log("여기도 서버 크랙나서 challengeId 안나옴", challengeId);
    const data = await chat.getMessage({ challengeId });
    return data;
  };
  function sortRoomMessagesByDate(messages) {
    return messages.sort(function (a, b) {
      let date1 = a.date.split("/");
      let date2 = b.date.split("/");
      date1 = date1[2] + date1[0] + date1[1];
      date2 = date2[2] + date2[0] + date2[1];
      return date1 < date2 ? -1 : 1;
    });
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
      console.log("room", room);
      console.log("room", socket.rooms);
      // 룸;
      done();
      // 룸 타이틀에 해당하는 모든 메세지 가져온 후에 데이터 정렬하고 그거 프론트에 보내기
      const challengeId = await chat.findChallenge({ room });

      let roomMessages = await getLastMessagesFromRoom({ challengeId });
      console.log("room m", roomMessages);
      // // console.log("여기 위에 주석 해제 하기", roomMessages);
      // roomMessages = sortRoomMessagesByDate(roomMessages);
      // socket.emit("room-messages", roomMessages);
      // console.log("일단 여기까지 무사히 오면 너무 행복할듯????");
    });
    socket.on("messageRoom", async (room, content, sender, time, date) => {
      console.log("또 안돼?", sender);
      console.log("또 안돼?", room);
      const userId = sender.userId;
      const name = sender.name;
      const challengeId = await chat.findChallenge({ room });
      const chatData = {
        challengeId,
        content,
        userId,
        name,
        time,
        date,
      };

      const data = await chat.storeChat({ chatData });
      console.log("이상한데", challengeId);

      let roomMessages = await getLastMessagesFromRoom({ challengeId });
      roomMessages = sortRoomMessagesByDate(roomMessages);
      // sending message to room
      io.to(room).emit("room-messages", roomMessages);
      socket.broadcast.emit("notifications", room);
    });
  });
};
export { socketConfig };
