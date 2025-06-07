import express from "express";
import { getFolder, getFolders, getFolderWithFiles } from "#db/queries/folders";
import { createFile } from "#db/queries/files";
const foldersRouter = express.Router();
export default foldersRouter;

foldersRouter.route("/").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

foldersRouter.route("/:id").get(async (req, res, next) => {
  try {
    const folder = await getFolderWithFiles(Number(req.params.id));
    if (!folder) {
      res.status(404).send("Folder not found");
    }
    res.send(folder);
  } catch (err) {
    next(err);
  }
});

foldersRouter.route("/:id/files").post(async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).send("Request must have a body!");
    } else if (!req.body.name || !req.body.size) {
      res.status(400).send("File must have a name and size!");
    } else {
      const folder = await getFolder(Number(req.params.id));
      if (!folder) {
        res.status(404).send("Folder not found");
      }
      req.body = { ...req.body, folderId: folder.id };
      const file = await createFile(req.body);
      res.status(201).send(file);
    }
  } catch (err) {
    next(err);
  }
});
