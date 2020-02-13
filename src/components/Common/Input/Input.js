import React from 'react'
import styles from './Input.module.scss';
export default function Input({ name, value, handleChange, placeholder }) {
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}
