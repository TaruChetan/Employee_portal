import { configureStore } from "@reduxjs/toolkit";
import slice from "./slices/slice";

const store = configureStore({
  reducer: {
    mainReducer: slice,
  },
});

export default store;
