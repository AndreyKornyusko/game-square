import React from 'react';
import styles from './ControlPanel.module.scss'
import Select from '../Common/Select/Select';
import Input from '../Common/Input/Input';
import Button from '../Common/Button/Button';

export default function ControlPanel({
  handlePlay,
  selectValue,
  handleCategoryChange,
  options,
  inputValue,
  handleInputChange

}) {
  return (
    <div className={styles.wrapper}>
      <form className={styles.controlForm}>
        <div className={styles.formWrap}>
          <Select
            value={selectValue}
            handleChange={handleCategoryChange}
            options={options}
            name="mode"
          />
          <Input
            name="text"
            value={inputValue}
            handleChange={handleInputChange}
            placeholder="Enter your name"
          />
          <Button
            handleSubmit={handlePlay}
          />
        </div>
      </form>
    </div>
  )
}
