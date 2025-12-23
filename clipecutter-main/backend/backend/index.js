const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/cut", async (req, res) => {
  const { url, start, end } = req.body;

  const id = Date.now();
  const input = `temp/input_${id}.mp4`;
  const output = `temp/output_${id}.mp4`;

  const downloadCmd = `yt-dlp -f mp4 -o "${input}" "${url}"`;
  const cutCmd = `ffmpeg -i "${input}" -ss ${start} -to ${end} -c copy "${output}"`;

  exec(`${downloadCmd} && ${cutCmd}`, (err) => {
    if (err) return res.status(500).send("Erro no processamento");
    res.download(output);
  });
});

app.listen(3001, () => console.log("Backend rodando na porta 3001"));

