import { FC, useState } from 'react'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';

const DatePickers: FC = () => {
   const [value, setValue] = useState<[Dayjs | null, Dayjs | null]>([
      dayjs(),
      dayjs().add(1, 'day'),
   ]);

   const handleChange = (newValue: [Dayjs | null, Dayjs | null]) => {
      setValue(newValue);
      if (newValue[0]) {
         const startDate = newValue[0];
         setValue([startDate, dayjs(startDate).add(1, 'day')]);
      }
   };
   return (
      <>
         <DateRangePicker
            value={value}
            onChange={handleChange}
            disableDragEditing
            defaultRangePosition='end'
         />
      </>
   )
}

export default DatePickers