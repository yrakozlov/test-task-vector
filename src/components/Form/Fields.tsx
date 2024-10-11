import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import  { FC } from 'react'
import { Controller } from 'react-hook-form'
import DatePickers from '../DatePickers'

interface FeildsProps {
    setDatesHasError: (hasError: boolean) => void;
    control: any
}
 

const Fields: FC<FeildsProps> = ({setDatesHasError, control}) => {

    return (
    <>
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

         <DatePickers control={control} setDatesHasError={setDatesHasError}/>
          
         <Controller
            name='type'
            control={control}
            render={({ field }) => (
               <FormControl>
               <InputLabel htmlFor="type-select-label">
                  Type
               </InputLabel>
               <Select labelId='type-select-label' onChange={field.onChange} value={field.value} label='Type' >
                     <MenuItem value={'planned'}>Planned</MenuItem>
                     <MenuItem value={'unplanned'}>Unplanned</MenuItem>
                     <MenuItem value={'emergency'}>Emergency</MenuItem>
               </Select>
            </FormControl>
            )}
         />

         <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
               <TextField multiline minRows={4} maxRows={8} helperText={error?.message} error={!!error?.message} label="Description" variant="outlined" {...field} />
            )}
         />
    </>
  )
}

export default Fields