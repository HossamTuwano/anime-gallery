const express = require("express");
const cors = require("cors");
const testRoute = require("./routes/test");
const mongoose = require("mongoose");
const photosRouter = require("./routes/photos");
const multer = require("multer");

require("dotenv").config();

const app = express();
const port = process.env.port;
const dbURI = process.env.DB_URI;
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimeType === "image/png" ||
    file.mimeType === "image/jpg" ||
    file.mimeType === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(testRoute);
app.use(photosRouter);
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("photo")
);

// connecting to mongoose

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => console.log(`server running at ${port}`));
  })
  .then(
    mongoose.connection.on("open", () => {
      console.log("connected to database");
    })
  );
