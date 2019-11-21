import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//MUI 
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


export default class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <ToolBar className="nav-container">
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="login">Login</Button>
                    <Button color="inherit" component={Link} to="signup">Signup</Button>
                </ToolBar>
            </AppBar>
        )
    }
}

