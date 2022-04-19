import axios from "@/utils/axios";
import { useState, createRef } from "react";
import { Table, Form, Input, Button, Space, Modal } from "antd";
import DictSelect from "@/components/select/DictSelect";
import DictParse from "@/components/DictParse";
import AddOrEdit from "./AddOrEdit";

const { Column } = Table;

export default function PageTable() {
  let cacheSearchParams = {}; // 缓存查询条件，给分页组件或其他情况刷新页面
  const [headform] = Form.useForm();

  // 重置搜索栏
  const onResetHead = () => {
    headform.resetFields();
    headform.submit();
  };

  const [tableData, setTableData] = useState([
    {
      id: "1",
      name: "张三",
      phone: "15555555555",
      idCard: "520122166666666666",
      gender: "1",
      nation: "1",
    },
    {
      id: "2",
      name: "李四",
      phone: "15555555555",
      idCard: "520122166666666666",
      gender: "2",
      nation: "2",
    },
  ]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  // 获取表格数据
  const getTableData = (page) => {
    axios
      .post("", {
        page: page || pagination.page,
        pageSize: pagination.pageSize,
        ...cacheSearchParams,
      })
      .then((value) => {
        const data = value.data;
        setTableData(data.list || []);
        setPagination({
          page: data.page,
          pageSize: data.pageSize,
          total: data.total,
        });
      });
  };

  // useEffect(() => {
  //   getTableData(1);
  // }, []);

  const delRow = (id) => {
    Modal.confirm({
      title: "确定删除此条数据吗？",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {},
    });
  };

  const addOrEditInstance = createRef(); // 新增编辑组件实例

  return (
    <div className="page">
      <Form
        form={headform}
        layout="inline"
        onFinish={(value) => {
          cacheSearchParams = value;
          getTableData(1);
        }}
      >
        <Form.Item name="name">
          <Input placeholder="姓名" />
        </Form.Item>
        <Form.Item name="phone">
          <Input placeholder="手机号" />
        </Form.Item>
        <Form.Item name="idCard">
          <Input placeholder="身份证" />
        </Form.Item>
        <Form.Item name="gender">
          <DictSelect dictKey="gender" placeholder="性别" />
        </Form.Item>
        <Form.Item name="nation">
          <DictSelect placeholder="民族" dictKey="nation" />
        </Form.Item>
        <Form.Item>
          <Space size="middle">
            <Button onClick={onResetHead}>重置</Button>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <div style={{ paddingBottom: 24 }}>
        <Button
          type="primary"
          onClick={() => addOrEditInstance.current.onStart()}
        >
          新增
        </Button>
      </div>

      <div className="main">
        <Table
          dataSource={tableData}
          rowKey="id"
          bordered
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page) => {
              getTableData(page);
            },
            showTotal: (total) => `共 ${total} 条`,
          }}
        >
          <Column title="姓名" dataIndex="name" />
          <Column title="手机号" dataIndex="phone" />
          <Column title="身份证" dataIndex="idCard" />
          <Column
            title="性别"
            render={(row) => <DictParse value={row.gender} dictKey="gender" />}
          />
          <Column
            title="民族"
            render={(row) => <DictParse value={row.nation} dictKey="nation" />}
          />
          <Column
            title={"操作"}
            width="200px"
            render={(row) => (
              <Space>
                <Button
                  type="primary"
                  ghost
                  size="middle"
                  onClick={() => addOrEditInstance.current.onStart(row.id, row)}
                >
                  编辑
                </Button>
                <Button type="primary" danger onClick={() => delRow(row.id)}>
                  删除
                </Button>
              </Space>
            )}
          />
        </Table>

        {/* 新增或编辑弹窗 */}
        <AddOrEdit ref={addOrEditInstance} />
      </div>
    </div>
  );
}
