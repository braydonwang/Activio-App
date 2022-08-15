const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const planDraftRoute = require("./routes/planDraft");
const planRoute = require("./routes/plans");
const exerciseRoute = require("./routes/exercises");
const foodRoute = require("./routes/food");
const { spawn } = require("child_process");
const { PythonShell } = require("python-shell");

const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, fil, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// ML PREDICT
app.post("/api/predict", async (req, res) => {
  try {
    let predictionVal;
    let pyshell = new PythonShell("predict.py", { mode: "text" });

    pyshell.send(req.body.image);

    pyshell.on("message", function (message) {
      predictionVal = message;
    });

    pyshell.end(function (err, code, signal) {
      if (err) {
        console.log(err);
      }
      console.log("The exit code was: " + code);
      console.log("The exit signal was: " + signal);
      console.log("finished");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/planDrafts", planDraftRoute);
app.use("/api/plans", planRoute);
app.use("/api/exercises", exerciseRoute);
app.use("/api/food", foodRoute);

app.listen(process.env.PORT || "5000", () => {
  console.log("Backend is running.");
});

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
