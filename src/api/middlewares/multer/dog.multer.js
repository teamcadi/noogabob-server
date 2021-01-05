// 임시 코드!

import multer from "multer";
import config from "../../../configs";

const options = {
  fileFilter: (req, file, cb) => {
    if (!file) cb(new Error("파일 없음"), false);
    else {
      const arr = file.originalname.split(".");
      file.type = arr[arr.length - 1].toLowerCase();
      if (file.type === "xlsx") cb(null, true);
      else {
        const error = new Error("Not Excel");
        error.status = 400;
        cb(error, false);
      }
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload");
    },
    filename: (req, file, cb) => {
      req.fileName = `${Date.now()}.${file.type}`;
      cb(null, req.fileName);
    },
  }),
  //   limits: { fileSize: 20 * 1024 * 1024 },
};

export const dogImageUpload = multer(options).single(config.excelFieldName);
