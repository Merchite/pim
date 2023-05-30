import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3030/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log('Error fetching product:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    // Handle edit functionality
    console.log('Edit product:', product);
  };

  const handleDelete = () => {
    // Handle delete functionality
    console.log('Delete product:', product);
  };

  return (
    <div>
      <div>
        <Button variant="outlined" onClick={handleGoBack}>Back</Button>
        <Button variant="outlined" onClick={handleEdit}>Edit</Button>
        <Button variant="outlined" onClick={handleDelete}>Delete</Button>
      </div>
      <Typography variant="h4">Product Detail</Typography>
      {product ? (
        <div>
          <Typography variant="h5">{product.name}</Typography>
          <img src={product.image} alt={product.name} />
          <Typography variant="body1">Price: ${product.price}</Typography>
          <Typography variant="body1">Description: {product.description}</Typography>
        </div>
      ) : (
        <Typography variant="body1">Product not found.</Typography>
      )}
    </div>
  );
};

export default ProductDetail;
