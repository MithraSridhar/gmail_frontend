import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "./../redux/emailSlice";
import userReducer from "./../redux/userSlice";

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer,
  },
});