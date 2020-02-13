import React from 'react'
import styles from './GameField.module.scss'
export default function GameField({ items, handleClick, fieldWidth }) {
  return (
    <div className={styles.wrapper}>
      <ul className="gameFieldsList" style={{ width: `${fieldWidth}px` }}>
        {items.map(item => (
          <li className="gameFieldItem" key={item.id} id={item.id} onClick={handleClick}></li>
        ))}
      </ul>
    </div>
  )
}
