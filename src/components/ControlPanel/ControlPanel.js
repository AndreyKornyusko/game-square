import React from 'react';
import styles from './ControlPanel.module.scss'
import Select from '../Common/Select/Select';
import Input from '../Common/Input/Input';
import Button from '../Common/Button/Button';

export default function ControlPanel({ handlePlay }) {
  return (
    <div className={styles.wrapper}>
      <form className={styles.controlForm}>
        <div className={styles.formWrap}>
          <Select />
          <Input />
          <Button
            handleSubmit={handlePlay}
          />
        </div>
      </form>
    </div>
  )
}
