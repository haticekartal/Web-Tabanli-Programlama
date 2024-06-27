import React from 'react';
import { Modal, Button } from 'antd';

const DeleteItemModal = ({ visible, handleOk, handleCancel }) => {
  return (
    <Modal
      title="Confirm Delete"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Delete"
      cancelText="Cancel"
    >
      <p>Are you sure you want to delete this item?</p>
    </Modal>
  );
};

export default DeleteItemModal;
