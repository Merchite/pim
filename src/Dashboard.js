import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3030/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  const totalProducts = products.length;
  const totalPublishedProducts = products.filter((product) => product.status === 'Published').length;
  const totalDraftProducts = products.filter((product) => product.status === 'Draft').length;
  const totalProductsOnChannelA = products.filter((product) => product.channel === 'Channel A').length;
  const totalProductsOnChannelB = products.filter((product) => product.channel === 'Channel B').length;
  const totalProductsNeedingRefinement = products.filter((product) => product.needsRefinement).length;

  return (
    <div>
      <Typography variant="h1">Welcome to the Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Products</Typography>
                <Typography variant="h4">{totalProducts}</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Published Products</Typography>
              <Typography variant="h4">{totalPublishedProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Draft Products</Typography>
              <Typography variant="h4">{totalDraftProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Products on Channel A</Typography>
              <Typography variant="h4">{totalProductsOnChannelA}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Products on Channel B</Typography>
              <Typography variant="h4">{totalProductsOnChannelB}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Products Needing Refinement</Typography>
              <Typography variant="h4">{totalProductsNeedingRefinement}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Add additional dashboard content as needed */}
    </div>
  );
};

export default Dashboard;
