import styles from './Button.module.css'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, ...rest }: Props)  {
  return (
    <button className={styles.container} {...rest}>
      {children}
    </button>
  )
}