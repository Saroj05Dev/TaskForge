import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "@/features/auth/login/loginSlice";
import taskReducer from "@/features/tasks/taskSlice";
import activityReducer from "@/features/activity/activitySlice";
import signupReducer from "@/features/auth/signup/signupSlice";


const rootReducer = combineReducers({
    auth: loginReducer,
    tasks: taskReducer,
    activity: activityReducer,
    signup: signupReducer,
});

export default rootReducer;