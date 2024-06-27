import React from 'react';
import { Modal, Form, Input, Button,message } from 'antd';

const ConfirmModal = ({ visible, setVisible }) => {
  const handleOk = () => {
        setVisible(false);
        message.success("Mail gönderildi");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Kredi Kartı Bilgilerini Girin"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          İptal
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Onayla
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item
          label="Kart Numarası"
          name="cardNumber"
          rules={[{ required: true, message: 'Kart numarası gereklidir!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Son Kullanma Tarihi"
          name="expirationDate"
          rules={[{ required: true, message: 'Son kullanma tarihi gereklidir!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="CVV"
          name="cvv"
          rules={[{ required: true, message: 'CVV gereklidir!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ConfirmModal;
