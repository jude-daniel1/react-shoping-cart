const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRegister = require("./routes/register");
const userLogin = require("./routes/login");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/register", userRegister);
app.use("/api/login", userLogin);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DATABASE CONNECTED SUCCESSFUlLY"))
  .catch((error) => console.log(`DATABASE CONNECTION FAILED ${error.message}`));

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
