import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';
//MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Navbar from './components/Navbar';
import themeFile from './utils/theme';
import AuthRoute from './utils/AuthRoute';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar/>
          <div className="container">
          <Switch>
            <AuthRoute exact path="/" component={Home} />
            <AuthRoute path="/signup" component={Signup} />
            <AuthRoute path="/login" component={Login} />
          </Switch>
          </div>
        </Router>
        </Provider>
    </MuiThemeProvider>
  );
}

export default App;
