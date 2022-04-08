import React, { useState, Suspense, useEffect } from "react";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import style from "./style.module.css";
import routes from "../router/index"; // 前端路由表
import axios from "../utils/axios";
import MenuItem from "./menu-item.js";
import Redirect from "./redirect";
import Breadcrumb from "./Breadcrumb.js";
import Error404 from "../pages/404.js";
import Error401 from "../pages/401.js";
import { flattenDeep } from "../utils/index.js";
import WaterMark from "../components/WaterMark.js";
import Logo from "../assets/logo.svg";

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
      <Header className={style.header}>
        <div className={style.logo}>
          <Link to="/">
            <img src={Logo} alt="logo" />
            <h1>React-Antd-Admin</h1>
          </Link>
        </div>
      </Header>

      <Content style={{ marginTop: 48 }}>
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            theme="light"
            collapsedWidth={48}
            trigger={React.createElement(
              "div",
              {
                className: style.trigger,
                onClick: () => setCollapsed(!collapsed),
              },
              collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            )}
          >
            <Menu mode="inline" selectedKeys={[activePathname]}>
              {initialMenuList.map((item) => MenuItem(item))}
            </Menu>
          </Sider>

          <Content className={style.content}>
            <div style={{ height: 48, display: "flex", alignItems: "center" }}>
              <Breadcrumb menuList={initialMenuList} />
            </div>

            <WaterMark
              height={36}
              width={115}
              image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg"
            >
              <Content className={style.main}>
                <Suspense>
                  <Routes>
                    {routes.map((item) => (
                      <Route
                        path={item.path}
                        key={item.path}
                        element={
                          isInMenuList(item.path) ? (
                            <item.component />
                          ) : (
                            <Error401 />
                          )
                        }
                      />
                    ))}
                    <Route path="/" element={<Redirect to="/index" />} />
                    <Route path="/*" element={<Error404 />}></Route>
                  </Routes>
                </Suspense>
              </Content>
            </WaterMark>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}
