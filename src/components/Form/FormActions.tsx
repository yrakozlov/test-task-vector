import { Button } from '@mui/material';
import { FC } from 'react';
import s from './Form.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/reduxHooks';
import { deleteDraft } from '../../redux/FormSlice/FormSlice';

interface FormActionsProps {
  datesHasError: boolean;
}

const FormActions: FC<FormActionsProps> = ({ datesHasError }) => {
  const { currentDraft } = useAppSelector(({ form }) => form)

  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(deleteDraft(currentDraft))
  }

  return (
    <div className={s['forms-actions']}>
      <Button disabled={datesHasError} variant='contained' type='submit'>Create Service Log</Button>
      <Button variant='contained' color='warning' onClick={onDelete} >Delete draft</Button>
    </div>
  )
}

export default FormActions