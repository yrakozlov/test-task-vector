import { createSlice } from '@reduxjs/toolkit';
import { SERVICELOG } from '../../models/ServiceLog.model';
import dayjs, { Dayjs } from 'dayjs';

interface FormsState {
   currentDraft: number;
   storedDrafts: SERVICELOG[];
   dateRange: [Dayjs | null, Dayjs | null]
}

const initialState: FormsState = {
   currentDraft: 0,
   storedDrafts: JSON.parse(localStorage.getItem('drafts') || '[]'),
   dateRange: JSON.parse(localStorage.getItem('drafts') || '[]')?.[0]?.dateRange?.map((el: string) => dayjs(el)) || [dayjs(), dayjs().add(1, 'day')]
};

export const formSlice = createSlice({
   name: 'FORM',
   initialState,
   reducers: {
     setDateRange: (state, {payload}) => {
      state.dateRange = payload.newValue;
      const newStored =  [...state.storedDrafts];
      
      newStored[state.currentDraft] = {...newStored[state.currentDraft], dateRange: payload.newValue};

      state.storedDrafts = newStored
      
      localStorage.setItem('drafts', JSON.stringify(newStored));
     },

     addNewDraft: (state) => {
      let newStored = [...state.storedDrafts]
      newStored.push({
         providerId:  "",
         serviceOrder:  "",
         truckId:  "",
         odometer:  0,
         engineHours:  0,
         type: 'planned',
         description: '', 
         dateRange: [dayjs(), dayjs().add(1, 'day')]
      })
      state.storedDrafts = newStored
      state.currentDraft = newStored.length - 1
      localStorage.setItem('drafts', JSON.stringify(newStored));
     },

     changeCurrentDraft: (state, {payload}) => {
      state.currentDraft = payload
     }
   },
});

export const { setDateRange, addNewDraft, changeCurrentDraft } = formSlice.actions

export default formSlice.reducer;
