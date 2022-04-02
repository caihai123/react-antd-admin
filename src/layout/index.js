import React, { useState, Suspense, useEffect } from "react";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, Link } from "react-router-dom";
import style from "./style.module.css";
import routes from "../router/index"; // 路由表
import axios from "../utils/axios";

const { Header, Sider, Content } = Layout;

function MenuItem(item) {
  if (item.type === "1") {
    return (
      <Menu.Item key={item.id} icon={<MenuUnfoldOutlined />} title={item.title}>
        {/* <Link to={item.path}>{item.title}</Link> */}
      </Menu.Item>
    );
  } else {
    return (
      <Menu.SubMenu title={item.title} key={item.id} icon={<MenuUnfoldOutlined />}>
        {(item.children || []).map((i) => MenuItem(i))}
      </Menu.SubMenu>
    );
  }
}

export default function LayoutViwe() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    axios
      .get("/mock-api/vue-clean-admin/get-menu-list.json")
      .then((response) => {
        const { data } = response.data;
        setMenuList(data || []);
      });
  }, []);

  return (
    <Layout>
      <Sider collapsed={collapsed}>
        <div className={style.logo} />
        <Menu theme="dark" mode="inline">
          {menuList.map((item) => MenuItem(item))}
        </Menu>
      </Sider>

      <Layout style={{ background: "#f0f2f5" }}>
        <Header className={style.header} style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: style.trigger,
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content className={style.content}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((item) => (
                <Route
                  path={item.path}
                  key={item.path}
                  element={<item.component />}
                />
              ))}
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
