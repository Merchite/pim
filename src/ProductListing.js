import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterChannel, setFilterChannel] = useState('');
  const [filterRefinement, setFilterRefinement] = useState('');

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterProducts(e.target.value, filterStatus, filterChannel, filterRefinement);
  };

  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
    filterProducts(searchTerm, e.target.value, filterChannel, filterRefinement);
  };

  const handleChannelFilter = (e) => {
    setFilterChannel(e.target.value);
    filterProducts(searchTerm, filterStatus, e.target.value, filterRefinement);
  };

  const handleRefinementFilter = (e) => {
    setFilterRefinement(e.target.value);
    filterProducts(searchTerm, filterStatus, filterChannel, e.target.value);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('');
    setFilterChannel('');
    setFilterRefinement('');
    filterProducts('', '', '', '');
  };

  const filterProducts = (searchTerm, status, channel, refinement) => {
    let filteredProducts = products;
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (status) {
      filteredProducts = filteredProducts.filter((product) => product.status === status);
    }
    if (channel) {
      filteredProducts = filteredProducts.filter((product) => product.channel === channel);
    }
    if (refinement) {
      filteredProducts = filteredProducts.filter((product) => product.needsRefinement === (refinement === 'true'));
    }
    setProducts(filteredProducts);
  };
  
  return (
    <div>
      <h1>Product Listing</h1>
      <div>
        <TextField
          label="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FormControl>
          <InputLabel id="selectStatus-label">Status</InputLabel>
          <Select value={filterStatus} onChange={handleStatusFilter} id="selectStatus" labelId="selectStatus-label">
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="selectChannel-label">Channel</InputLabel>
          <Select value={filterChannel} onChange={handleChannelFilter} id="selectChannel" labelId="selectChannel-label">
            <MenuItem value="">All Channels</MenuItem>
            <MenuItem value="Channel A">Channel A</MenuItem>
            <MenuItem value="Channel B">Channel B</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="selectRefinement-label">Refinement Needed</InputLabel>
          <Select value={filterRefinement} onChange={handleRefinementFilter} id="selectRefinement" labelId="selectRefinement-label">
            <MenuItem value="">All Refinements</MenuItem>
            <MenuItem value="true">Needs Refinement</MenuItem>
            <MenuItem value="false">No Refinement Needed</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={clearFilters}>
          Clear Filters
        </Button>
        <Button variant="contained" color="primary" style={{ float: 'right' }}>
          Add Product
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Channel</TableCell>
            <TableCell>Refinement Needed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img src={product.image} alt={product.name} />
              </TableCell>
              <TableCell>
                <Link to={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>{product.channel}</TableCell>
              <TableCell>{product.needsRefinement ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductListing;
