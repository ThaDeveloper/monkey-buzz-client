import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
let authenticated;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
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
            <AuthRoute path="/signup" component={Signup} authenticated={authenticated}/>
            <AuthRoute path="/login" component={Login} authenticated={authenticated}/>
          </Switch>
          </div>
        </Router>
        </Provider>
    </MuiThemeProvider>
  );
}

export default App;
