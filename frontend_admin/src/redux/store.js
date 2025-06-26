import { configureStore } from '@reduxjs/toolkit'
import profileStateReducer from './profile'

export const store = configureStore({
  reducer: {
    profile: profileStateReducer,
  },
})