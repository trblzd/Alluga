import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from "../../Assets/logo1.png";
import useStyles from "./Styles";
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant='h6' className={classes.title} color="inherit">
                    <img src={logo} alt="AllugaLogo" width="90px" className={classes.image} />
                </Typography>
                <div className={classes.DivBar} />
                <div className={classes.grow} />
                {location.pathname == '/' && (
                    < div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>)}
            </Toolbar>
        </AppBar >
    )
}

export default Navbar