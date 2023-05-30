import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Dashboard from './Dashboard';
import ProductDetail from './ProductDetail';
import ProductListing from './ProductListing';
import AddProduct from './AddProduct';

const App = () => {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My PIM System
            </Typography>
            <Button component={Link} to="/" color="inherit">
              Dashboard
            </Button>
            <Button component={Link} to="/products" color="inherit">
              Products
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
        <footer>
          <Typography variant="body2" color="text.secondary" align="center">
            &copy; 2023 My PIM System. All rights reserved.
          </Typography>
        </footer>
      </div>
    </Router>
  );
};

export default App;
