import express from "express";
import cors from "cors";
import router from "./router/router.js";
import db from "./db/dbPGSQL.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

async function startApp() {
  try {
    app.listen(PORT, () =>
      console.log(`SERVER STARTED at http://localhost:${PORT}`)
    );
    await db.query(
      "create TABLE IF NOT EXISTS notes(id SERIAL PRIMARY KEY,title VARCHAR(255),done BOOLEAN,date DATE);"
    );

    await db.query(
      "insert into notes (title, done, date) values ($1,$2,$3) RETURNING *",
      ["Тестовая заметка", false, "2022-02-25"]
    );
  } catch (e) {
    console.log(e);
  }
}

await startApp();
