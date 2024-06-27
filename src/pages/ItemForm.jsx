import React, { useState, useEffect } from "react";
import { Button, message, Form, Input, DatePicker } from "antd";
import axios from "axios";
import ItemTable from "../components/ItemTable";
import DeleteItemModal from "../components/DeleteItemModal";
import EditItemModal from "../components/EditItemModal";
import AddItemModal from "../components/AddItemModal";
import AddBasketModal from "../components/AddBasketModal";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const ItemForm = ({ userName }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [basketModalVisible, setBasketModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [basket, setBasket] = useState([]);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(savedBasket);
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get("http://localhost:5001/items")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5001/items/${selectedItem.id}`)
      .then(() => {
        message.success("Item deleted successfully!");
        setDeleteModalVisible(false);
        fetchItems();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        message.error("Failed to delete item.");
      });
  };

  const handleUpdate = (values) => {
    axios
      .put(`http://localhost:5001/items/${selectedItem.id}`, values)
      .then(() => {
        message.success("Item updated successfully!");
        setEditModalVisible(false);
        fetchItems();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        message.error("Failed to update item.");
      });
  };

  const handleAdd = (values) => {
    axios
      .post("http://localhost:5001/items", values)
      .then(() => {
        message.success("Item added successfully!");
        setAddModalVisible(false);
        fetchItems();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        message.error("Failed to add item.");
      });
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditModalVisible(true);
    form.setFieldsValue(item);
  };

  const handleAddToBasket = (item, rentalDuration) => {
    const totalCost = item.rental_price * rentalDuration;
    const updatedBasket = [...basket, { ...item, rentalDuration, totalCost }];
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    message.success("Item added to basket!");
    setBasketModalVisible(false);
  };

  const handleCancel = () => {
    setDeleteModalVisible(false);
    setEditModalVisible(false);
    setAddModalVisible(false);
    setBasketModalVisible(false);
  };

  const handleLogout = () => {
    setBasket([]);
    localStorage.removeItem("basket");
    navigate("/");
  };
  const handleNameFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = items.filter((item) => item.item_name.toLowerCase().includes(value));
    setFilteredItems(filtered);
  };

  const handleDateFilterChange = (date, dateString) => {
    const filtered = items.filter((item) => dayjs(item.listing_date).isSame(date, "day"));
    setFilteredItems(filtered);
  };

  return (
    <div >
      <h3>Welcome, {userName}!</h3>
      <Button
        type="primary"
        onClick={handleLogout}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        Logout
      </Button>

      <h1>Items List</h1>

      <Input
          placeholder="Filter by item name"
          onChange={handleNameFilterChange}
          style={{ width: "200px", marginRight: "20px" }}
        />
        <DatePicker
          placeholder="Filter by listing date"
          onChange={handleDateFilterChange}
          style={{ marginRight: "20px" }}
        />
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => setAddModalVisible(true)}
      >
        Add Item
      </Button>
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        style={{ marginLeft: "20px" }}
        onClick={() => navigate("/itembox", { state: { basket } })}
      >
        View Basket
      </Button>
      <ItemTable
        items={filteredItems}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={(item) => {
          setSelectedItem(item);
          setDeleteModalVisible(true);
        }}
        handleAddToBasket={(item) => {
          setSelectedItem(item);
          setBasketModalVisible(true);
        }}
      />

      <DeleteItemModal
        visible={deleteModalVisible}
        handleOk={handleDelete}
        handleCancel={handleCancel}
      />

      <EditItemModal
        visible={editModalVisible}
        handleOk={handleUpdate}
        handleCancel={handleCancel}
        item={selectedItem}
        form={form}
      />

      <AddItemModal
        visible={addModalVisible}
        handleOk={handleAdd}
        handleCancel={handleCancel}
        form={form}
      />

      <AddBasketModal
        visible={basketModalVisible}
        handleOk={(values) =>
          handleAddToBasket(selectedItem, values.rentalDuration)
        }
        handleCancel={handleCancel}
        form={form}
      />
    </div>
  );
};
