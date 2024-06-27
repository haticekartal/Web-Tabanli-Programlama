import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const AddItemModal = ({ visible, handleOk, handleCancel, form }) => {
  return (
    <Modal
      title="Add Item"
      open={visible}
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            handleOk(values);
          })
          .catch(info => {
            console.error('Validate Failed:', info);
          });
      }}
      cancelText="Cancel"
      okText="Add"
    >
      <Form
        form={form}
        layout="vertical"
        name="addForm"
      >
        <Form.Item
          name="item_name"
          label="Item Name"
          rules={[{ required: true, message: 'Please enter item name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rental_price"
          label="Rental Price"
          rules={[{ required: true, message: 'Please enter rental price!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="listing_date"
          label="Listing Date"
          rules={[{ required: true, message: 'Please select listing date!' }]}
        >
          <Input type="date" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddItemModal;
