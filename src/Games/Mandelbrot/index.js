import cx from "classnames";
import React, { Fragment } from "react";
import Setting from "./lib/Settings";
import Driver from "./Driver";
import styles from "./styles.module.less";

class Mandelbrot extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      renderTime: 0.0,
      speed: 0.0,
      box: null,
      width: 0,
      height: 0
    };
    this.mandelbrotRef = React.createRef();
    this.controlsRef = React.createRef();
    this.handleRender = this.handleRender.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  handleRender (settings) {
    console.info("draw");
    this.driver.setSettings(settings);
    this.driver.draw();
  }

  handleDownload () {

  }

  /**
   * @param clientX
   * @param clientY
   */
  handleMouseDown ({ clientX, clientY }) {
    const { box } = this.state;
    // 如果没有记录开始点，则将当前点击的坐标记入开始点
    if (box === null) this.setState({ box: [clientX, clientY] });
  }

  handleMouseMove ({ clientX: ex, clientY: ey }) {
    const { box, width, height } = this.state;
    if (box == null) return;
    if (this.controlsRef.current === null) return;
    // 清除掉原来的框，用当前坐标以及记录的开点，重绘制一个矩形框
    const c = this.controlsRef.current.getContext("2d");
    c.lineWidth = 1;
    // clear out old box first
    c.clearRect(0, 0, width, height);
    c.strokeStyle = "#FF3B03";
    const [x, y] = box;
    c.strokeRect(x, y, ex - x, ey - y);
  }

  handleMouseUp ({ clientX: ex, clientY: ey, shiftKey }) {
    const { box, width, height } = this.state;
    if (box == null) return;
    if (this.controlsRef.current === null) return;
    const c = this.controlsRef.current.getContext("2d");
    // 清理掉矩形框
    c.clearRect(0, 0, width, height);
    const [sx, sy] = box;
    this.setState({ box: null });
    this.driver.setZoom([sx, sy, ex, ey], shiftKey);
    this.driver.draw();
  }

  handleResize () {
    const { innerWidth, innerHeight } = window;
    this.setState({ width: innerWidth, height: innerHeight });
  }

  componentDidMount () {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    const { innerWidth, innerHeight } = window;
    this.driver = new Driver(this.mandelbrotRef.current, innerWidth, innerHeight);
    this.driver.on("update", ({ renderTime, pixels }) => {
      this.setState({ renderTime: (renderTime / 1000.0).toFixed(1), speed: Math.floor(60.0 * pixels / renderTime) });
    });
  }

  componentDidUpdate (prevProps, prevState) {
    const { state } = this;
    if (prevState.width !== state.width || prevState.height !== state.height) {
      this.driver.resize(state.width, state.height);
    }
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.handleResize);
  }

  render () {
    const { renderTime, speed, width, height } = this.state;
    return <Fragment>
      <Setting renderTime={renderTime} speed={speed} onRender={this.handleRender} onDownload={this.handleDownload} />
      <canvas className={styles.canvas} ref={this.mandelbrotRef} width={width} height={height} />
      <canvas className={cx(styles.canvas, styles.controls)} ref={this.controlsRef}
        width={width} height={height}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      />
    </Fragment>;
  }
}

export default Mandelbrot;
