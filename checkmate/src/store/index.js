import { configureStore, createSlice } from "@reduxjs/toolkit";
import storageAPI from "../api/local";

const initialState = {
    todos: storageAPI.get()
}

const slice = createSlice({
    name: 'tempstore',
    initialState: initialState,
    reducers: {
        addItem (state, action) {
            state.todos.push(action.payload)
            storageAPI.add(action.payload)
        },
        updateItem (state, action) {
            const itemToUpdateIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos[itemToUpdateIndex] = action.payload;
            storageAPI.update(action.payload);
        },
        deleteItem (state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            storageAPI.delete(action.payload);
        },
        clearCompleted (state) {
            state.todos = state.todos.filter(todo => !todo.checked);
            storageAPI.clearCompleted();
        },
        dragReorder  (state, action) {
            const {oldIndex, newIndex} = action.payload;
            const splicedArr = state.todos.splice(oldIndex, 1);
            state.todos.splice(newIndex, -1, splicedArr[0]);
            storageAPI.dragReorder(action.payload);
        }
    }
})

const store = configureStore({
    reducer: slice.reducer,
})

export const storeActions = slice.actions;
export default store;