import { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks"
import LogsItem from "./LogsItem";
import { Button, Select, MenuItem, TextField } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import s from './LogsList.module.scss';
import { setFilter } from "../../redux/ServicesSlice/ServicesSlice";
import dayjs, { Dayjs } from "dayjs";

const LogsList: FC = () => {
   const dispatch = useAppDispatch();
   const { filteredServicesList, servicesList } = useAppSelector(({ services }) => services);

   const [date, setDate] = useState<Dayjs | null>(null);
   const [type, setType] = useState<string | null>(null);
   const [searchQuery, setSearchQuery] = useState<string>('');
   const [useFilters, setUseFilters] = useState<boolean>(false);

   const handleFilterChange = () => {
      dispatch(setFilter({ date: date ? dayjs(date) : null, type, searchQuery }));
      setUseFilters(true)
   };

   const clearFilter = () => {
      setType(null);
      setDate(null);
      setSearchQuery('')
      dispatch(setFilter({ date: null, type: null, searchQuery: '' }));
      setUseFilters(false)
   }

   return (
      <div className={s['logs-container']}>
         {servicesList.length > 0 ? <>
            <div className={s.filters}>
               <DatePicker
                  label="Start Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
               />
               <Select
                  value={type || ''}
                  onChange={(e) => setType(e.target.value)}
                  displayEmpty
                  style={{ marginLeft: '16px', marginRight: '16px' }}
               >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="planned">Planned</MenuItem>
                  <MenuItem value="unplanned">Unplanned</MenuItem>
                  <MenuItem value="emergency">Emergency</MenuItem>
               </Select>
               <TextField
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  label="Search"
                  placeholder="Search by description or truck ID"
                  style={{ marginRight: '16px' }}
               />
               <Button variant="contained" onClick={handleFilterChange}>
                  Apply Filters
               </Button>

               <Button onClick={clearFilter} color="warning" variant="contained" >
                  Clear Filters
               </Button>
            </div>

            {(useFilters ? filteredServicesList.length > 0 : true) ? <table className={s['logs-table']}>
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Order</th>
                     <th>Truck id</th>
                     <th>Odometer</th>
                     <th>Engine hours</th>
                     <th>Start</th>
                     <th>End</th>
                     <th>Type</th>
                     <th>Description</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {(useFilters ? filteredServicesList : servicesList).map((itemData, idx) => (
                     <LogsItem key={idx} itemData={itemData} idx={idx} />
                  ))}
               </tbody>

            </table>
               : 'Empty list. Please change filter'
            }

         </> : 'Empty list. Please add service logs'
         }
      </div>
   )
}

export default LogsList