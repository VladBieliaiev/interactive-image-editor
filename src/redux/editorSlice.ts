import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  image: string | null;
  rotation: number;
  scale: number;
  filter: string;
}

const initialState: EditorState = {
  image: null,
  rotation: 0,
  scale: 1,
  filter: "none",
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },
    setRotation: (state, action: PayloadAction<number>) => {
      state.rotation = action.payload;
    },
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { setImage, setRotation, setScale, setFilter } =
  editorSlice.actions;

export default editorSlice.reducer;
