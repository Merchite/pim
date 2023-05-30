import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!name || !price || !description) {
      alert('Please enter all the fields');
      return;
    }

    // Create new product object
    const newProduct = {
      name,
      price: parseFloat(price),
      description,
    };

    // Perform API call or data update logic here
    // ...

    // Redirect to the product listing page
    navigate('/products');
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label="Price"
          value={price}
          onChange={handlePriceChange}
          type="number"
        />
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" type="submit">Save</Button>
      </form>
    </div>
  );
};

export default AddProduct;
