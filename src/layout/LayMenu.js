import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Skeleton } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import MenuItem from "./menu-item.js";

export default function LayMenu({ initialMenuList, loading }) {
  // 监听路由变化，设置菜单选中状态
  let location = useLocation();
  const [activePathname, setActivePathname] = useState(location.pathname);
  useEffect(() => {
    setActivePathname(location.pathname);
  }, [location]);

  return (
    <Skeleton
      active
      loading={loading}
      paragraph={{
        rows: 6,
      }}
      title={false}
      style={{ padding: 20 }}
    >
      <Scrollbars style={{ height: "100%" }} autoHide>
        <Menu mode="inline" selectedKeys={[activePathname]}>
          {initialMenuList.map((item) => MenuItem(item))}
        </Menu>
      </Scrollbars>
    </Skeleton>
  );
}
