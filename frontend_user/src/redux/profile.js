import { createSlice } from "@reduxjs/toolkit";

const profileState = createSlice({
  name: "profile",
  initialState: {
    "data": {}
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload
    }
  }
})

export default profileState.reducer;
export const { setUserData } = profileState.actions;
export const userDataState = state => state.profile.data;