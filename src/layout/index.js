import React, { useState, Suspense, useEffect } from "react";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, useLocation } from "react-router-dom";
import style from "./style.module.css";
import routes from "../router/index"; // 前端路由表
import axios from "../utils/axios";
import MenuItem from "./menu-item.js";
import Redirect from "./redirect";
import Breadcrumb from "./Breadcrumb.js";
import Error404 from "../pages/404.js";
import Error401 from "../pages/401.js";
import { flattenDeep } from "../utils/index.js";

const { Header, Sider, Content } = Layout;

export default function LayoutViwe() {
  const [collapsed, setCollapsed] = useState(false); // 控制侧边栏展开收起

  const [initialMenuList, setInitialMenuList] = useState([]); // 后端返回的路由表
  useEffect(() => {
    // 获取权限路由列表
    axios
      .get("/mock-api/react-antd-admin/get-menu-list.json")
      .then((response) => {
        const { data } = response.data;
        setInitialMenuList(data || []);
      });
  }, []);

  const [menuList, setMenuList] = useState([]); // 由initialMenuList变化来的一维菜单列表
  useEffect(() => {
    setMenuList(flattenDeep(initialMenuList));
  }, [initialMenuList]);

  // 判断当前路由是否在菜单列表中 如果在返回true 否则返回false
  const isInMenuList = (pathname) => {
    return menuList.find((item) => item.path === pathname);
  };

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
          {initialMenuList.map((item) => MenuItem(item))}
        </Menu>
      </Sider>

      <Layout style={{ background: "#f0f2f5" }}>
        <Header className={style.header} style={{ padding: 0 }}>
          <div>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: style.trigger,
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Breadcrumb menuList={initialMenuList} />
          </div>
        </Header>
        <Content className={style.content}>
          <Suspense>
            <Routes>
              {routes.map((item) => (
                <Route
                  path={item.path}
                  key={item.path}
                  element={
                    isInMenuList(item.path) ? <item.component /> : <Error401 />
                  }
                />
              ))}
              <Route path="/" element={<Redirect to="/index" />} />
              <Route path="/*" element={<Error404 />}></Route>
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
