import { FC } from 'react'
import { useAppSelector } from '../../app/reduxHooks'
import Form from '../Form'

import s from './DraftsPanel.module.scss'
import DraftsList from './DraftsList'

const DraftsPanel: FC = () => {
   const { panelIsOpen, storedDrafts } = useAppSelector(({ form }) => form)

   return (
      <div className={`${s.draftsPanel}${panelIsOpen ? ` ${s.draftsPanelOpen}` : ''}`}>
         <div className={s.container}>
            <DraftsList />
            {storedDrafts.length > 0 ? <Form /> : <div className={s['empty-block']}>
               <h2>Please add a new draft</h2>
            </div>}
         </div>
      </div>
   )
}

export default DraftsPanel