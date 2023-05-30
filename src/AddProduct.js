import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://via.placeholder.com/300x300');
  const [status, setStatus] = useState('Draft');
  const [channel, setChannel] = useState('Channel A');
  const [needsRefinement, setNeedsRefinement] = useState(false);


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleChannelChange = (e) => {
    setChannel(e.target.value);
  };

  const handleRefinementChange = (e) => {
    setNeedsRefinement(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!name || !price || !description) {
      alert('Please enter all the fields');
      return;
    }

    // Perform API call or data update logic here
    const addProduct = async () => {
      try {
        const getResponse = await fetch('http://localhost:3030/products');
        const getData = await getResponse.json();
        
        //Find the highest id from the existing products
        const lastProduct = getData.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        const newProductId = lastProduct + 1;
        // Create new product object
        const newProduct = {
          id: newProductId,
          name,
          price: parseFloat(price),
          description,
          image,
          status,
          channel,
          needsRefinement,
        };

        const addResponse = await fetch('http://localhost:3030/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        const addData = await addResponse.json();
        console.log('Product added:', data);
      } catch (error) {
        console.log('Error adding product:', error);
      }
    };

    addProduct(newProduct);

    // Redirect to the product listing page
    navigate(`/products/${newProductId}`);
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
        <TextField
          label="Image"
          value={image}
          onChange={handleImageChange}
        />
        <FormControl>
          <InputLabel id="selectStatus-label">Status</InputLabel>
          <Select value={status} onChange={handleStatusChange} id="selectStatus" labelId="selectStatus-label">
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="selectChannel-label">Channel</InputLabel>
          <Select value={channel} onChange={handleStatusChange} id="selectChannel" labelId="selectChannel-label">
            <MenuItem value="Channel A">Channel A</MenuItem>
            <MenuItem value="Channel B">Channel B</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <Checkbox
            label="Needs Refinement"
            checked={needsRefinement}
            onChange={handleRefinementChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
