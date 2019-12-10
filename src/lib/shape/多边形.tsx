/*
 * Author: bjiang
 * Create Time: 2019/12/9 16:22
 */

import React from "react";
import Shape from "./lib/Shape";

// 参数添加默认值
const defaultProps = {};
type DefaultProps = typeof defaultProps;

// 指定参数类型
export interface propTypes extends Partial<DefaultProps> {
  children?: React.ReactNode,
  points: Array<[number, number]>,
}

const 多边形 = React.forwardRef(({ points, ...props }: propTypes, ref: React.Ref<SVGSVGElement>) => {
  const _points = points.join(" ");
  return <Shape {...props} forwardRef={ref}>
    <polygon points={_points}/>
  </Shape>;
});

多边形.displayName = "多边形";
多边形.defaultProps = defaultProps;

export default 多边形;
