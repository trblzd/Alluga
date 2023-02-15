import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Badge, Typography, Menu, MenuItem } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Person  from "@mui/icons-material/Person";
import logo from "../../Assets/logo1.png";
import { Link, useLocation } from "react-router-dom";
import "./Styles.css";

const Navbar = ({ totalItems }) => {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="fixed" class="appBar" color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" class="title" color="inherit">
                    <img src={logo} alt="AllugaLogo" width="90px" class="image" />
                </Typography>
                <div class="grow" />
                {location.pathname === "/" && (
                    <div class="button">
                        <IconButton
                            aria-label="Show cart items"
                            color="inherit"
                            component={Link}
                            to="/cart"
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
                            <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
                                Criar Conta
                            </MenuItem>
                            <MenuItem component={Link} to="/signin" onClick={handleMenuClose}>
                                Logar
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
