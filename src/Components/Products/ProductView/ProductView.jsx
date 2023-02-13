import React from 'react'
import './Styles.css'
import {Typography, Grid, ImageList} from '@mui/material'

const ProductView = ({ product }) => {
  if (!product) {
    return null;
  }
  return (
    <div>
    {product ? (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ImageList
            
            src={product.media.source}
            alt={product.name}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography  variant="h5">
            {product.name}
          </Typography>
          <Typography variant="body1">
            Price: {product.formatted_price}
          </Typography>
          <Typography variant="body2">
            Description: {product.description}
          </Typography>
        </Grid>
      </Grid>
    ) : (
      <Typography variant="body1">Loading...</Typography>
    )}
  </div>
  )
}

export default ProductView