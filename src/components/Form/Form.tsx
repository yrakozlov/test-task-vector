
import { FC, useEffect, useState } from 'react'
import {  useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormActions from './FormActions';
import Fields from './Fields';
import { useAppSelector } from '../../app/reduxHooks';

import s from './Form.module.scss'

const schema = yup.object({
   providerId: yup.string().required('Required field'),
   serviceOrder: yup.string().required('Required field'),
   truckId: yup.string().required('Required field'),
   odometer: yup.number().typeError('Amount must be a number').required('Required field').min(0, 'Odometer cannot be less than 0'),
   engineHours: yup.number().typeError('Amount must be a number').required('Required field').min(0, 'Engine hours cannot be less than 0'),
   type:  yup.string().required('Required field'),
   description: yup.string().required('Required field'),
}).required();

type FormData = yup.InferType<typeof schema>;

const Form: FC = () => {
   const {currentDraft, storedDrafts, dateRange} = useAppSelector(({form}) => form)
   const [datesHasError, setDatesHasError] = useState<boolean>(false);

   const { watch, control, formState: { isValid, isDirty }, handleSubmit, reset } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
         providerId: storedDrafts?.[currentDraft]?.providerId || "",
         serviceOrder: storedDrafts?.[currentDraft]?.serviceOrder ||  "",
         truckId: storedDrafts?.[currentDraft]?.truckId ||  "",
         odometer: storedDrafts?.[currentDraft]?.odometer || 0,
         engineHours: storedDrafts?.[currentDraft]?.engineHours || 0,
         type: storedDrafts?.[currentDraft]?.type || 'planned',
         description: storedDrafts?.[currentDraft]?.description ||''
      },
   });

   const formValues = watch();

   useEffect(() => {
      if (isDirty) {
         const newStored  =  [...storedDrafts];
         newStored[currentDraft] = {...formValues, dateRange}
         
         localStorage.setItem('drafts', JSON.stringify(newStored));
      }
   }, [formValues]); 

  
   useEffect(() => {
      reset({
         providerId: storedDrafts?.[currentDraft]?.providerId || "",
         serviceOrder: storedDrafts?.[currentDraft]?.serviceOrder || "",
         truckId: storedDrafts?.[currentDraft]?.truckId || "",
         odometer: storedDrafts?.[currentDraft]?.odometer || 0,
         engineHours: storedDrafts?.[currentDraft]?.engineHours || 0,
         type: storedDrafts?.[currentDraft]?.type || 'planned',
         description: storedDrafts?.[currentDraft]?.description || ''
      });
   }, [currentDraft]);

   const onSubmit = (typeBtn?: 'createServiceLog' | 'deleteDraft', data?: FormData) => {
      console.log(data, typeBtn);
   }

   return (
      <form onSubmit={handleSubmit((data) => onSubmit('createServiceLog', data))} className={s.root}>
         <Fields setDatesHasError={setDatesHasError} control={control}/>

         <FormActions onSubmit={onSubmit} />
      </form >
   )
}

export default Form