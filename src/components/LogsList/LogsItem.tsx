import { FC } from 'react'
import { SERVICELOG } from '../../models/ServiceLog.model'
import dayjs from 'dayjs';
import { Button } from '@mui/material';

import { useAppDispatch } from '../../app/reduxHooks';
import { deleteServiceLog } from '../../redux/ServicesSlice/ServicesSlice';

interface LogsItemProps {
   itemData: SERVICELOG;
   idx: number;
}

const LogsItem: FC<LogsItemProps> = ({ itemData, idx }) => {
   const dispatch = useAppDispatch();
   const { providerId, serviceOrder, truckId, odometer, engineHours, dateRange, type, description } = itemData;

   const onDelete = () => {
      dispatch(deleteServiceLog(idx))
   }

   return (
      <tr>
         <td>{providerId}</td>
         <td>{serviceOrder}</td>
         <td>{truckId}</td>
         <td>{odometer}</td>
         <td>{engineHours}</td>
         <td>{dayjs(dateRange[0]).format('DD/MM/YYYY')}</td>
         <td>{dayjs(dateRange[1]).format('DD/MM/YYYY')}</td>
         <td>{type}</td>
         <td>{description}</td>
         <td>
            <Button color='error' variant="contained" onClick={onDelete}>Delete</Button>
         </td>
      </tr>
   )
}

export default LogsItem