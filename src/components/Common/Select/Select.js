import React from 'react';
import Select from 'react-select';
import styles from './Select.module.scss'



export default function ReactSelect({ value, handleChange, options, name }) {
  return (
    <div className={styles.wrapper}>
      <Select
        defaultValue={{ label: "Pick game mode", value: 0 }}
        // value={value}
        onChange={handleChange}
        options={options}
        name={name}
      />
    </div>
  )
}


