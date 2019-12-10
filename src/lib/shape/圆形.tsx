/*
 * Author: bjiang
 * Create Time: 2019/12/9 14:38
 */

import React, { useState } from "react";
import Shape, { SVGStyle } from "./lib/Shape";
// 参数添加默认值
const defaultProps = {};
type DefaultProps = typeof defaultProps;

// 指定参数类型
export interface propTypes extends Partial<DefaultProps> {
  children?: React.ReactNode
  r?: number
  style?: SVGStyle
}

const 圆形 = React.forwardRef(({ style, r, ...props }: propTypes, ref: React.Ref<SVGSVGElement>) => {
  const [_r] = useState(r || Math.floor(Math.random() * 30) + 20);
  return <Shape {...props} forwardRef={ref}>
    <circle cx={0} cy={0} r={_r} style={style}/>
  </Shape>;
});

圆形.displayName = "圆形";
圆形.defaultProps = defaultProps;

export default 圆形;
