import express from "express";
const app = express();
export default app;

import foldersRouter from "#api/folders";
import filesRouter from "#api/files";

app.use(express.json());

app.get("/", (req, res, next) => {
  try {
    res.send("Welcome to the Fullstack Filez API!");
  } catch (err) {
    next(err);
  }
});

app.use("/folders", foldersRouter);
app.use("/files", filesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
