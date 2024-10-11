import { createSlice } from '@reduxjs/toolkit';
import { SERVICELOG } from '../../models/ServiceLog.model';
import dayjs from 'dayjs';

interface ServicesState {
   servicesList: SERVICELOG[];
   filteredServicesList: SERVICELOG[];
   filter: {
      date: string | null;
      type: string | null;
      searchQuery: string;
   };
}

const initialState: ServicesState = {
   servicesList: JSON.parse(localStorage.getItem('services') || `[]`),
   filteredServicesList: [],
   filter: {
      date: null,
      type: null,
      searchQuery: '',
   },
};

export const servicesSlice = createSlice({
   name: 'SERVICES',
   initialState,
   reducers: {
      createServiceLog: (state, { payload }) => {
         const newList = [...state.servicesList, payload];

         state.servicesList = newList;
         localStorage.setItem('services', JSON.stringify(newList));
      },

      deleteServiceLog: (state, { payload }) => {
         const newList = [...state.servicesList];
         newList.splice(payload, 1);
         state.servicesList = newList;
         localStorage.setItem('services', JSON.stringify(newList));
      },

      setFilter: (state, { payload }) => {
         state.filter = { ...state.filter, ...payload };
         state.filteredServicesList = state.servicesList.filter((service) => {
            const { date, type, searchQuery } = state.filter;

            const matchesDate = date
               ? (dayjs(date) > dayjs(service.dateRange[0])) && (dayjs(date) < dayjs(service.dateRange[1]))
               || (dayjs(date).format('DD/MM/YYYY') === dayjs(service.dateRange[0]).format('DD/MM/YYYY') || dayjs(date).format('DD/MM/YYYY') === dayjs(service.dateRange[1]).format('DD/MM/YYYY'))
               : true;

            const matchesType = type ? service.type === type : true;

            const matchesSearch = searchQuery
               ? service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.truckId.toLowerCase().includes(searchQuery.toLowerCase())
               : true;

            return matchesDate && matchesType && matchesSearch;
         });
      },
   },
});

export const { createServiceLog, deleteServiceLog, setFilter } = servicesSlice.actions

export default servicesSlice.reducer;
