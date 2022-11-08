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
  function aggregateM(roomMessages) {
    const result = [];
    let count = 1;

    for (let i = 0; i < roomMessages.length; i++) {
      if (i === 0) {
        result.push({ _id: roomMessages[i].date });
        result.push([roomMessages[0]]);
        continue;
      } else if (roomMessages[i - 1].date == roomMessages[i].date) {
        result[count].push(roomMessages[i]);
      } else {
        result.push({ _id: roomMessages[i].date });
        result.push([roomMessages[i]]);
        count += 2;
      }
    }
    console.log("result", result);
    return result;
  }

  //소켓연결
  io.on("connection", (socket) => {
    socket.on("new-user", (socket) => {
      // const members = await User.find();
      // io.emit("new-user", members);
      // console.log(members);
      console.log(socket);
    });
    socket.on("enterRoom", async (room) => {
      socket.join(room);
      console.log("room", room);
      console.log("room", socket.rooms);
      // 룸;
      
      // 룸 타이틀에 해당하는 모든 메세지 가져온 후에 데이터 정렬하고 그거 프론트에 보내기
      const challengeId = await chat.findChallenge({ room });

      let roomMessages = await getLastMessagesFromRoom({ challengeId });
      roomMessages = sortRoomMessagesByDate(roomMessages);
      let allMessages = aggregateM(roomMessages);
      socket.emit("room-messages", allMessages);
    });
    socket.on("messageRoom", async (room, content, sender, time, date) => {
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

      let roomMessages = await getLastMessagesFromRoom({ challengeId });
      roomMessages = sortRoomMessagesByDate(roomMessages);
      let allMessages = aggregateM(roomMessages);
      // sending message to room
      io.to(room).emit("room-messages", allMessages);
      socket.broadcast.emit("notifications", room);
    });
  });
};
export { socketConfig };
