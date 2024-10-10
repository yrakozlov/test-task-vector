import { createSlice } from '@reduxjs/toolkit';

interface FormsState {
   test: string
}

const initialState: FormsState = {
   test: '123'
};

export const formSlice = createSlice({
   name: 'FORM',
   initialState,
   reducers: {
      testAction: (state, { payload }) => {
         console.log(state.test, payload);
      }
   },
});

export const { testAction } = formSlice.actions

export default formSlice.reducer;
