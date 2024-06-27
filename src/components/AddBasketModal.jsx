import React from 'react';
import { Modal, Form, InputNumber } from 'antd';

const AddBasketModal = ({ visible, handleOk, handleCancel, form }) => {
  return (
    <Modal
    open={visible}
    title="Add to Basket"
    okText="Add"
    onCancel={handleCancel}
    onOk={() => {
      form
        .validateFields()
        .then(values => {
          form.resetFields();
          handleOk(values);
        })
        .catch(info => {
          console.log('Validate Failed:', info);
        });
    }}
  >
    <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item
        name="rentalDuration"
        label="Rental Duration (hours)"
        rules={[
          {
            required: true,
            message: 'Please input the rental duration!',
          },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>
    </Form>
  </Modal>
  );
};

export default AddBasketModal;
