/*
 * Author: bjiang
 * Create Time: 2019/12/6 12:17
 */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Colorful from "./Games/Colorful";

// 参数添加默认值
const defaultProps = {};

const Routers: React.FC = () => <Router>
  <Switch>
    <Route exact path={"/colorful"} component={Colorful}/>
    <Route exact path={"/"} component={Home}/>
  </Switch>
</Router>;

Routers.displayName = "Routers";
Routers.defaultProps = defaultProps;

export default Routers;
