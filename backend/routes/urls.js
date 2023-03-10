const express = require("express");
const validUrl = require("valid-url");
const Url = require("../models/urls");

const router = express.Router();

// Ruta para crear una URL acortada
router.post("/api/shorten", async (req, res) => {
  const { url } = req.body;

  if (!validUrl.isUri(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const newUrl = new Url({ url });
  await newUrl.save();

  return res.status(201).json({ id: newUrl.id, shortUrl: newUrl.shortUrl });
});

// Ruta para redirigir a la URL original a partir de la URL acortada
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const urlData = await Url.findOne({ id });

  if (!urlData) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.redirect(urlData.url);
});

module.exports = router;
