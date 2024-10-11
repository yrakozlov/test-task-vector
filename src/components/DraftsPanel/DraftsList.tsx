import { FC } from "react"
import s from './DraftsPanel.module.scss'
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { addNewDraft, changeCurrentDraft } from "../../redux/FormSlice/FormSlice";

const DraftsList: FC = () => {
    const {currentDraft, storedDrafts, dateRange} = useAppSelector(({form}) => form)
    const dispatch = useAppDispatch();

  return (
    <div className={s.list}>
        {storedDrafts?.length > 0 ? storedDrafts.map(({providerId}, idx) => 
         <button onClick={() => dispatch(changeCurrentDraft(idx))} className={s['tab']} key={idx}>
            {providerId || 'New draft'}
        </button>)
        : 
        <button onClick={() => dispatch(changeCurrentDraft(0))} className={s['tab']}>
            New draft
        </button>
        }

        <button onClick={() => dispatch(addNewDraft())} className={s['createNew']}>
            + Add
        </button>
    </div>
  )
}

export default DraftsList