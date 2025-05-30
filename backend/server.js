import express from "express";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fileupload from "express-fileupload";
import cors from "cors";
import { Readable } from "stream";
import dotenv from "dotenv"
import path from "path";

const app = express();
ffmpeg.setFfmpegPath(ffmpegPath);
const __dirname = path.resolve();

app.use(cors());
app.use(fileupload());
dotenv.config()


app.post("/upload", (req, res) => {
  if (!req.files || !req.files.video) {
    return res.status(400).send("No video file uploaded.");
  }

  const videoFile = req.files.video;
  const inputStream = Readable.from(videoFile.data);
  const ext = videoFile.name.split(".").pop().toLowerCase();

  let responseSent = false; // 👈 Track if response was already sent

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Disposition", "inline; filename=converted.mp3");

  const ffmpegCommand = ffmpeg()
    .input(inputStream)
    .inputFormat(ext)
    .toFormat("mp3")
    .on("error", (err) => {
      console.error("FFmpeg error:", err.message);
      if (!responseSent) {
        responseSent = true;
        // Don't try res.status if streaming has started
        res.end(); // Just close the stream if partially sent
      }
    })
    .on("end", () => {
      console.log("Conversion successful");
      responseSent = true; // ✅ Mark response complete
    });

  ffmpegCommand.pipe(res, { end: true });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist"))); // or "build" for CRA
  app.get("*", (req, res) => {
    console.log(req.url);
    
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });

}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
