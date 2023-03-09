import React, { useState, useContext } from "react";
import { AppBar, Toolbar, IconButton, Badge, Typography, Menu, MenuItem } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Person  from "@mui/icons-material/Person";
import logo from "../../Assets/logo1.png";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import {signOut} from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'

const Navbar = ({ totalItems }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();     
    const [setError] = useState(false);
    // eslint-disable-next-line
    const {user, dispatch} = useContext(AuthContext);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = (user) => {
        signOut(auth).then(() => {
          dispatch({type: "LOGOUT", payload: user})
          navigate('/');
        })
        .catch((error) => {
            console.log(error)
            setError(error);
          })
      };
      
      function MenuSignOut (){
        handleMenuClose();
        handleSignOut();
      }
      
    return (
        
        <AppBar position="fixed" class="appBar" color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" class="al-logo" color="inherit">
                    <img src={logo} alt="AllugaLogo" class="imagelogo"/>
                </Typography>
                <div class="grow" />
                {(location.pathname === '/') && auth.currentUser ? (
                    <div class="buttonhm">
                        <IconButton
                            aria-label="Show cart items"
                            color="inherit"
                            component={Link}
                            to="/Carrinho"
                        >
                            <Badge badgeContent={totalItems} class="badge" color="success" >
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
                            <MenuItem component={Link} to="/MeusDados" onClick={handleMenuClose}>
                                Meus Dados
                            </MenuItem>
                            <MenuItem onClick={MenuSignOut}>
                               Sair da Conta
                            </MenuItem>
                        </Menu>
                    </div>
                ) : (location.pathname === '/') && (
                    <div class="buttonhm">
                        <IconButton
                            aria-label="Show cart items"
                            color="inherit"
                            component={Link}
                            to="/Carrinho"
                        >
                            <Badge badgeContent={totalItems} class="badge" color="success" >
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
                            <MenuItem component={Link} to="/Login" onClick={handleMenuClose}>
                               Login
                            </MenuItem>
                            <MenuItem component={Link} to="/CriarConta" onClick={handleMenuClose}>
                               Criar Conta
                            </MenuItem>
                        </Menu>
                    </div>
                )}
                {(location.pathname === '/Carrinho') && (
                    <div class="buttonhm">
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
                            <MenuItem component={Link} to="/MeusDados" onClick={handleMenuClose}>
                                Meus Dados
                            </MenuItem>
                            <MenuItem onClick={MenuSignOut}>
                               Sair da Conta
                            </MenuItem>
                        </Menu>
                    </div>
                )}
                {(location.pathname === '/MeusDados') && (
                    <div class="buttonhm">
                        <IconButton
                            aria-label="Show cart items"
                            color="inherit"
                            component={Link}
                            to="/Carrinho"
                        >
                            <Badge badgeContent={totalItems} class="badge" color="success">
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