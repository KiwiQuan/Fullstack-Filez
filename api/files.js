import express from "express";
import { getFilesWithFolder, createFile } from "#db/queries/files";
const filesRouter = express.Router();
export default filesRouter;

filesRouter.route("/").get(async (req, res) => {
  const files = await getFilesWithFolder();
  res.send(files);
});
