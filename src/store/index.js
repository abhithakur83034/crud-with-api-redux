import rootReducer from "./slices";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistStore,persistReducer} from "redux-persist";

const persistConfig = {
    key:"todo",
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store  =configureStore({
    reducer : persistedReducer
})

export const persistor = persistStore(store);