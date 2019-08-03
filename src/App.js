import React, { Component } from 'react';
import FSItems from './components/FSItems/FSItems';
import Loader from './components/Loader/Loader';
import GoUp from './components/GoUp/GoUp';
import { connect } from 'react-redux';
import './App.css';
import { parseQueryString } from './utils/utils';

const clientId = '0e08cd89ac3a4aba9b9711ab3b4136fc';

class App extends Component {
  constructor () {
    super();
    let token;
    if (window.location.hash) {
      token = parseQueryString(window.location.hash.substring(1)).access_token;
      if (token) {
        localStorage.setItem('accessToken', token);
        window.history.replaceState({}, '', '/');
        return;
      }
    }
    token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.replace(`https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}`);
    }
  }
  getLoader() {
    return this.props.loading ? <Loader /> : null;
  }
  isTokenAvailable() {
    return localStorage.getItem('accessToken');
  }
  render() {
    if (!this.isTokenAvailable()) return null;
    return (
      <div>
        {this.getLoader()}
        <GoUp />
        <FSItems />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.root.loading
})

export default connect(mapStateToProps)(App);
