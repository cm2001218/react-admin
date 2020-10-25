import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user.js";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to="/login"></Redirect>;
      // console.log(this.props.history.replace("/login"));
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: "20px", backgroundColor: "#fff" }}>
            <Switch>
              {/* original redirect setting */}
              {/* <Redirect from="/" exact to="/home" /> */}
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              {/* redirect by cm */}
              <Redirect to="/home"></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#cccccc" }}>Google Chrome is recommended for better page operation experience</Footer>
        </Layout>
      </Layout>
    );
  }
}

// export default class Admin extends Component {
//   render() {
//     const user = memoryUtils.user;
//     // 如果内存没有存储user ==> 当前没有登陆
//     if (!user || !user._id) {
//       // 自动跳转到登陆(在render()中)
//       return <Redirect to="/login" />;
//     }
//     return (
//       <Layout style={{ minHeight: "100%" }}>
//         <Sider>
//           <LeftNav />
//         </Sider>
//         <Layout>
//           <Header>Header</Header>
//           <Content style={{ margin: 20, backgroundColor: "#fff" }}>
//             <Switch>
//               {/* <Redirect from="/" exact to="/home" /> */}
//               <Route path="/home" component={Home} />
//               <Route path="/category" component={Category} />
//               <Route path="/product" component={Product} />
//               <Route path="/user" component={User} />
//               <Route path="/role" component={Role} />
//             </Switch>
//           </Content>
//           <Footer style={{ textAlign: "center", color: "#cccccc" }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
//         </Layout>
//       </Layout>
//     );
//   }
// }
