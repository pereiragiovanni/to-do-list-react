import styles from './Header.module.css'

import toDoList from '../assets/to-do-list-logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={toDoList} alt="To Do List" />
    </header>
  )
}