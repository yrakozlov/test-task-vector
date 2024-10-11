
import { FC, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormActions from './FormActions';
import Fields from './Fields';
import { useAppDispatch, useAppSelector } from '../../app/reduxHooks';

import s from './Form.module.scss'
import { deleteDraft, handleChangeDraftsForms, openDraftPanel } from '../../redux/FormSlice/FormSlice';
import { createServiceLog } from '../../redux/ServicesSlice/ServicesSlice';

const schema = yup.object({
   providerId: yup.string().required('Required field'),
   serviceOrder: yup.string().required('Required field'),
   truckId: yup.string().required('Required field'),
   odometer: yup.number().typeError('Amount must be a number').required('Required field').min(0, 'Odometer cannot be less than 0'),
   engineHours: yup.number().typeError('Amount must be a number').required('Required field').min(0, 'Engine hours cannot be less than 0'),
   type: yup.string().required('Required field'),
   description: yup.string().required('Required field'),
}).required();

type FormData = yup.InferType<typeof schema>;

const Form: FC = () => {
   const { currentDraft, storedDrafts, dateRange } = useAppSelector(({ form }) => form);
   const dispatch = useAppDispatch()
   const [datesHasError, setDatesHasError] = useState<boolean>(false);

   const defaultValues = {
      providerId: storedDrafts?.[currentDraft]?.providerId || "",
      serviceOrder: storedDrafts?.[currentDraft]?.serviceOrder || "",
      truckId: storedDrafts?.[currentDraft]?.truckId || "",
      odometer: storedDrafts?.[currentDraft]?.odometer || 0,
      engineHours: storedDrafts?.[currentDraft]?.engineHours || 0,
      type: storedDrafts?.[currentDraft]?.type || 'planned',
      description: storedDrafts?.[currentDraft]?.description || ''
   }

   const { watch, control, handleSubmit, reset } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues,
   });

   const formValues = watch();

   useEffect(() => {
      if (JSON.stringify(storedDrafts?.[currentDraft]) !== JSON.stringify({ ...formValues })) {
         dispatch(handleChangeDraftsForms({ ...formValues }))
      }
   }, [JSON.stringify({ ...formValues })]);


   useEffect(() => {
      reset(defaultValues);
   }, [currentDraft, storedDrafts.length]);

   const onSubmit = (data: FormData) => {

      dispatch(createServiceLog({ ...data, dateRange }));
      dispatch(deleteDraft(currentDraft));
      dispatch(openDraftPanel());
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={s.root}>
         <Fields setDatesHasError={setDatesHasError} control={control} />

         <FormActions datesHasError={datesHasError} />
      </form >
   )
}

export default Form