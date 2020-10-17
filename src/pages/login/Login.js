import React, { Component } from "react";
import "./login.less";
import logo from "../../assets/images/logo.png";
import { Form, Icon, Input, Button, message } from "antd";
import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { Redirect } from "react-router-dom";

const Item = Form.Item;

message.config({
  top: 245,
  duration: 1,
  maxCount: 3,
});

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;
        const result = await reqLogin(username, password);
        if (result.status === 0) {
          // message.success("Login successfully!");
          const user = result.data;
          memoryUtils.user = user;
          storageUtils.saveUser(user);
          this.props.history.replace("/");
        } else {
          message.error(result.msg);
        }
      } else {
        console.log("fail validate");
      }
    });
  };

  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback("Please enter password");
    } else if (value.length < 4) {
      callback("password must be more than 4 letters");
    } else if (value.length > 12) {
      callback("password must be less than 12 letters");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("password must be letter,number or underline");
    } else {
      callback();
    }
  };
  render() {
    if (memoryUtils.user && memoryUtils.user._id) {
      return <Redirect to="/" />;
    }
    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>Backend Admin System</h1>
        </div>
        <section className="login-content">
          <h2>User Login</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {/*
              用户名/密码的的合法性要求
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
               */}
              {getFieldDecorator("username", {
                // 配置对象: 属性名是特定的一些名称
                // 声明式验证: 直接使用别人定义好的验证规则进行验证
                rules: [
                  { required: true, whitespace: true, message: "please enter username" },
                  { min: 4, message: "username must be at least 4 letters" },
                  { max: 12, message: "username must be at least 12 letters" },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: "username must be letter,number or underline" },
                ],
                initialValue: "", // 初始值
              })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="username" />)}
            </Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validatePwd,
                  },
                ],
              })(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="password" />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Login
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

const WrapLogin = Form.create()(Login);
export default WrapLogin;
