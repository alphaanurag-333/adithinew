// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import layoutReducer from '../features/auth/layoutSlice'
import userReducer from '../features/auth/userSlice'
import colorReducer from '../features/colorSlice'
import sessionReducer from '../features/sessionSlice'
import sidebarReducer from '../features/sidebarSlice'
import appConfigReducer  from '../features/appConfigSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    users: userReducer,
    color: colorReducer,
    session: sessionReducer,
    sidebar: sidebarReducer,
    appConfig: appConfigReducer ,
  },
})
