import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import styles from './Styles.css';
import { Link } from 'react-router-dom'

const Product = ({ product, onAddToCart }) => {
    return (
        <Card className={styles.cardsl}>
            <CardMedia className={styles.cardimage} image={product.image.url} title={product.name} component={Link} to="/ProductView/{product.id}" />
            <CardContent>
                <div>
                    <Typography variant='h5' gutterBottom className={styles.cardheading}>
                        {product.name}
                    </Typography>

                    <Typography variant='h5' className={styles.cardtext}>
                        {product.price.formatted_with_symbol}/Dia
                    </Typography>

                </div>
                <Typography className={styles.cardtext} dangerouslySetInnerHTML={{ __html: product.description }} variant='body2' color='textSecondary' />
            </CardContent>

            <CardActions disableSpacing className={styles.cardaction}>
                <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product;