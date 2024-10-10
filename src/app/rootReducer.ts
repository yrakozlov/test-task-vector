import formReducer from '../redux/FormSlice/FormSlice';
import draftPanelReducer from '../redux/DraftPanelSlice/DraftPanelSlice';

import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
   form: formReducer,
   draftPanel: draftPanelReducer
});

export type RootState = ReturnType<typeof rootReducer>;
