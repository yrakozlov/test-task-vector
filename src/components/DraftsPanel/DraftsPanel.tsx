import { FC } from 'react'
import { useAppSelector } from '../../app/reduxHooks'
import Form from '../Form'

import s from './DraftsPanel.module.scss'

const DraftsPanel: FC = () => {
   const { panelIsOpen } = useAppSelector(({ draftPanel }) => draftPanel)

   return (
      <div className={`${s.draftsPanel}${panelIsOpen ? ` ${s.draftsPanelOpen}` : ''}`}>
         <Form />
      </div>
   )
}

export default DraftsPanel