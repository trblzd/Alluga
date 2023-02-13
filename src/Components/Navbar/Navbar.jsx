import React from "react";
import { AppBar, Toolbar, IconButton, Badge, Typography } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Person  from "@mui/icons-material/Person";
import logo from "../../Assets/logo1.png";
import { Link, useLocation } from "react-router-dom";
import"./Styles.css";

const Navbar = ({ totalItems }) => {
    const location = useLocation();
    return (
        <AppBar position="fixed" class="appBar" color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" class="title" color="inherit">
                    <img src={logo} alt="AllugaLogo" width="90px" class="image" />
                </Typography>
                <div class="grow" />
                {location.pathname === "/" && (
                    <div class="button">

                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton> 
                        <IconButton component={Link} to="/signup" aria-label="Sign Up" color="inherit">
                            <Person/>
                        </IconButton>
                    </div>)}
            </Toolbar>
        </AppBar >
    )
}

export default Navbar