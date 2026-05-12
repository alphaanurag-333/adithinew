import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload
    },
    toggleSidebarUnfoldable: (state) => {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
  },
})

export const { setSidebarShow, toggleSidebarUnfoldable } = sidebarSlice.actions
export default sidebarSlice.reducer
