import React, { Component } from "react";
import "./index.less";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>Welcome,admin</span>
          <a href="#">Logout</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">Home</div>
          <div className="header-bottom-right">
            <span>10:00:00</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
            <span>sunny</span>
          </div>
        </div>
      </div>
    );
  }
}
