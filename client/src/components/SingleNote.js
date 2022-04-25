import React from "react";
import { useState, useEffect } from "react";
import {
  updateNoteInBD,
  toggleNoteInBD,
} from "../redux/action";
import { useDispatch } from "react-redux";
import { deleteNoteFromBd } from "../redux/action";

const SingleNote = (props) => {
  const [noteText, setNotetText] = useState("");
  const [toggleDone, setToggleDone] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (props.data.title) {
      setNotetText(props.data.title);
      setToggleDone(props.data.done);
    }
  }, [props.data.title, props.data.done]);

  const handleInput = (e) => {
    setNotetText(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // console.log("onSubmit>>>>", noteText);

    dispatch(updateNoteInBD(noteText, props.data.id, false));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteNoteFromBd(props.data.id));
  };

  const handleCheck = (e) => {
    const { target } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setToggleDone(value);
    console.log(value);
    if (value) {
      console.log(props.data.id, value, noteText);
      dispatch(toggleNoteInBD(props.data.id, value, noteText));
    } else {
      console.log(props.data.id, value, noteText);
      dispatch(toggleNoteInBD(props.data.id, value, noteText));
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate} className="comments-item">
        <input type="checkbox" onChange={handleCheck} checked={toggleDone} className="checkbox-item" />
        <input type="text" value={noteText} onChange={handleInput} className="singleInput"/>
        <input type="submit" hidden />
        <div onClick={handleDelete} className="comments-item-delete">
          &times;
        </div>
      </form>
    </div>
  );
};

export default SingleNote;
