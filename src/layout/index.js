import React, { useState, Suspense, useEffect } from "react";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, useLocation } from "react-router-dom";
import style from "./style.module.css";
import routes from "../router/index"; // 前端路由表
import axios from "../utils/axios";
import MenuItem from "./menu-item.js";
import Redirect from "./redirect";

const { Header, Sider, Content } = Layout;

export default function LayoutViwe() {
  const [collapsed, setCollapsed] = useState(false); // 控制侧边栏展开收起

  const [menuList, setMenuList] = useState([]); // 后端返回的路由表
  useEffect(() => {
    // 获取权限路由列表
    axios
      .get("/mock-api/react-antd-admin/get-menu-list.json")
      .then((response) => {
        const { data } = response.data;
        setMenuList(data || []);
      });
  }, []);

  // 监听路由变化，设置菜单选中状态
  let location = useLocation();
  const [activePathname, setActivePathname] = useState(location.pathname);
  useEffect(() => {
    setActivePathname(location.pathname);
  }, [location]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={style.logo} />
        <Menu theme="dark" mode="inline" selectedKeys={[activePathname]}>
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
          <Suspense fallback={<div>拼命加载中</div>}>
            <Routes>
              {routes.map((item) => (
                <Route
                  path={item.path}
                  key={item.path}
                  element={<item.component />}
                />
              ))}
              <Route path="/" element={<Redirect to="/index" />} />
              <Route path="/*" element={<div>404</div>}></Route>
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
