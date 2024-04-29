import styles from './Item.module.css';

import { PropsTask } from '../../App';
import { Trash, Check } from 'phosphor-react';

interface PropsItem {
  data: PropsTask;
  onDeleteTask: (id: number) => void;
  onToggleTaskStatus: ( { id, value }: { id: number, value: boolean }) => void;
}

export function Item({ data, onDeleteTask, onToggleTaskStatus }: PropsItem) {
  const checkboxCheckedClassname = data.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked'];

  const paragraphCheckedClassname = data.isChecked
    ? styles['paragraph-checked']
    : '';

  function handleDeleteTask() {
    onDeleteTask(data.id)
  }

  function handleToogleTask() {
    onToggleTaskStatus({ id: data.id, value: !data.isChecked })
  }

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleToogleTask}>
          <input readOnly type="checkbox" checked={data.isChecked} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
            {data.isChecked && <Check size={12} />}
          </span>

          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
            {data.text}
          </p>
        </label>
      </div>

      <button onClick={handleDeleteTask}>
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}