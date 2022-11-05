import './App.css';
import Sidenav from './components/Sidenav/Sidenav';
import { Route, Switch, Redirect} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import ErrorComponent from './components/Error/ErrorComponent';
import React from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
//import { withRouter } from 'react-router-dom';
import { initApp } from './redux/reducers/app.reducer';
import { Provider } from 'react-redux';
import store from './redux/store';
import { withLazyLoad } from './hoc/withLazyLoad';

//lazy-loading components
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class Wrapper extends React.Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <BrowserRouter>
        <div className="wrapper">
          <div className="header">
            <HeaderContainer />
          </div>
          <div className="sidenav">
            <Sidenav />
          </div>
          <div className="content">
            <Switch>
              <Route exact path='/' render={() => <Redirect to={"/profile"} />} />
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/dialogs' render={withLazyLoad(DialogsContainer)} />
              <Route path='/users' render={withLazyLoad(UsersContainer)} />
              <Route path='/news' component={News} />
              <Route path='/music' component={Music} />
              <Route path='/settings' component={Settings} />
              <Route path='/login' component={Login} />
              <Route path='*' component={ErrorComponent} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }

}

const mapStateToProps = (state) => ({
  initialized: state.app.isInitialized
})

const WrapperContainer = compose(
  // withRouter,
  connect(mapStateToProps, { initApp })
)(Wrapper);

const App = () => {
  return <React.StrictMode>
    <Provider store={store}>
      <WrapperContainer />
    </Provider>
  </React.StrictMode>
}

export default App;

