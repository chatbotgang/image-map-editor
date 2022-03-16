import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RactangleState {
  rectangles: rectProperties[]
}

interface rectProperties {
    x: number,
    y: number,
    width: number,
    height: number,
}

const initialState: RactangleState = {
  rectangles: [],
}

export const reactangleSlice = createSlice({
  name: 'rectangle',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<rectProperties>) => {
      state.rectangles = [...state.rectangles, action.payload];
    },
    deleteByIndex: (state, action: PayloadAction<number>) => {
      state.rectangles = [...state.rectangles.slice(0, action.payload), ...state.rectangles.slice( action.payload +1)];
    },
  },
})

export const { add, deleteByIndex } = reactangleSlice.actions

export default reactangleSlice.reducer