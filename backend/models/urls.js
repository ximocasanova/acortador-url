const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema({
  id: String,
  url: String,
  shortUrl: String,
});

urlSchema.pre("save", function (next) {
  const url = this;
  
  if (!url.id) {
    url.id = shortid.generate();
  }

  url.shortUrl = `http://localhost:3000/${url.id}`;
  next();
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
