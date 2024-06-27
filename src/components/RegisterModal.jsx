import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ visible, setVisible, setLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("http://localhost:5001/kullanicilar", values) 
      .then((response) => {
        message.success("Kayıt başarılı! Giriş yapabilirsiniz.");
        setVisible(false);
        setLoggedIn(true);
        navigate("/item");
      })
      .catch((error) => {
        message.error("Kayıt işlemi sırasında bir hata oluştu.");
        console.error("Registration error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title="Kayıt Ol"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Form
        name="register"
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          label="Kullanıcı Adı"
          rules={[
            {
              required: true,
              message: "Kullanıcı adı giriniz.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Şifre"
          rules={[
            {
              required: true,
              message: "Şifre giriniz.",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
