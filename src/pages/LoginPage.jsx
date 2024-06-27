import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/RegisterModal";
import image from  "../assets/image2.jpeg"
export const LoginPage = ({ setLoggedIn,setUserName }) => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
  
    const onFinish = (values) => {
      setLoading(true);
      axios
        .get("http://localhost:5001/kullanicilar")
        .then((response) => {
          const user = response.data.find(
            (user) =>
              user.username === values.username &&
              user.password === values.password
          );
          if (user) {
            message.success("Giriş başarılı!");
            setLoggedIn(true);
            setUserName(values.username);
            navigate("/item");
          } else {
            message.error("Geçersiz kullanıcı adı veya şifre");
          }
        })
        .catch((error) => {
          message.error("Bir hata oluştu");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    const handleRegister = () => {
      setShowModal(true);
    };
  

  return (
    <div  style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height:"100vh",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0
    }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>

        <Button type="link" onClick={handleRegister}>
        Kaydol
      </Button>
      </Form>

      

      <RegisterModal
        visible={showModal}
        setVisible={setShowModal}
        setLoggedIn={setLoggedIn}
      />
    </div>
  );
};

