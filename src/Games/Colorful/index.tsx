/*
 * Author: bjiang
 * Create Time: 2019/12/6 13:25
 */

import React, { MouseEvent, RefObject } from "react";
import * as shape from "../../lib/shape";
import TTS from "../../lib/tts";
import styles from "./styles.module.less";

const defaultProps = {
  // 难度
  difficulty: 3
};
type DefaultProps = typeof defaultProps;

interface propTypes extends DefaultProps {
  children?: React.ReactElement
}

type Shape = keyof typeof shape;

interface StateTypes {
  difficulty: number,
  target: null | Shape,
  map: Array<[Shape, boolean]>
}

class Colorful extends React.Component<propTypes & typeof defaultProps, StateTypes> {
  private static randomTypes (): Shape {
    const Types = Object.keys(shape) as [Shape];
    const random = Math.floor(Math.random() * Types.length);
    return Types[random];
  }

  static defaultProps = defaultProps;

  constructor (props: propTypes) {
    super(props);
    this.state = {
      difficulty: props.difficulty,
      target: null,
      map: []
    };
    this.TTSRef = React.createRef();
    this.handleSolving = this.handleSolving.bind(this);
  }

  TTSRef: RefObject<TTS>;

  speak (tex: string): Promise<undefined> {
    return (this.TTSRef.current as TTS).speak(tex);
  }

  newTarget () {
    const target = Colorful.randomTypes();
    this.setState({
      target,
      map: this.createMap(target) as [[Shape, boolean]]
    });
    this.speak(`请找出${target}在哪里！`);
  }

  createMap (target: Shape) {
    const { difficulty } = this.state;
    const length = difficulty * difficulty;
    const index = Math.floor(Math.random() * length);
    return Array(length).fill(false).fill(true, index, index + 1).map((isTarget) => {
      let _target;
      do {
        _target = isTarget ? target : Colorful.randomTypes();
      } while ((_target === target) !== isTarget);
      return [_target, isTarget];
    });
  }

  handleSolving ({ currentTarget }: MouseEvent<HTMLButtonElement>) {
    const isTarget = (currentTarget as HTMLButtonElement).dataset.isTarget === "true";
    this.speak(isTarget ? "答对了，你真棒！" : "喔哦，不对哦！")
      .then(() => this.newTarget());
  }

  componentDidMount () {
    this.newTarget();
  }

  public render () {
    const { difficulty, map } = this.state;
    return (
      <article className={styles.colorful}>
        <TTS ref={this.TTSRef} />
        <div className={styles.row}>
          {map.map(([type, isTarget], index) => {
            const Type = shape[type as Shape];
            return (
              <button key={index} className={styles.col}
                data-is-target={isTarget}
                style={{ width: `calc(100% / ${difficulty})`, paddingBottom: `calc(100% / ${difficulty})` }}
                onClick={this.handleSolving}>
                <Type />
              </button>
            );
          })}</div>
      </article>
    );
  }
}

Colorful.defaultProps = defaultProps;

export default Colorful;
