import { Menu } from "antd";
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined } from "@ant-design/icons";

export default function MenuItem(item) {
  if (item.type === "1") {
    return (
      <Menu.Item key={item.id} icon={<MenuUnfoldOutlined />} title={item.title}>
        <Link to={item.path}>{item.title}</Link>
      </Menu.Item>
    );
  } else {
    return (
      <Menu.SubMenu
        title={item.title}
        key={item.id}
        icon={<MenuUnfoldOutlined />}
      >
        {(item.children || []).map((i) => MenuItem(i))}
      </Menu.SubMenu>
    );
  }
}
