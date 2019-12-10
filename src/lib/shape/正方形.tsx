/*
 * Author: bjiang
 * Create Time: 2019/12/9 14:38
 */

import React, { useState } from "react";
import Polygon from "./多边形";

// 参数添加默认值
const defaultProps = {};
type DefaultProps = typeof defaultProps;

// 指定参数类型
export interface propTypes extends Partial<DefaultProps> {
  children?: React.ReactNode
  rotate?: number
}

const 正方形 = React.forwardRef(({ rotate, ...props }: propTypes, ref: React.Ref<SVGSVGElement>) => {
  const [_rotate] = useState(rotate || Math.floor(Math.random() * 100));
  const points: Array<[number, number]> = [[_rotate, 0], [100, _rotate], [100 - _rotate, 100], [0, 100 - _rotate]]
    .map(([x, y]) => [x - 50, y - 50]);
  return <Polygon {...props} ref={ref} points={points}/>;
});

正方形.displayName = "正方形";
正方形.defaultProps = defaultProps;

export default 正方形;
