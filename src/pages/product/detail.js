import React, { Component } from "react";

import { Card, Icon, List } from "antd";

import LinkButton from "../../components/link-button";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqCategory } from "../../api";
import Item from "antd/lib/list/Item";

// cosnt Item = List.Item;

export default class ProductDetail extends Component {
  state = {
    cname1: "",
    cname2: "",
  };
  async componentDidMount() {
    const { pCategoryId, categoryId } = this.props.location.state.product;
    if (pCategoryId === "0") {
      const result = await reqCategory(categoryId);
      this.setState({
        cname1: result.data.name,
      });
    } else {
      const result = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
      this.setState({
        cname1: result[0].data.name,
        cname2: result[1].data.name,
      });
    }
  }

  render() {
    const { name, desc, price, imgs, detail } = this.props.location.state.product;
    const { cname1, cname2 } = this.state;
    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left" style={{ marginRight: 10, fontSize: "20px" }}></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    );

    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>
              {cname1}
              {cname2 ? `-->${cname2}` : ""}
            </span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>

            <span>
              {imgs.map((img) => (
                <img src={BASE_IMG_URL + img} style={{ width: 120, height: 150, marginRight: 10 }}></img>
              ))}
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
