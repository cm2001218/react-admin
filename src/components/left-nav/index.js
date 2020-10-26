import React, { Component } from "react";
import "./index.less";

import menuList from "../../config/menuConfig";
import { Menu, Icon } from "antd";
import logo from "../../assets/images/logo.png";
import { Link, withRouter } from "react-router-dom";

const SubMenu = Menu.SubMenu;

class LeftNav extends Component {
  getMenu = (menuList) => {
    const path = this.props.location.pathname;

    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // debugger;
        const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0);
        if (cItem) {
          this.openKey = item.key;
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }>
            {this.getMenu(item.children)}
          </SubMenu>
        );
      }
    });
  };
  componentWillMount() {
    this.menuNodes = this.getMenu(menuList);
  }
  render() {
    // debugger;
    let path = this.props.location.pathname;

    if (path.indexOf("/product") === 0) {
      // 当前请求的是商品或其子路由界面
      path = "/product";
    }
    const openKey = this.openKey;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>Admin Platform</h1>
        </Link>
        <Menu mode="inline" theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
          {this.menuNodes}
          {/* <Menu.Item key="1">
            <Link to="/home">
              <Icon type="pie-chart" />
              <span>Home</span>
            </Link>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Products</span>
              </span>
            }>
            <Menu.Item key="2">
              <Link to="/category">
                <Icon type="mail" />
                <span>Category Admin</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/product">
                <Icon type="mail" />
                <span>Product Admin</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4">
            <Link to="/user">
              <Icon type="pie-chart" />
              <span>User Admin</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/role">
              <Icon type="pie-chart" />
              <span>Role Admin</span>
            </Link>
          </Menu.Item> */}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
