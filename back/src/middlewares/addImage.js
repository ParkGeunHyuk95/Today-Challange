const multer = require("multer");
const path = require("path");
const fs = require("fs");
import { Buffer } from "buffer";

function addImage(imgPath) {
  !fs.existsSync(imgPath) && fs.mkdirSync(imgPath);
  // const storage = multer({ dest: "uploads/" });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const filename = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, path.basename(filename, ext) + "-" + Date.now() + ext);
    },
    limits: { fileSize: 200 * 1024 * 1024 }, //200MB
  });

  return multer({ storage: storage });
  // return storage;
}

export { addImage };
