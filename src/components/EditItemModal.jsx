import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const EditItemModal = ({ visible, handleOk, handleCancel, item, form }) => {
  const onFinish = (values) => {
    handleOk(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Edit Item"
      open={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFinish(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        form={form}
        name="editItemForm"
        initialValues={{ ...item }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Item Name"
          name="item_name"
          rules={[{ required: true, message: 'Please input item name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Rental Price"
          name="rental_price"
          rules={[{ required: true, message: 'Please input rental price!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Listing Date"
          name="listing_date"
          rules={[{ required: true, message: 'Please input listing date!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditItemModal;
