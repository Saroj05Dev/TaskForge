import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "@/features/auth/login/loginSlice";
import taskReducer from "@/features/tasks/taskSlice";
import activityReducer from "@/features/activity/activitySlice";


const rootReducer = combineReducers({
    auth: loginReducer,
    tasks: taskReducer,
    activity: activityReducer,
});

export default rootReducer;