import * as Type from 'type';
import style from './style.module.css';

type Props = Type.Rectangle & {
  serialNum?: number;
  onDelete?: () => void;
  disabledTrash?: boolean;
}

export const Rectangle: React.FC<Props> = ({serialNum, onDelete, disabledTrash, ...props}) => {
  return (
    <div className={style.rectangle} style={props}>
      {!disabledTrash &&
        <div className={style.trash} onClick={onDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#bebec3" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
      }
      {serialNum && <div className={style.serialNum}>{serialNum}</div>}
      <div className={style.dotBlock}>
        <div className={style.dot} />
        <div className={style.dot} />
        <div className={style.dot} />
        <div className={style.dot} />
        <div className={style.dot} />
        <div className={style.dot} />
        <div className={style.dot} />
        <div className={style.dot} />
      </div>
    </div>
  )
}
