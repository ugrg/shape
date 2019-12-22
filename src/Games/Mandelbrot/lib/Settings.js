import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styles from "./setting.module.less";

const propTypes = {
  renderTime: PropTypes.number,
  speed: PropTypes.number,
  onDownload: PropTypes.func,
  onRender: PropTypes.func
};
const defaultProps = {};
const handleChange = (setFn) => ({ target: { value } }) => setFn(parseFloat(value));

const SelectScheme = (props) => {
  return <select {...props}>
    <option value="pickColorGrayscale">Grayscale #1</option>
    <option value="pickColorGrayscale2">Grayscale #2</option>
    <option value="pickColorHSV1">HSV #1</option>
    <option value="pickColorHSV2">HSV #2 Red</option>
    <option value="pickColorHSV3">HSV #2 Blue</option>
  </select>;
};

const Command = ({ onDownload }) => <div className={styles.command}>
  <button type="submit">渲染</button>
  <button type="reset">重置</button>
  <button onClick={onDownload}>下载</button>
</div>;

const Option = ({ title, value, onChange }) => <div>
  <span>{title}</span><input value={value} onChange={handleChange(onChange)} />
</div>;

const Setting = ({ renderTime, speed, onDownload, onRender }) => {
  const [iterations, setIterations] = useState(50);
  const [autoIterations, setAutoIterations] = useState(true);
  const [escapeRadius, setEscapeRadius] = useState(10);
  const [colorScheme, setColorScheme] = useState("pickColorGrayscale");
  const [superSamples, setSuperSamples] = useState(1);
  const [updateTimeout, setUpdateTimeout] = useState(200);
  const handleSubmit = (event) => {
    onRender({ iterations, autoIterations, escapeRadius, colorScheme, superSamples, updateTimeout });
    event.preventDefault();
  };
  useEffect(() => {
    onRender({ iterations, autoIterations, escapeRadius, colorScheme, superSamples, updateTimeout });
  }, []);
  return <div className={styles.settings}>
    <form id="settingsForm" onSubmit={handleSubmit}>
      <div>
        <span>渲染耗时</span><em>{renderTime}</em>
        <small>秒</small>
      </div>
      <div>
        <span>渲染速度</span><em>{speed}</em>
        <small>像素/秒</small>
      </div>
      <div>
        <span>迭代次数</span>
        <input value={iterations} onChange={handleChange(setIterations)} />
        <input type="checkbox" id="autoIterations" checked={autoIterations}
          onChange={() => setAutoIterations(!autoIterations)} />
        <label htmlFor="autoIterations">auto</label>
      </div>
      <Option title={"逃逸半径"} value={escapeRadius} onChange={setEscapeRadius} />
      <div>
        <span>配色模式</span>
        <SelectScheme value={colorScheme} onChange={({ target: { value } }) => setColorScheme(value)} />
      </div>
      <Option title={"采样率"} value={superSamples} onChange={setSuperSamples} />
      <Option title={"页面更新周期"} value={updateTimeout} onChange={setUpdateTimeout} />
      <Command onDownload={onDownload} />
    </form>
  </div>;
};

Setting.propTypes = propTypes;
Setting.defaultProps = defaultProps;
export default Setting;
