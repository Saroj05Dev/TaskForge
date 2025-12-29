import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "@/features/auth/login/loginSlice";
import taskReducer from "@/features/tasks/taskSlice";


const rootReducer = combineReducers({
    auth: loginReducer,
    tasks: taskReducer,
});

export default rootReducer;