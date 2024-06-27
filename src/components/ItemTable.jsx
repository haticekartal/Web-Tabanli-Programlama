import React from 'react';
import { Table, Button } from 'antd';

const ItemTable = ({ items, loading, handleEdit, handleDelete,handleAddToBasket }) => {
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name',
    },
    {
      title: 'Rental Price',
      dataIndex: 'rental_price',
      key: 'rental_price',
      render: price => `$${price.toFixed(2)}`,
    },
    {
      title: 'Listing Date',
      dataIndex: 'listing_date',
      key: 'listing_date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
          <Button type="link" onClick={() => handleAddToBasket(record)}>
            Add to Basket
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={items}
      loading={loading}
      rowKey="id"
    />
  );
};

export default ItemTable;
