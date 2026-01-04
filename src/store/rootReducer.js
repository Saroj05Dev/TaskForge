import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "@/features/auth/login/loginSlice";
import taskReducer from "@/features/tasks/taskSlice";
import activityReducer from "@/features/activity/activitySlice";
import signupReducer from "@/features/auth/signup/signupSlice";
import commentsReducer from "@/features/tasks/commentsSlice";
import attachmentsReducer from "@/features/tasks/attachmentsSlice";

const rootReducer = combineReducers({
  auth: loginReducer,
  tasks: taskReducer,
  activity: activityReducer,
  signup: signupReducer,
  comments: commentsReducer,
  attachments: attachmentsReducer,
});

export default rootReducer;
