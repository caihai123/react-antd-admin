import { useState, Suspense, useEffect } from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import style from "./style.module.css";
import Breadcrumb from "./Breadcrumb";
import Redirect from "./redirect";
import Error404 from "../pages/404.js";
import Error401 from "../pages/401.js";
import routes from "../router/index"; // 前端路由表
import { flattenDeep } from "./utils.js";

const { Content } = Layout;

export default function LayContent({ initialMenuList, loading }) {
  // 由initialMenuList变化来的一维菜单列表
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    setMenuList(flattenDeep(initialMenuList));
  }, [initialMenuList]);

  // 判断当前路由是否在菜单列表中 如果在返回true 否则返回false
  const isInMenuList = (pathname) => {
    return menuList.find((item) => item.path === pathname);
  };

  return (
    <Content className={style.content}>
      <div style={{ height: 36, display: "flex", alignItems: "center" }}>
        <Breadcrumb menuList={initialMenuList} />
      </div>

      <div className={style.main}>
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
      </div>
    </Content>
  );
}
