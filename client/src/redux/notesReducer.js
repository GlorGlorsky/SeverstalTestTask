import {
  NOTE_LOAD_FROM_BD,
  NOTE_DELETE_FROM_BD,
  NOTE_UPDATE_IN_BD,
  NOTE_CREATE_IN_BD,
  NOTE_TOGGLE_IN_BD
} from "./types";

const initialState = {
  notes: [],
};

export const notesReducer = (state = initialState, action) => {
  console.log("notes reducer >", action);
  console.log("data in reducer action.id >", action.id);
  console.log("data in reducer data.id >", action.data);
  console.log("state >", state);
  console.log("state >", action.data);
  switch (action.type) {


    case NOTE_CREATE_IN_BD:
      console.log(action.data);
      return {
        ...state,
        notes: [...state.notes, action.data],
      };

    case NOTE_LOAD_FROM_BD:
      const notesNew = action.data.map((res) => {
        return {
          title: res.title,
          id: res.id,
          done: res.done,
        };
      });
      
      return {
        ...state,
        notes: notesNew,
      };

    case NOTE_DELETE_FROM_BD:
      console.log("inside NOTE_DELETE_FROM_BD");
      const id = action.id;
      const newArr = state.notes.filter((el) => el.id !== id);
      console.log(newArr);
      return {
        ...state,
        notes: newArr,
      };

    case NOTE_UPDATE_IN_BD:
      console.log("inside NOTE_UPDATE_FROM_BD");
      const { data } = action;
      const { notes } = state;
      const itemIndex = notes.findIndex((res) => res.id === data.id);

      const nextNotes = [
        ...notes.slice(0, itemIndex),
        data,
        ...notes.slice(itemIndex + 1),
      ];
      return {
        ...state,
        notes: nextNotes,
      };

    default:
      return state;
  }
};
