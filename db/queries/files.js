import db from "#db/client";

export async function createFile({ name, size, folderId }) {
  const sql = `
        INSERT INTO files (name, size, folder_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `;
  const {
    rows: [files],
  } = await db.query(sql, [name, size, folderId]);
  return files;
}

export async function getFilesWithFolder() {
  const sql = `
    SELECT
      files.*,
      folders.name AS folder_name
    FROM
      files
    JOIN
      folders
    ON
      files.folder_id = folders.id
    `;
  const { rows: files } = await db.query(sql);

  return files;
}
