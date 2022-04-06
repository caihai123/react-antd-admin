import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { Table, Space, Input, Button } from "antd";
import { SearchOutlined, FileAddOutlined } from "@ant-design/icons";

const { Column } = Table;

export default function Page() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // 获取菜单列表
    axios
      .get("/mock-api/vue-clean-admin/get-menu-list.json")
      .then((response) => {
        const { data } = response.data;
        setTableData(data || []);
      });
  }, []);

  return (
    <div className="page">
      <Space style={{ marginBottom: 20 }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="可输入 title path icon 查询"
          style={{ width: 300 }}
        />
        <Button icon={<FileAddOutlined />} type="primary">
          新增
        </Button>
      </Space>

      <Table dataSource={tableData} rowKey="id" bordered pagination={false}>
        <Column title="标题" dataIndex="title" />
        <Column title="路径" dataIndex="path" />
        <Column title="图标" dataIndex="icon" />
        <Column title="排序" dataIndex="index" />
        <Column
          title="操作"
          key="action"
          width="150px"
          render={(tags) => (
            <Space>
              <Button type="primary" ghost>
                编辑
              </Button>
              <Button type="primary">添加子菜单</Button>
              <Button type="primary" danger>
                删除
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
