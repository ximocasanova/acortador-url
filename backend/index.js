const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const urlRoutes = require("./routes/urls");

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

app.use("", urlRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
