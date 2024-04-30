require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const PORT = process.env.PORT || 5000;
const router = require("./router/router");

const app = express();
connectDB();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
/* ------------------
-- Create a book 
--------------------*/

app.use(router);
