import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Badge, Typography, Menu, MenuItem } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Person  from "@mui/icons-material/Person";
import logo from "../../Assets/logo1.png";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import {signOut } from "firebase/auth";
import { auth } from '../../firebase';

const Navbar = ({ totalItems, product }) => {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
        })  
    .catch((error) => {
    console.log(error)
    });
    }
    function MenuSignOut (){
        handleSignOut();
        handleMenuClose();
    }


    return (
        <AppBar position="fixed" class="appBar" color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" class="title" color="inherit">
                    <img src={logo} alt="AllugaLogo" width="90px" class="imagelogo"/>
                </Typography>
                <div class="grow" />
                {(location.pathname === '/' || location.pathname.startsWith('/product-view/')) && (
                    <div class="button">
                        <IconButton
                            aria-label="Show cart items"
                            color="inherit"
                            component={Link}
                            to="/Carrinho"
                        >
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        <IconButton
                            aria-label="Sign Up"
                            color="inherit"
                            onClick={handleMenuOpen}
                        >
                            <Person />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem component={Link} to="/Perfil" onClick={handleMenuClose}>
                                Perfil
                            </MenuItem>
                            <MenuItem onClick={MenuSignOut}>
                               Sair da Conta
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
