import e from "express";
import db from "../db/dbPGSQL.js";

class notesController {
  async getAll(req, res) {
    try {
      const note = await db.query("SELECT * from notes");
      res.json(note.rows);
    } catch (error) {
      res.status(500).json(e);
    }
  }

  async getOne(req, res) {
    try {
      const id = req.params.id;
      const note = await db.query(`SELECT * from notes  where id = ${id}`);
      res.json(note.rows);
    } catch (error) {
      res.status(500).json(e);
    }
  }

  async addNote(req, res) {
    try {
      console.log("addnote---->", req.body);
      const note = await db.query(
        `INSERT INTO notes (title, done, date) values ($1,$2,$3) RETURNING *`,
        [req.body.title, req.body.done, req.body.date]
      );
      res.json(note.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async deleteNote(req, res) {
    try {
      const id = req.params.id;
      const t = await db.query(`SELECT FROM notes where id = ${id}`);
      const { rowCount } = t;
      if (rowCount) {
        const note = await db.query(`DELETE FROM notes where id = ${id}`);
        res.json({ message: "Задание удалено" });
      } else {
        res.json({ message: "ID с таким заданием нет" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateNote(req, res) {
    try {
      const id = req.params.id;
      const { title, done } = req.body;
      console.log(title, done, id);
      // const note = await db.query(
      //   `UPDATE notes set title = ${title}, done = ${done} where id = ${id} RETURNING *`
      // );
      const note = await db.query(
        `UPDATE notes set title = $1, done = $2 where id = $3 RETURNING *`,
        [title, done, id]
      );
      res.json(note.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new notesController();
