import formReducer from '../redux/FormSlice/FormSlice';
import servicesReducer from '../redux/ServicesSlice/ServicesSlice';

import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
   form: formReducer,
   services: servicesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
