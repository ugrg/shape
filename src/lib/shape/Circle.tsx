/*
 * Author: bjiang
 * Create Time: 2019/12/9 14:38
 */

import React from "react";

// 参数添加默认值
const defaultProps = {
  fill: "transparent",
  stroke: "#000"
};
type DefaultProps = typeof defaultProps;

// 指定参数类型
export interface propTypes extends Partial<DefaultProps> {
  children?: React.ReactNode
}

const Circle = React.forwardRef(({ fill, stroke, ...props }: propTypes, ref: React.Ref<SVGSVGElement>) => {
  return <svg {...props} ref={ref} width="100%" height="100%">
    <circle cx="50%" cy="50%" r="50%" style={{ fill, stroke }}/>
  </svg>;
});

Circle.displayName = "Circle";
Circle.defaultProps = defaultProps;

export default Circle;
