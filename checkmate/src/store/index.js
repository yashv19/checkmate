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

    }
})

const store = configureStore({
    reducer: slice.reducer,
})

export const storeActions = slice.actions;
export default store;