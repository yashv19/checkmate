import { configureStore } from "@reduxjs/toolkit";
import listSlice from "../components/List/store/listSlice";

const store = configureStore({
    reducer: listSlice.reducer,
})


export default store;