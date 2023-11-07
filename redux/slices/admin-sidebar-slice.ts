import { createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
  expand: boolean;
}

const initialState: SidebarState = {
  expand: false,
};

export const adminSidebarSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.expand = !state.expand;
    },
  },
});

export const { toggleSidebar } = adminSidebarSlice.actions;

export default adminSidebarSlice.reducer;
