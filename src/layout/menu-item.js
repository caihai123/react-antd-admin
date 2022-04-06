import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import * as Icon from "@ant-design/icons";

// 动态渲染icon
function antdIcon(icon) {
  return icon && React.createElement(Icon[icon]);
}

export default function MenuItem(item) {
  if (item.type === "1") {
    return (
      <Menu.Item key={item.id} icon={antdIcon(item.icon)}>
        <Link to={item.path}>{item.title}</Link>
      </Menu.Item>
    );
  } else {
    return (
      <Menu.SubMenu title={item.title} key={item.id} icon={antdIcon(item.icon)}>
        {(item.children || []).map((i) => MenuItem(i))}
      </Menu.SubMenu>
    );
  }
}
