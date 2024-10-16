import { FC } from "react"
import LogsList from "../../components/LogsList";
import Header from "../../layout/Header";
import DraftsPanel from "../../components/DraftsPanel";
import { useAppSelector } from "../../app/reduxHooks";

import s from './MainContainer.module.scss';

const MainContainer: FC = () => {
   const { panelIsOpen } = useAppSelector(({ form }) => form)

   return (
      <>
         <Header />
         <main className={`${s.container}${panelIsOpen ? ` ${s.panelOpen}` : ''}`}>
            <LogsList />
            <DraftsPanel />
         </main>
      </>
   )
}

export default MainContainer