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

const Rect = React.forwardRef(({ fill, stroke, ...props }: propTypes, ref: React.Ref<SVGSVGElement>) => {
  return <svg {...props} ref={ref} width="100%" height="100%">
    <rect x={0} y={0} rx={"100%"} ry={"100%"} style={{ fill, stroke }}/>
  </svg>;
});

Rect.displayName = "Rect";
Rect.defaultProps = defaultProps;

export default Rect;
