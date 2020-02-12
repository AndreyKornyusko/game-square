import React from 'react';
import Select from 'react-select';
import styles from './Select.module.scss'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];


export default function ReactSelect({ value, handleChange, options }) {
  return (
    <div className={styles.wrapper}>
      <Select
        value={value}
        onChange={handleChange}
        options={options}
      />
    </div>
  )
}


