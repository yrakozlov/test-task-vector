import { FC } from 'react'
import { useAppSelector } from '../../app/reduxHooks'
import Form from '../Form'

import s from './DraftsPanel.module.scss'
import DraftsList from './DraftsList'

const DraftsPanel: FC = () => {
   const { panelIsOpen } = useAppSelector(({ draftPanel }) => draftPanel)

   return (
      <div className={`${s.draftsPanel}${panelIsOpen ? ` ${s.draftsPanelOpen}` : ''}`}>
         <div className={s.container}>
            <DraftsList />
            <Form />
         </div>
      </div>
   )
}

export default DraftsPanel