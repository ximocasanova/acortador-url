const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const shortid = require("shortid");
const validUrl = require("valid-url");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error(error));

const urlSchema = new mongoose.Schema({
  id: String,
  url: String,
  shortUrl: String,
});

const Url = mongoose.model("Url", urlSchema);

// Ruta para crear una URL acortada
app.post("/api/shorten", async (req, res) => {
  const { url } = req.body;

  if (!validUrl.isUri(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const id = shortid.generate();
  const shortUrl = `http://localhost:3000/${id}`;

  const newUrl = new Url({ id, url, shortUrl });
  await newUrl.save();

  return res.status(201).json({ id, shortUrl });
});

// Ruta para redirigir a la URL original a partir de la URL acortada
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const urlData = await Url.findOne({ id });

  if (!urlData) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.redirect(urlData.url);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});