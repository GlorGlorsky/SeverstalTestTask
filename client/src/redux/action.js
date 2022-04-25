import {
  NOTE_CREATE,
  NOTE_UPDATE,
  NOTE_DELETE,
  NOTE_LOAD_FROM_BD,
  NOTE_DELETE_FROM_BD,
  NOTE_UPDATE_IN_BD,
  NOTE_CREATE_IN_BD,
  NOTE_TOGGLE_IN_BD,
} from "./types";

export function createComment(text, id) {
  return {
    type: NOTE_CREATE,
    data: { text, id },
  };
}

export function updateComment(text, id) {
  return {
    type: NOTE_UPDATE,
    data: { text, id },
  };
}

export function deleteComment(id) {
  return {
    type: NOTE_DELETE,
    id: id,
  };
}

export function loadNotesFromBd() {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:8080/api/note");
      const notes = await response.json();

      dispatch({
        type: NOTE_LOAD_FROM_BD,
        data: notes,
      });
    } catch (error) {
      console.log("error");
    }
  };
}

export function deleteNoteFromBd(id) {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/api/note/${id}`, {
      method: "DELETE",
    });
    const notes = await response.json();

    dispatch({
      type: NOTE_DELETE_FROM_BD,
      id: id,
      message: notes,
    });
  };
}

export function updateNoteInBD(data, id, done) {
  return async (dispatch) => {
    console.log("updateCommentInBD", data, id);
    const response = await fetch(`http://localhost:8080/api/note/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: data, done }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const notes = await response.json();
    console.log(notes);
    dispatch({
      type: NOTE_UPDATE_IN_BD,
      data: notes,
    });
  };
}

export function createNoteInBD(comment, date, done) {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/api/note`, {
      method: "POST",
      body: JSON.stringify({ title: comment, date, done }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const notes = await response.json();

    dispatch({
      type: NOTE_CREATE_IN_BD,
      data: notes,
    });
  };
}

export function toggleNoteInBD(id, done, title) {
  console.log("toggleCommentInBD>>>>>", id, done, title);
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/api/note/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: title, done }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const notes = await response.json();

    dispatch({
      type: NOTE_TOGGLE_IN_BD,
      data: notes,
      id: id,
    });
  };
}
