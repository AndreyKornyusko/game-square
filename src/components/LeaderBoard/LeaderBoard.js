import React from 'react'
import styles from './LeaderBoard.module.scss'
export default function LeaderBoard({ items }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id} className={styles.listItem}>
            <div className={styles.dataWrap}>
              <span className={styles.winner}>{item.winner}</span>
              <span className={styles.date}>{item.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
