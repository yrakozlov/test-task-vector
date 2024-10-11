import { Button } from '@mui/material';
import { FC } from 'react';
import s from './Form.module.scss'

interface FormActionsProps {
    onSubmit: (typeBtn: 'createServiceLog'  | 'deleteDraft') => void
}

const FormActions: FC<FormActionsProps> = ({onSubmit}) => {
  
    return (
    <div className={s['forms-actions']}>
       <Button variant='contained' type='submit'>Create Service Log</Button>
       <Button variant='contained' color='warning' onClick={() => onSubmit('deleteDraft')} >Delete draft</Button>
    </div>
  )
}

export default FormActions