import { createSlice } from '@reduxjs/toolkit';

interface FormsState {
   panelIsOpen: boolean
}

const initialState: FormsState = {
   panelIsOpen: false
};

export const draftPanelSlice = createSlice({
   name: 'FORM',
   initialState,
   reducers: {
      openDraftPanel: (state) => {
         state.panelIsOpen = !state.panelIsOpen
      }
   },
});

export const { openDraftPanel } = draftPanelSlice.actions

export default draftPanelSlice.reducer;
