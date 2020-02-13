import React, { Component } from 'react'
import styles from './App.module.scss';
import ControlPanel from './components/ControlPanel/ControlPanel';
import GameField from './components/GameField/GameField';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import * as API from './services/api';

const INITIAL_STATE = {
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
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 }
  ],
  fieldWidth: 150,
  delay: 2000,
  leaderBoardItems: [
    { id: 1, winner: "", date: "" },
  ],
  gamer: "",
  winner: '',
  mode: { value: '5', label: 'easyMode', delay: 2000 },
  options: [
    { value: '5', label: 'easyMode' },
  ],
  isGameFinished: false,
  isWinnerPosted: false,
  label: 'play',
  isGameInProgress: false,
  clearCycle: false
}

export default class App extends Component {
  state = {
    ...INITIAL_STATE
  }

  componentDidMount() {
    this.getSettings();
    this.getWinners()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isWinnerPosted !== this.state.isWinnerPosted) {
      this.getWinners()
    }

    if (prevState.mode !== this.state.mode) {
      const arrayLength = this.state.mode.value * this.state.mode.value
      const fildsNumber = Array.from(new Array(arrayLength), (x, i) => i + 1)
      const gameFieldItems = fildsNumber.map(item => ({ id: item }))
      this.setState({
        gameFieldItems,
        fieldWidth: this.state.mode.value * 30,
        delay: this.state.mode.delay
      })
    }

    if (prevState.isGameFinished !== this.state.isGameFinished) {
      this.setState({
        label: 'play again',
      })
    }
  }

  getSettings = () => {
    API.getSettings()
      .then(data => {
        const entries = Object.entries(data);
        const options = entries.reduce((acc, value) => {
          acc.push(({
            "value": value[1].field,
            "label": value[0],
            "delay": value[1].delay
          }));
          return acc
        }, []);
        this.setState({
          options,
        })
      })
  }

  getWinners=()=>{
    API.getWinners()
    .then(data => {
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

  getInactiveIdexes = (allItems) => {
    const items = Array.from(allItems, x => {
      if (x.classList.contains("active")) return (true);
      else return (false)
    });

    const indexes = items.reduce((acc, value, ind) => {
      if (value === false) {
        acc.push(ind + 1);
        return acc
      }
      return acc
    }, []);
    return indexes
  }

  getRandomNumer = (indexes) => {
    const maxNumber = this.state.mode.value * this.state.mode.value
    let randomNumber = 0;
    if (indexes.length > 0) {
      while (!(indexes.some(num => num === randomNumber))) {
        randomNumber = this.randomInteger(1, maxNumber)
      };
    }
    return randomNumber
  }

  postWinner = (jsonForServer) => {
    API.postWinner(jsonForServer)
      .then(response => {
        console.log('post response', response);
        if (response.status === 200) {
          this.setState({
            isWinnerPosted: true,
          })
        }
      })
  }

  getJsonForServer = () => {
    let currentDate = new Date();
    const date = currentDate.toLocaleString()

    const jsonForServer = {
      winner: this.state.winner,
      date
    }
    return jsonForServer
  }

  handlePlay = (e) => {
    e.preventDefault();
    if (this.state.isGameInProgress) return;
    const delay = this.state.delay

    if (this.state.isGameFinished) {
      this.setState({ isGameFinished: false })
      const allItems = document.querySelectorAll('.gameFieldsList li');
      allItems.forEach(item => {
        item.classList.remove("active");
        item.classList.remove("clicked");
        item.classList.remove("notclicked");
      })
    }

    this.setState({ isGameInProgress: true })

    const timer = setInterval(() => {
      const allItems = document.querySelectorAll('.gameFieldsList li');
      const allClickedItems = document.querySelectorAll('.clicked');
      const allNotClickedItems = document.querySelectorAll('.notclicked');
      const allItemsLength = allItems.length;
      const allClickedItemsLength = allClickedItems.length;
      const allNotClickedItemsLength = allNotClickedItems.length;


      if (this.state.isGameFinished === true) {
        clearInterval(timer);
        return
      }

      const indexes = this.getInactiveIdexes(allItems)

      if (indexes.length === 0) {
        clearInterval(timer);
        return
      }

      const randomNumber = this.getRandomNumer(indexes)
      const selector = `.gameFieldsList li:nth-child(${randomNumber})`
      const itemField = document.querySelector(selector)

      if (itemField.classList.contains("active")) {
        return
      }

      if ((allClickedItemsLength * 100 / allItemsLength) > 50 &&
        allItemsLength !== 0) {
        clearInterval(timer);
        this.setState({
          winner: this.state.gamer,
          isGameFinished: true,
          isGameInProgress: false
        })
        allItems.forEach(item => {
          item.classList.remove("active");
        })
      }

      if ((allNotClickedItemsLength * 100 / allItemsLength) > 50 &&
        allItemsLength !== 0) {
        clearInterval(timer);
        this.setState({
          winner: "Computer",
          isGameFinished: true,
          isGameInProgress: false
        })
        allItems.forEach(item => {
          item.classList.remove("active");
        })
      }

      if (this.state.isGameFinished === true) {
        const jsonForServer = this.getJsonForServer()
        this.postWinner(jsonForServer)
      }

      if (this.state.isGameFinished === true) {
        clearInterval(timer);
        return
      }

      setTimeout(() => {
        if (this.state.isGameFinished === true) {
          clearInterval(timer);
          return
        }
        itemField.classList.add("active")
      }, 2)

      if (!itemField.classList.contains("clicked")) {
        setTimeout(() => {
          if (this.state.isGameFinished === true) return
          itemField.classList.add("notclicked")
        }, delay)
      }

    }, delay);

  }

  handleInputChange = (event) => {
    this.setState({ gamer: event.target.value });
  }

  handleCategoryChange = mode => {
    this.setState({
      mode,
      isGameFinished: false,
      delay: this.state.mode.delay
    });
    const allItems = document.querySelectorAll('.gameFieldsList li');
    allItems.forEach(item => {
      item.classList.remove("active");
      item.classList.remove("clicked");
      item.classList.remove("notclicked");
    })

  };

  render() {
    const {
      gameFieldItems,
      leaderBoardItems,
      gamer,
      isGameFinished,
      options,
      mode,
      fieldWidth,
      label,
      winner
    } = this.state;

    return (
      <div className={styles.appWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.gameWrap}>
            <h1 className={styles.title}>MAGIC SQUARE</h1>
            <ControlPanel
              handlePlay={this.handlePlay}
              label={label}
              selectValue={mode}
              handleCategoryChange={this.handleCategoryChange}
              options={options}
              inputValue={gamer}
              handleInputChange={this.handleInputChange}
            />
            {isGameFinished ?
              <h2 className={styles.gameResults}>{winner} wins!</h2> :
              <h2 className={styles.gameResults}> </h2>
            }
            <GameField
              fieldWidth={fieldWidth}
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

