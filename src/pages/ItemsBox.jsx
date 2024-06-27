import React, { useState, useEffect } from "react";
import { List, Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ConfirmModal from "../components/ConfirmModal";

export const ItemsBox = () => {
  const location = useLocation();
  const { basket } = location.state || { basket: [] };
  const [basketItems, setBasketItems] = useState(basket);
  const [totalPrice, setTotalPrice] = useState(
    calculateTotalPrice(basketItems)
  );
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasketItems(savedBasket);
    setTotalPrice(calculateTotalPrice(savedBasket));
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems));
    setTotalPrice(calculateTotalPrice(basketItems));
  }, [basketItems]);

  function calculateTotalPrice(items) {
    return items.reduce(
      (total, item) => total + item.rental_price * item.rentalDuration,
      0
    );
  }

  const handleConfirmBasket = () => {
    setConfirmModalVisible(true);
  };

  const handleRemoveFromBasket = (itemToRemove) => {
    const updatedBasket = basketItems.filter(
      (item) => item.id !== itemToRemove.id
    );
    setBasketItems(updatedBasket);
  };

  const handleLogout = () => {
    localStorage.removeItem("basket");
  };

  return (
    <div style={{ position: "relative" }}>
      <h1>Basket</h1>
      <Button
        type="primary"
        onClick={() => navigate("/item")}
        style={{ position: "absolute", top: 0, left: 0 }}
        icon={<ArrowLeftOutlined />}
      >
        Geri Dön
      </Button>
      <List
        dataSource={basketItems}
        renderItem={(basketItem) => (
          <List.Item
            actions={[
              <Button
                type="link"
                onClick={() => handleRemoveFromBasket(basketItem)}
              >
                Remove
              </Button>,
            ]}
          >
            {basketItem.item_name} - $
            {(basketItem.rental_price * basketItem.rentalDuration).toFixed(2)}
          </List.Item>
        )}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          backgroundColor: "#fff",
          padding: "20px",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        <p style={{ marginBottom: "10px" }}>Toplam: ${totalPrice.toFixed(2)}</p>
        <Button
          type="primary"
          onClick={handleConfirmBasket}
          icon={<ShoppingCartOutlined />}
          style={{ float: "right" }}
        >
          Sepeti Onayla
        </Button>
      </div>

      <ConfirmModal
        visible={confirmModalVisible}
        setVisible={setConfirmModalVisible}
      />
    </div>
  );
};
