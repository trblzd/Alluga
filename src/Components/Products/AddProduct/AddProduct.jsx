import React, { useState } from 'react';
import {TextField, Button} from '@mui/material';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage(null);
  };

  const handleImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="product-name"
        label="Nome do Produto"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <br/>
      <TextField
        id="product-description"
        label="Descrição"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      />
      <br/>
      <TextField
        id="product-price"
        label="Preço"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <br/>
        <input
        accept="image/*"
        id="product-image"
        type="file"
        onChange={handleImageChange}
      />
      <br/>
      <label htmlFor="product-image">
        <Button component="span" variant="contained">
         Enviar Imagem
        </Button>
      </label>
      <br/>
      <Button type="submit" variant="contained">
        Adicionar Produto
      </Button>
    </form>
  );
};

export default AddProduct;
