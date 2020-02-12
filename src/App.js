import React, { Component } from 'react'
import styles from './App.module.scss';
import ControlPanel from './components/ControlPanel/ControlPanel';
import GameField from './components/GameField/GameField';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';

export default class App extends Component {
  state = {
    gameFieldItems: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
    ],
    leaderBoardItems: [
      { id: 1, winner: "User", date: "05:39; 12 February 2020" },
      { id: 2, winner: "Computer", date: "05:39; 12 February 2020" },
    ]
  }

  handleGameFieldClick = () => {

  }

  randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }


  handlePlay = (e) => {
    e.preventDefault();
    setInterval(() => {
      const randomNumber = this.randomInteger(1, 16);
      const selector = `.gameFieldsList li:nth-child(${randomNumber})`
      const itemField = document.querySelector(selector)
      if(itemField.classList.contains("active")){
        return
      }
      itemField.classList.add("active")
    }, 1000);

  }

  render() {
    const { gameFieldItems, leaderBoardItems } = this.state;
    return (
      <div className={styles.appWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.gameWrap}>
            <ControlPanel
              handlePlay={this.handlePlay}
            />
            <GameField
              items={gameFieldItems}
              handleClick={this.handleGameFieldClick}
            />
          </div>
          <div className={styles.resutlsWrap}>
            <LeaderBoard
              items={leaderBoardItems}
            />
          </div>

        </div>
      </div>
    )
  }
}

