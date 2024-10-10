import { FC } from 'react'
import s from './Header.module.scss'
import { Button } from '@mui/material';
import { useAppDispatch } from '../../app/reduxHooks';
import { openDraftPanel } from '../../redux/DraftPanelSlice/DraftPanelSlice';

const Header: FC = () => {
   const dispatch = useAppDispatch();
   return (
      <div className={s.root}>
         <Button onClick={() => dispatch(openDraftPanel())} variant='contained'>
            Open drafts panel
         </Button>
      </div>
   )
}

export default Header