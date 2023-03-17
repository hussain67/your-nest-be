const morgan = require("morgan");
const express = require("express");
const app = express();
const apiInfoRouter = require("./routes/apiInfoRotes");
const authRouter = require("./routes/authRoutes");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", apiInfoRouter);
app.use("/api/v1/auth", authRouter);

module.exports = app;
