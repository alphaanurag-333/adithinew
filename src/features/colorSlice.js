import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  primary_color: '#1877f2',
  secondary_color: '#f3f4f7',
  heading_color: '#000000',
  text_color: '#efefef',
}

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColors: (state, action) => {
      state.primary_color = action.payload.primary_color
      state.secondary_color = action.payload.secondary_color
      state.heading_color = action.payload.heading_color
      state.text_color = action.payload.text_color
    },
  },
})

export const { setColors } = colorSlice.actions
export default colorSlice.reducer
