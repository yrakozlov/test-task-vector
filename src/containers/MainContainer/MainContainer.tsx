import { FC } from "react"
import LogsList from "../../components/LogsList";
import Header from "../../layout/Header";
import DraftsPanel from "../../components/DraftsPanel";

import s from './MainContainer.module.scss';

const MainContainer: FC = () => {
   return (
      <>
         <Header />
         <main className={s.container}>
            <LogsList />
            <DraftsPanel />
         </main>
      </>
   )
}

export default MainContainer