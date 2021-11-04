import React, { Component, Fragment } from 'react'
import store from './store'
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Mainpage from './components/Pages/Mainpage/Mainpage';
import Error404 from './components/Pages/StatusErrorPages/Error404';
import { loadProfile, loadUser } from './actions/auth';
import Loginpage from './components/users/Loginpage';
import  Registerpage  from './components/users/Registerpage';
import AuthReqRoute from './components/common/AuthReqRoute';
import Navbar from './components/common/Navbar';
import DashboardPage from './components/Pages/Expense/DashboardPage';
import Walletpage from './components/Pages/Expense/Walletpage';
import Profile from './components/users/Profile';

import { Provider as AlertProvider } from 'react-alert';
import  AlertTemplate from '../node_modules/react-alert-template-basic';
import  Alerts from './components/common/Alert';

const alertOptions = {
  timeout: 5000,
  position : "top right"
}

export class App extends Component {
  async componentDidMount(){
    await store.dispatch(loadUser());
    await store.dispatch(loadProfile());
  }


  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <Switch>
                <Route path="/login" component={Loginpage}></Route>
                <Route path="/register" component={Registerpage}></Route>
                <Route path="/createProfile" component={Profile}></Route>

                <Route exact path='/' component={Mainpage}></Route>

                <Fragment>
                  <Navbar />
                  <div className="main">
                    <AuthReqRoute exact path='/dashboard' component={DashboardPage}></AuthReqRoute>
                    <AuthReqRoute exact path='/home' component={Walletpage}></AuthReqRoute>

                  </div>
                </Fragment>

                <Route path='*' exact={true} component={Error404} />
                
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    )
  }
}

export default App
