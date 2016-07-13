import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';

class Home extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="home" />
        <div> Welcome to Outing App </div>
      </div>
    );
  }
}

export default Home;
