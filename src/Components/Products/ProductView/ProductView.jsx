import React from 'react'
import './ProductView.css'
import {Typography, Grid, ImageList} from '@mui/material'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../../../lib/commerce";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  async function fetchProduct(productId) {
    try {
      const product = await commerce.products.retrieve(productId);
      setProduct(product);
    } catch (error) {
      console.log("Erro ao buscar produto:", error);
    }
  }
  return (
    <div clas='container'>
      {product ? (
        <Grid container spacing={3}>
          <Grid item xs={4} >
          <img src={product.image.url} class='image' alt={product.name}/>
          </Grid>
          <Grid item xs={8}>
            <Typography  variant="h5">
              {product.name}
            </Typography>
            <Typography variant="body1">
              Price: {product.price.formatted_with_symbol}
            </Typography>

           <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant='body2' />
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
  </div>
  )
}

export default ProductView