import { configureStore, createSlice } from "@reduxjs/toolkit";
import storageAPI from "../api/local";

const initialState = {
    todos: storageAPI.getTodos(),
    completed: storageAPI.getCompleted(),
}

const slice = createSlice({
    name: 'tempstore',
    initialState: initialState,
    reducers: {
        addItem (state, action) {
            state.todos.push(action.payload)
            storageAPI.addItem(action.payload)
        },
        updateItem (state, action) {
            const itemToUpdateIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos[itemToUpdateIndex] = action.payload;
            storageAPI.updateItem(action.payload);
        },
        completeItem (state, action) {
            const completedTodo = state.todos.find(todo => todo.id === action.payload.id);
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            state.completed.push(completedTodo);
            storageAPI.completeItem(action.payload);
        },
        uncheckTodo (state, action) {
            state.completed = state.completed.filter(item => item.id !== action.payload.id);
            state.todos.push(action.payload);
            storageAPI.uncheckTodo(action.payload);
        },
        deleteItem (state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            storageAPI.deleteItem(action.payload);
        },
        clearCompleted (state) {
            state.completed = [];
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