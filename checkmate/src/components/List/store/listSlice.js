import { createSlice } from "@reduxjs/toolkit";
import listAPI from "./localstorage";

const initialState = {
    todos: listAPI.getTodos(),
    completed: listAPI.getCompleted(),
}

const listSlice = createSlice({
    name: 'todo_list',
    initialState: initialState,
    reducers: {
        addItem (state, action) {
            state.todos.push(action.payload)
            listAPI.addItem(action.payload)
        },
        updateItem (state, action) {
            const itemToUpdateIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos[itemToUpdateIndex] = action.payload;
            listAPI.updateItem(action.payload);
        },
        completeItem (state, action) {
            const completedTodo = state.todos.find(todo => todo.id === action.payload.id);
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            state.completed.push(completedTodo);
            listAPI.completeItem(action.payload);
        },
        uncheckTodo (state, action) {
            state.completed = state.completed.filter(item => item.id !== action.payload.id);
            state.todos.push(action.payload);
            listAPI.uncheckTodo(action.payload);
        },
        deleteItem (state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            listAPI.deleteItem(action.payload);
        },
        clearCompleted (state) {
            state.completed = [];
            listAPI.clearCompleted();
        },
        dragReorder  (state, action) {
            const {oldIndex, newIndex} = action.payload;
            const splicedArr = state.todos.splice(oldIndex, 1);
            state.todos.splice(newIndex, -1, splicedArr[0]);
            listAPI.dragReorder(action.payload);
        }
    }
})

export const storeActions = listSlice.actions;
export default listSlice;