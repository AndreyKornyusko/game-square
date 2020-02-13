import React, { Component } from 'react'
import styles from './App.module.scss';
import ControlPanel from './components/ControlPanel/ControlPanel';
import GameField from './components/GameField/GameField';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import * as API from './services/api';

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
    ],
    gamer: "",
    mode: "",
    options: [
      { value: '5', label: 'easyMode' },
    ],
    isGameFinished: false,
  }

  componentDidMount() {
    API.getSettings()
      .then(data => {
        console.log("settings data", data);
        const entries = Object.entries(data);
        console.log("entries", entries);

        const options = entries.reduce((acc, value) => {
          acc.push(({
            "value": value[1].field,
            "label": value[0],
            "delay": value[1].delay
          }));
          return acc
        }, []);
        console.log('options', options);

        this.setState({ options })

      })
    API.getWinners()
      .then(data => {
        console.log('winners data', data);
        this.setState({ leaderBoardItems: data })
      })
  }

  handleGameFieldClick = (e) => {
    const target = e.target
    if (target.classList.contains("active") &&
      !target.classList.contains("notclicked")) {
      target.classList.add("clicked")
    }
  }

  randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  handlePlay = (e) => {
    e.preventDefault();

    const timer = setInterval(() => {
      // while(this.state.isGameFinished === true){

      if (this.state.isGameFinished === true) {
        clearInterval(timer);
      }
      const allItems = document.querySelectorAll('.gameFieldsList li');
      const allClickedItems = document.querySelectorAll('.clicked');
      const allNotClickedItems = document.querySelectorAll('.notclicked');

      // console.log(allItems)

      const items = Array.from(allItems, x => { if (x.classList.contains("active")) return (true); else return (false) });
      // console.log("items", items);

      const indexes = items.reduce((acc, value, ind) => {
        if (value === false) {
          acc.push(ind + 1);
          return acc
        }
        return acc
      }, []);

      // console.log(indexes);

      let randomNumber = 0;
      if (indexes.length > 0) {
        while (!(indexes.some(num => num === randomNumber))) {
          randomNumber = this.randomInteger(1, 16)
        };
      }

      if (indexes.length === 0) { clearInterval(timer) }

      const selector = `.gameFieldsList li:nth-child(${randomNumber})`
      const itemField = document.querySelector(selector)

      if (itemField.classList.contains("active")) {
        return
      }

      if (this.state.isGameFinished !== true) {
        itemField.classList.add("active")
      }


      if (!itemField.classList.contains("clicked")) {
        setTimeout(() => {
          itemField.classList.add("notclicked")
        }, 1000)
      }

      console.log('allItems.length', allItems.length);
      console.log('allClickedItems.length', allClickedItems.length);
      console.log('allNotClickedItems.length', allNotClickedItems.length);


      if ((allClickedItems.length / allItems.length * 100) > 50) {
        clearInterval(timer);
        this.setState({ gamer: "user", isGameFinished: true })
      }

      if ((allNotClickedItems.length / allItems.length * 100) > 50) {
        clearInterval(timer);
        this.setState({ gamer: "computer", isGameFinished: true })
      }

    // }
    }, 1000);

  }

  handleInputChange = (event) => {
    this.setState({ gamer: event.target.value });
  }

  handleCategoryChange = mode => {
    this.setState({ mode });
    console.log(`Option selected:`, mode);
  };

  render() {
    console.log('state', this.state);
    const {
      gameFieldItems,
      leaderBoardItems,
      gamer,
      isGameFinished,
      options,
      mode
    } = this.state;

    return (
      <div className={styles.appWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.gameWrap}>
            <ControlPanel
              handlePlay={this.handlePlay}
              selectValue={mode}
              handleCategoryChange={this.handleCategoryChange}
              options={options}
              inputValue={gamer}
              handleInputChange={this.handleInputChange}
            />

            {isGameFinished && <h1 className={styles.gameResults}>{gamer} wins! </h1>}

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

