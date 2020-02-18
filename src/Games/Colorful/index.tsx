/*
 * Author: bjiang
 * Create Time: 2019/12/6 13:25
 */

import React from "react";
import * as shape from "../../lib/shape";
import Target from "./Target";
import styles from "./styles.module.less";

const defaultProps = {
  // 难度
  difficulty: 2
};
type DefaultProps = typeof defaultProps;

interface propTypes extends DefaultProps {
  children?: React.ReactElement
}

interface StateTypes {
  difficulty: number
}

class Colorful extends React.Component<propTypes & typeof defaultProps, StateTypes> {
  constructor (props: propTypes) {
    super(props);
    this.state = {
      difficulty: props.difficulty
    };
    this.target = new Target();
  }

  private target: Target;
  static defaultProps = defaultProps;

  private static renderRandom () {
    const Types = Object.values(shape);
    const Type = Types[Math.floor(Math.random() * Types.length)];
    return <Type/>;
  }

  public render () {
    const { difficulty } = this.state;
    return (
      <article className={styles.colorful}>
        <div className={styles.row}>
          {Array(difficulty * difficulty).fill(0).map((_no, index) => (
            <button key={index} className={styles.col}
              style={{ width: `calc(100% / ${difficulty})`, paddingBottom: `calc(100% / ${difficulty})` }}>
              {Colorful.renderRandom()}
            </button>
          ))}</div>
      </article>
    );
  }
}

Colorful.defaultProps = defaultProps;

export default Colorful;
