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
      // 룸 타이틀에 해당하는 모든 메세지 가져온 후에 데이터 정렬하고 그거 프론트에 보내기
      let roomMessages = await getLastMessagesFromRoom(room);
      roomMessages = sortRoomMessagesByDate(roomMessages);
      socket.emit("room-messages", roomMessages);
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
      // sending message to room
      io.to(room).emit("room-messages", roomMessages);
      socket.broadcast.emit("notifications", room);
    });
  });
};
export { socketConfig };
