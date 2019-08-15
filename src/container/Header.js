import React, { Component } from 'react';
import './Header.scss';

import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <header id="header">
        <center>
          <h1>BROWNDUST <small>棕色塵埃 × 陣型分享</small></h1>
        </center>
      </header>
    );
  }
}

Header.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(Header);
