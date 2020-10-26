import React, { Component } from "react";
import { reqWeather } from "../../api";
import "./index.less";
import { formateDate } from "../../utils/dateUtils";
import menulist from "../../config/menuConfig";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
// import moduleName from "module";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../link-button";

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: "",
    weather: "",
    // title: "",
  };
  logout = () => {
    /* pop the modal */
    Modal.confirm({
      content: "confirm to logout?",
      onOk: () => {
        // console.log(this);
        /* delete user in local and memory */
        storageUtils.removeUser();
        memoryUtils.user = {};
        /* to login  */
        this.props.history.replace("/login");
        // this.props.history.push("/login"); //ok
        // console.log(this.props.history.goBack());
      },
    });
  };
  getTitle = () => {
    let title = "";
    const path = this.props.location.pathname;
    menulist.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        // const cItem = item.children.find((cItem) => cItem.key === path);
        const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    // this.setState({ title });
    return title;
  };
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({
        currentTime,
      });
    }, 1000);
  };
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather("广州");
    this.setState({
      dayPictureUrl,
      weather,
    });
  };

  componentDidMount() {
    this.getTime();
    this.getWeather();
    this.user = storageUtils.getUser();
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const title = this.getTitle();
    const user = this.user || {};
    return (
      <div className="header">
        <div className="header-top">
          <span>Welcome,{user.username}</span>
          <LinkButton onClick={this.logout}>Logout</LinkButton>
          {/* <a href="javascript:" onClick={this.logout}>
            Logout
          </a> */}
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{this.state.currentTime}</span>
            <img src={this.state.dayPictureUrl} alt="weather" />
            <span>{this.state.weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
