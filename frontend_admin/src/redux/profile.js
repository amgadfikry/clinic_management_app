import { createSlice } from "@reduxjs/toolkit";

const profileState = createSlice({
  name: "profile",
  initialState: {
    "data": {}
  },
  reducers: {
    setAdminData: (state, action) => {
      state.data = action.payload
    }
  }
})

export default profileState.reducer;
export const { setAdminData } = profileState.actions;
export const adminDataState = state => state.profile.data;