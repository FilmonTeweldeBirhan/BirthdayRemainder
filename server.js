require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const circlesRouter = require("./routes/circlesRoutes");

/* include telegram bot */
require("./Integration/telegram");

const app = express();

/* parsers */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api/v1/circles", circlesRouter);

process.on("uncaughtException", (err) => {
  console.error(`Error happend: ${err.message}`);
  console.error(err.stack);

  process.exit(1);
});

(async () => {
  await mongoose.connect(process.env.DATABASE);
  console.log("DATABASE CONNECTED!");

  const PORT = process.env.PORT || 8000;
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on port ${PORT}...`);
  });

  process.on("unhandledRejection", (err) => {
    console.error(`Unhandeled Rejection: ${err.message}`);

    server.close(() => {
      process.exit(1);
    });
  });
})();
