import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import style from "./style.module.css";
import LayHeader from "./LayHeader";
import LayContent from "./LayContent";
import LayMenu from "./LayMenu";

const { Sider } = Layout;

export default function LayoutViwe() {
  const [collapsed, setCollapsed] = useState(false); // 控制侧边栏展开收起

  const [initialMenuList, setInitialMenuList] = useState([]); // 后端返回的路由表
  const [menuLoading, setMenuLoading] = useState(false);
  useEffect(() => {
    // 获取权限路由列表
    setMenuLoading(true);
    axios
      .get("/mock-api/react-antd-admin/get-menu-list.json")
      .then((response) => {
        const { data } = response.data;
        setInitialMenuList(data || []);
      })
      .finally(() => {
        setMenuLoading(false);
      });
  }, []);

  return (
    <Layout style={{ minHeight: "100%" }}>
      <LayHeader />

      <Layout style={{ height: "100%" }}>
        <Sider collapsed={collapsed} collapsedWidth={48} theme="light"></Sider>

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
          className={style.sider}
        >
          <LayMenu initialMenuList={initialMenuList} loading={menuLoading} />
        </Sider>

        <LayContent initialMenuList={initialMenuList} loading={menuLoading} />
      </Layout>
    </Layout>
  );
}
