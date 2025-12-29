import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "@/features/auth/login/loginSlice";

const rootReducer = combineReducers({
    auth: loginReducer,
});

export default rootReducer;