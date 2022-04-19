import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Form, Input, Row, Col, Space, Button, message } from "antd";
import axios from "@/utils/axios";
import DictSelect from "@/components/select/DictSelect";

const TableAddOrEdit = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [headForm] = Form.useForm();
  const [id, setId] = useState("");

  useImperativeHandle(ref, () => ({
    onStart: (id, row = {}) => {
      setId(id);
      headForm.setFieldsValue(row);
      setVisible(true);
    },
  }));

  // 表单提交
  const onSubmit = (data) => {
    axios
      .post("", {
        id: id,
        ...data,
      })
      .then(() => {
        setVisible(false);
        message.success("提交成功！");
      });
  };

  return (
    <Modal
      title={id ? "编辑" : "新增"}
      visible={visible}
      width={800}
      footer={
        <Space>
          <Button onClick={() => setVisible(false)}>取消</Button>
          <Button type="primary" onClick={() => headForm.submit()}>
            确定
          </Button>
        </Space>
      }
      onCancel={() => setVisible(false)}
      afterClose={() => {
        setId("");
        headForm.resetFields();
      }}
    >
      <Form form={headForm} labelCol={{ span: 4 }} onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: "请输入姓名" }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[{ required: true, message: "请输入手机号" }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="idCard"
              label="身份证"
              rules={[{ required: true, message: "请输入身份证" }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="性别"
              rules={[{ required: true, message: "请选择性别" }]}
            >
              <DictSelect dictKey="gender" placeholder="请选择" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nation"
              label="民族"
              rules={[{ required: true, message: "请选择民族" }]}
            >
              <DictSelect dictKey="nation" placeholder="请选择" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});

export default TableAddOrEdit;
