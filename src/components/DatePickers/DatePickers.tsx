import { FC } from 'react'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../app/reduxHooks';
import { setDateRange } from '../../redux/FormSlice/FormSlice';

interface DatePickersProps {
   setDatesHasError: (hasError: boolean) => void;
   control: any;
}

const DatePickers: FC<DatePickersProps> = ({ setDatesHasError }) => {
   const { dateRange } = useAppSelector(({ form }) => form);
   const dispatch = useAppDispatch();

   const handleChange = (newValue: [Dayjs | null, Dayjs | null]) => {
      if (newValue[0] && !newValue[1]) {
         const startDate = newValue[0];
         dispatch(setDateRange({ newValue: [startDate, dayjs(startDate).add(1, 'day')] }));
      } else {
         dispatch(setDateRange({ newValue }));
      }
   };
   return (
      <>
         <DateRangePicker
            value={dateRange}
            onChange={handleChange}
            disableDragEditing
            defaultRangePosition='end'
            onError={(error) => setDatesHasError(!!error[1])}
         />
      </>
   )
}

export default DatePickers