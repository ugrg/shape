/*
 * Author: bjiang
 * Create Time: 2019/12/29 05:42
 */

import React, { useState, Ref } from "react";
import Polygon from "./多边形";

// 参数添加默认值
const defaultProps = {};
type DefaultProps = typeof defaultProps;

// 指定参数类型
export interface propTypes extends Partial<DefaultProps> {
  children?: React.ReactNode
  rotate?: number
}

const MAX = 100;
const fl = (r: number, x: number) => (x - r) * r / (MAX - r);
const fh = (r: number, x: number) => x * r / (MAX - r) + MAX - r;

const 长方形 = React.forwardRef(({ rotate, ...props }: propTypes, ref: Ref<SVGSVGElement>) => {
  const [r] = useState(rotate || Math.floor(Math.random() * (MAX - 1)));
  const sp = (MAX - r) / 2 * (Math.random() * 0.3 + 0.4);
  const A = [r + sp, fl(r, r + sp)];
  const B = [MAX - sp, fl(r, MAX - sp)];
  const C = [sp, fh(r, sp)];
  const D = [MAX - r - sp, fh(r, MAX - r - sp)];
  const points: Array<[number, number]> = [A, B, D, C]
    .map(([x, y]) => [x - 50, y - 50]);
  return <Polygon {...props} ref={ref} points={points} />;
});

长方形.displayName = "长方形";
长方形.defaultProps = defaultProps;

export default 长方形;
