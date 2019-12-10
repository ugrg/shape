/*
 * Author: bjiang
 * Create Time: 2019/12/9 15:31
 */

import React, { useState } from "react";
import 多边形 from "./多边形";

const du = Math.PI / 180;
// 参数添加默认值
const defaultProps = {
  alpha: 60,
  beta: 60
};
type DefaultProps = typeof defaultProps;

// 指定参数类型
export interface propTypes extends Partial<DefaultProps> {
  rotate?: number
}

const 三角形 = React.forwardRef((props: propTypes & DefaultProps, ref: React.Ref<SVGSVGElement>) => {
  const { alpha, beta, rotate: _rotate } = props;
  const [rotate] = useState(_rotate || Math.floor(Math.random() * 100));
  const points: Array<[number, number]> = [rotate, (rotate + alpha), rotate - beta]
    .map((theta) => [Math.cos(theta * 2 * du), Math.sin(theta * 2 * du)])
    .map(([x, y]) => [x * 50, y * 50]);
  return <多边形 {...props} ref={ref} points={points}/>;
});

三角形.displayName = "三角形";
三角形.defaultProps = defaultProps;

export default 三角形 as React.ForwardRefExoticComponent<propTypes>;
