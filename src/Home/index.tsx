import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.less";

const Home: React.FC = () => {
  return <article className={styles.home}>
    <h1>颜色与形状学习</h1>
    <h2>
      <Link to={"/colorful"}>多彩方格</Link>
      <div className={styles.colorful}/>
    </h2>
    <h2>
      <Link to={"/imitate"}>模仿</Link>
    </h2>
  </article>;
};

export default Home;
