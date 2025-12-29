import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/rootReducer";

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.MODE !== "production" ? true : false,
});

export default store;