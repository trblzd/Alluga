import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/material/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';

const RemoveProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Code to fetch the products from the database goes here

    // Example response from the database:
    // [
    //   { id: 1, name: 'Product 1', description: 'Description 1', price: 9.99 },
    //   { id: 2, name: 'Product 2', description: 'Description 2', price: 19.99 },
    //   { id: 3, name: 'Product 3', description: 'Description 3', price: 29.99 },
    // ]
    setProducts([
      { id: 1, name: 'Product 1', description: 'Description 1', price: 9.99 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 19.99 },
      { id: 3, name: 'Product 3', description: 'Description 3', price: 29.99 },
    ]);
  }, []);

  const handleRemoveProduct = (id) => {
    // Code to remove the product from the database goes here

    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
                {product.id}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.image}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
            </TableBody>
        </Table>
        </TableContainer>
          )}

export default RemoveProduct