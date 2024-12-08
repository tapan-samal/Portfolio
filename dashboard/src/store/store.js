import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import passwordReducer from "./slices/passwordSlice";
import skillReducer from "./slices/skillSlice";
import projectReducer from "./slices/projectSlice";
import timelineReducer from "./slices/timelineSlice";
import applicationToolReducer from "./slices/applicationToolSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    password: passwordReducer,
    skill: skillReducer,
    project: projectReducer,
    timeline: timelineReducer,
    applicationTool: applicationToolReducer,
    message: messageReducer,
  },
});
