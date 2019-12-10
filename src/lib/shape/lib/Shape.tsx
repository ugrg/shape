/*
 * Author: bjiang
 * Create Time: 2019/12/9 16:35
 */

import React from "react";

const defaultProps = {};
type DefaultProps = typeof defaultProps;

export interface SVGStyle {
  fill: string
  stroke: string
}

export interface PropTypes extends Partial<DefaultProps> {
  children: React.ReactElement
  style?: SVGStyle
  forwardRef?: React.Ref<SVGSVGElement>
}

interface StateTypes {
  style: SVGStyle
}

class Shape extends React.Component<PropTypes, StateTypes> {
  constructor (props: PropTypes) {
    super(props);
    this.state = {
      style: Object.assign({
        fill: "transparent",
        stroke: "#000"
      }, props.style)
    };
  }

  static defaultProps = defaultProps;

  render () {
    const { children, forwardRef } = this.props;
    const { style } = this.state;
    return (
      <svg width="100%" height="100%" viewBox={"-60,-60,120,120"} ref={forwardRef}>
        {React.cloneElement(children, { style })}
      </svg>
    );
  }
}

Shape.defaultProps = defaultProps;
export default Shape;
