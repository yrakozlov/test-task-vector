
import { FC } from 'react'
import { Button, TextField } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import s from './Form.module.scss'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import DatePickers from '../DatePickers';

const schema = yup.object({
   providerId: yup.string().required('Required field'),
   serviceOrder: yup.string().required('Required field'),
   truckId: yup.string().required('Required field'),
   odometer: yup.number().typeError('Amount must be a number').required('Required field').min(0, 'Odometer cannot be less than 0'),
   engineHours: yup.number().typeError('Amount must be a number').required('Required field').min(0, 'Engine hours cannot be less than 0'),
   startDate: yup.string().required('Required field'),
}).required();

type FormData = yup.InferType<typeof schema>;

const Form: FC = () => {
   const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
         providerId: "",
         serviceOrder: "",
         truckId: "",
         odometer: 0,
         engineHours: 0,
         startDate: dayjs().format('DD/MM/YYYY')
      },
   });

   const onSubmit = (data: FormData) => {
      console.log(data);
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={s.root}>
         <Controller
            name="providerId"
            control={control}
            render={({ field, fieldState: { error } }) => (
               <TextField helperText={error?.message} error={!!error?.message} label="Provider id" variant="outlined" {...field} />
            )}
         />

         <Controller
            name="serviceOrder"
            control={control}
            render={({ field, fieldState: { error } }) => (
               <TextField helperText={error?.message} error={!!error?.message} label="Service order" variant="outlined" {...field} />
            )}
         />

         <Controller
            name="truckId"
            control={control}
            render={({ field, fieldState: { error } }) => (
               <TextField helperText={error?.message} error={!!error?.message} label="Truck id or trailer" variant="outlined" {...field} />
            )}
         />

         <Controller
            name="odometer"
            control={control}
            render={({ field, fieldState: { error } }) => (
               <TextField type='number' inputProps={{ min: 0 }} helperText={error?.message} error={!!error?.message} label="Odometer" variant="outlined" {...field} />
            )}
         />

         <Controller
            name="engineHours"
            control={control}
            render={({ field, fieldState: { error } }) => (
               <TextField type='number' inputProps={{ min: 0 }} helperText={error?.message} error={!!error?.message} label="Engine hours" variant="outlined" {...field} />
            )}
         />

         <Controller
            name="startDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
               <DatePicker
                  label="Start date"
                  defaultValue={dayjs()}
                  inputRef={field.ref}
                  onChange={(date) => {
                     field.onChange(dayjs(date).format('DD/MM/YYYY') === 'Invalid Date' ? null : dayjs(date).format('DD/MM/YYYY'));
                  }} />
            )}
         />

         <DatePickers />

         <Button type='submit'>Sumbit</Button>
         {errors.odometer?.message}
      </form >
   )
}

export default Form