import React, { Component } from "react";
import { Card, Table, Button, Icon, message, Modal } from "antd";

import LinkButton from "../../components/link-button";
import { reqCategorys, reqUpdateCategory, reqAddCategory } from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

export default class Category extends Component {
  state = {
    loading: false,
    categorys: [],
    subCategorys: [],
    parentId: "0",
    parentName: "",
    showStatus: 0,
  };
  initColumns = () => {
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "name", // 显示数据对应的属性名
      },
      {
        title: "操作",
        width: 300,
        render: (
          category // 返回需要显示的界面标签
        ) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {this.state.parentId === "0" ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}
          </span>
        ),
      },
    ];
  };

  getCategorys = async (parentId) => {
    this.setState({ loading: true });
    parentId = parentId || this.state.parentId;
    const result = await reqCategorys(parentId);
    this.setState({ loading: false });

    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        this.setState({ categorys });
        console.log("----", this.state.categorys.length);
      } else {
        this.setState({ subCategorys: categorys });
      }
    } else {
      message.error("fail to get categorys list");
    }
  };

  showSubCategorys(category) {
    this.setState({ parentId: category._id, parentName: category.name }, () => {
      // console.log("callback");
      this.getCategorys();
    });
  }

  showCategorys = () => {
    this.setState({
      parentId: "0",
      parentName: "",
    });
  };

  showAdd = () => {
    this.setState({
      showStatus: 1,
    });
  };
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          showStatus: 0,
        });
        const { parentId, categoryName } = values;
        this.form.resetFields();
        const result = await reqAddCategory({ parentId, categoryName });
        /* below is diff from origin */
        if (result.status === 0) {
          // console.log(parentId);
          this.getCategorys(parentId);
        }
      }
    });
  };
  showUpdate = (category) => {
    this.category = category;
    this.setState({
      showStatus: 2,
    });
  };

  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      // console.log(this.category);
      // console.log(values);
      if (!err) {
        this.setState({
          showStatus: 0,
        });
        const categoryId = this.category._id;
        const categoryName = values.categoryName;

        this.form.resetFields();

        const result = await reqUpdateCategory({ categoryId, categoryName });
        if (result.status === 0) {
          // console.log(this.state.parentId);
          this.getCategorys();
        }
      }
    });
  };
  handleCancel = () => {
    // console.log("handle", this);
    this.setState({
      showStatus: 0,
    });
  };
  componentWillMount() {
    // console.log("will", this);
    this.initColumns();
  }
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state;
    // console.log(categorys);
    // console.log(subCategorys);
    const category = this.category || {}; // 如果还没有指定一个空对象

    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <Icon type="arrow-right" style={{ marginRight: 5 }} />
          <span style={{ color: "#1da57a" }}>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus" />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table bordered rowKey="_id" loading={loading} dataSource={parentId === "0" ? categorys : subCategorys} columns={this.columns} pagination={{ defaultPageSize: 5, showQuickJumper: true }} />
        <Modal title="添加分类" visible={showStatus === 1} onOk={this.addCategory} onCancel={this.handleCancel} key="1">
          <AddForm
            categorys={categorys}
            parentId={parentId}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>

        <Modal title="更新分类" visible={showStatus === 2} onOk={this.updateCategory} onCancel={this.handleCancel} key="2">
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
