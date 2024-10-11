import { FC } from "react"
import s from './DraftsPanel.module.scss'
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { addNewDraft, changeCurrentDraft } from "../../redux/FormSlice/FormSlice";

const DraftsList: FC = () => {
  const { currentDraft, storedDrafts } = useAppSelector(({ form }) => form)
  const dispatch = useAppDispatch();

  return (
    <div className={s.list}>
      {storedDrafts.map(({ providerId }, idx) =>
        <button onClick={() => dispatch(changeCurrentDraft(idx))} className={`${s.tab}${currentDraft === idx ? ` ${s.active}` : ''}`} key={idx}>
          {providerId || 'New draft'}
        </button>)}

      <button onClick={() => dispatch(addNewDraft())} className={s['createNew']}>
        + Add
      </button>
    </div>
  )
}

export default DraftsList