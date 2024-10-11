import { createSlice } from '@reduxjs/toolkit';
import { SERVICELOG } from '../../models/ServiceLog.model';
import dayjs, { Dayjs } from 'dayjs';

interface FormsState {
   currentDraft: number;
   storedDrafts: SERVICELOG[];
   dateRange: [Dayjs | null, Dayjs | null];
   panelIsOpen: boolean;
}

const initialState: FormsState = {
   panelIsOpen: false,
   currentDraft: 0,
   storedDrafts: JSON.parse(localStorage.getItem('drafts') || `[{providerId: "",serviceOrder: "",truckId: "",odometer: 0,engineHours: 0,type: 'planned',description: '',dateRange: [dayjs(), dayjs().add(1, 'day')]}]`),
   dateRange: JSON.parse(localStorage.getItem('drafts') || '[]')?.[0]?.dateRange?.map((el: string) => dayjs(el)) as [Dayjs | null, Dayjs | null] || [dayjs(), dayjs().add(1, 'day')]
};

export const formSlice = createSlice({
   name: 'FORM',
   initialState,
   reducers: {
      setDateRange: (state, { payload }) => {
         console.log(payload.newValue);

         state.dateRange = payload.newValue;
         const newStored = [...state.storedDrafts];

         newStored[state.currentDraft] = { ...newStored[state.currentDraft], dateRange: payload.newValue };

         state.storedDrafts = newStored

         localStorage.setItem('drafts', JSON.stringify(newStored));
      },

      addNewDraft: (state) => {
         let newStored = [...state.storedDrafts]
         newStored.push({
            providerId: "",
            serviceOrder: "",
            truckId: "",
            odometer: 0,
            engineHours: 0,
            type: 'planned',
            description: '',
            dateRange: [dayjs(), dayjs().add(1, 'day')]
         })
         state.storedDrafts = newStored
         state.currentDraft = newStored.length - 1
         localStorage.setItem('drafts', JSON.stringify(newStored));
      },

      changeCurrentDraft: (state, { payload }) => {
         state.currentDraft = payload
         state.dateRange = (state.storedDrafts[payload]?.dateRange?.map((el) => dayjs(el)) || [dayjs(), dayjs().add(1, 'day')]) as [Dayjs | null, Dayjs | null];
      },

      openDraftPanel: (state) => {
         state.panelIsOpen = !state.panelIsOpen
      },

      handleChangeDraftsForms: (state, { payload }) => {
         const newStored = [...state.storedDrafts];
         newStored[state.currentDraft] = { ...payload, dateRange: state.dateRange }

         state.storedDrafts = newStored
         localStorage.setItem('drafts', JSON.stringify(newStored));
      },

      deleteDraft: (state, { payload }) => {
         const newStored = [...state.storedDrafts];
         newStored.splice(payload, 1);
         state.storedDrafts = newStored;
         state.currentDraft = newStored.length > 0 ? newStored.length - 1 : 0;
         localStorage.setItem('drafts', JSON.stringify(newStored));
      }
   },
});

export const { setDateRange, addNewDraft, changeCurrentDraft, openDraftPanel, handleChangeDraftsForms, deleteDraft } = formSlice.actions

export default formSlice.reducer;
