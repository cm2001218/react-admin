import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";
import LinkButton from "../../components/link-button";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";

const Option = Select.Option;

export default class ProductHome extends Component {
  state = {
    total: 0,
    products: [],
    loading: false,
    searchName: "",
    searchType: "productName",
  };
  getProducts = async (pageNum) => {
    this.pageNum = pageNum;
    this.setState({ loading: true });
    const { searchName, searchType } = this.state;
    let result = {};

    if (searchName) {
      result = await reqSearchProducts(pageNum, PAGE_SIZE, searchName, searchType);
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE);
    }
    this.setState({ loading: false });

    // console.log(result);
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({
        total,
        products: list,
      });
    }
  };
  updateProduct = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      message.success("update products successfully!");
      this.getProducts(this.pageNum);
    }
    console.log(result);
  };
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => "$" + price,
      },
      {
        width: 100,
        title: "状态",
        // dataIndex: "status",
        render: (product) => {
          const { status, _id } = product;
          const newStatus = status === 1 ? 2 : 1;
          return (
            <span>
              <Button type="primary" onClick={() => this.updateProduct(_id, newStatus)}>
                {status === 1 ? "下架" : "上架"}
              </Button>
              <span>{status === 1 ? "在售" : "已下架"}</span>
            </span>
          );
        },
      },
      {
        width: 100,
        title: "操作",
        // dataIndex: "status",
        render: (product) => {
          return (
            <span>
              <LinkButton
                onClick={() => {
                  this.props.history.push("/product/detail", { product });
                }}>
                详情
              </LinkButton>
              <LinkButton
                onClick={() => {
                  this.props.history.push("/product/addupdate", product);
                }}>
                修改
              </LinkButton>
            </span>
          );
        },
      },
    ];
  };
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getProducts(1);
  }
  render() {
    const { products, total, loading } = this.state;
    const title = (
      <span>
        <Select value="1" style={{ width: 150 }}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input placeholder="请输入关键字" style={{ width: 150, margin: "0 15px" }}></Input>
        <Button type="primary">搜索</Button>
      </span>
    );
    const extra = (
      <span>
        <Button
          type="primary"
          onClick={() => {
            this.props.history.push("/product/addupdate");
          }}>
          <Icon type="plus"></Icon>添加商品
        </Button>
      </span>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          dataSource={products}
          columns={this.columns}
          rowKey="_id"
          pagination={{ current: this.pageNum, defaultPageSize: PAGE_SIZE, total, showQuickJumper: true, onChange: this.getProducts }}></Table>
      </Card>
    );
  }
}
