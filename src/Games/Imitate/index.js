/* eslint-disable no-console */
/*
 * Author: bjiang
 * Create Time: 2020/2/3 16:04
 */

import React, { Component } from "react";
import styles from "./styles.module.less";

const difficulty = 5;
const getRandom = () => Math.floor(Math.random() * difficulty * difficulty);
const propTypes = {};

const defaultProps = {};

class Imitate extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    console.info(event.currentTarget.dataset);
  }

  createNewGame () {
    const tasks = [];
    while (tasks.length < 3) {
      const p = getRandom();
      if (tasks.indexOf(p) === -1) tasks.push(p);
    }
    this.setState({ tasks: tasks.sort() });
  }

  componentDidMount () {
    this.createNewGame();
  }

  render () {
    const { tasks } = this.state;
    return (
      <article className={styles.map}>
        <div className={styles.row}>
          {Array(difficulty * difficulty).fill(0).map((_no, index) => (
            <button key={index} className={styles.col}
              style={{ width: `calc(100% / ${difficulty})`, paddingBottom: `calc(100% / ${difficulty})` }}
              data-id={index} onClick={this.handleClick}>
              {tasks.indexOf(index) === -1 ? "" : index}
            </button>
          ))}</div>
      </article>
    );
  }
}

Imitate.propTypes = propTypes;
Imitate.defaultProps = defaultProps;

export default Imitate;
