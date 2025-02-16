import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  selectedComment: null,
  status: 'idle',
  error: null
};


const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: { 
        setSelectedComment: (state, action) => {
            state.selectedComment = action.payload;
          },
          clearSelectedComment: (state) => {
            state.selectedComment = null;
          },
          resetCommentState: (state) => {
            Object.assign(state, initialState);
          }

    }


});


export const { setSelectedComment , clearSelectedComment, resetCommentState } = commentSlice.actions;

export default commentSlice.reducer;