import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import categoriesReducer from "./categoriesReducer";

export default combineReducers({
    notes: notesReducer,
    categories: categoriesReducer
});