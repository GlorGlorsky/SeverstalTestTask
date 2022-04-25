import React from "react";
import SingleNote from "./SingleNote";
import { useState, useEffect } from "react";
import { loadNotesFromBd, createNoteInBD } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Notes = (props) => {
  const dispatch = useDispatch();

  const notes = useSelector((state) => {
    // console.log("state>>>>>>>>", state);
    const { notesReducer } = state;
    return notesReducer.notes;
  });
  console.log("notes>>>>>>>", notes);

  const [textNote, setTextNote] = useState("");

  //   console.log("notes props >", props);

  const handleInput = (e) => {
    // console.log("e.target.value>>>>>", e.target.value);
    setTextNote(e.target.value);
  };

  const handleSubmit = (e) => {
    let today = new Date();
    const date = today.toISOString().split("T")[0];
    e.preventDefault();
    console.log("submit textComment>>>>", textNote);
    if (textNote.trim().length) {
      dispatch(createNoteInBD(textNote, date, false));
    }
  };

  console.log(notes);

  let notesView;
  if (notes) {
    notesView =
      notes.length &&
      notes.map((res) => {
        return <SingleNote key={res.id} data={res} />;
      });
  }

  useEffect(() => {
    dispatch(loadNotesFromBd());
  }, [dispatch]);

  return notes.length > 0 ? (
    <div>
      {" "}
      <div>
        <div className="Notes">Введите заметку</div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Введите заметку"
            type="text"
            value={textNote}
            onChange={handleInput}
            className="Notes"
          />
          <input type="submit" hidden />
        </form>
        {/* {notes.length &&
   notes.map((res) => {
      return <SingleNote key={res.id} data={res} />;
    })}  */}
        {notesView}
      </div>
    </div>
  ) : (
    <div className="Notes">Скорее всего надо подключиться к серверу </div>
  );

  // return (
  // <div>
  //   <div className="Notes">Введите заметку</div>
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       placeholder="Введите заметку"
  //       type="text"
  //       value={textNote}
  //       onChange={handleInput}
  //       className="Notes"
  //     />
  //     <input type="submit" hidden />
  //   </form>
  //   {/* {notes.length &&
  //    notes.map((res) => {
  //       return <SingleNote key={res.id} data={res} />;
  //     })}  */}
  //   {notesView}
  // </div>
  // );
};

export default Notes;
