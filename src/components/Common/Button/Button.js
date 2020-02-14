import React from 'react'
import styles from './Button.module.scss';
export default function Button({ handleSubmit, label }) {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        type="submit"
        onClick={handleSubmit}
      >
        {label}
      </button>
    </div>
  )
}
