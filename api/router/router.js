import Router from "express";
import NoteController from "../controller/noteController.js";

const router = new Router();

router.get("/note", NoteController.getAll);
router.get("/note/:id", NoteController.getOne);
router.post("/note", NoteController.addNote);
router.delete("/note/:id", NoteController.deleteNote);
router.put("/note/:id", NoteController.updateNote);
// router.put("/note/:id", NoteController.updateNoteToggle);


export default router;
