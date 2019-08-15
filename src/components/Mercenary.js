import React, { Component } from 'react';
import './Mercenary.scss';

import { connect } from 'react-redux';

class Mercenary extends Component {
  render() {
    return (
      <div className="mercenary"></div>
    );
  }
}

Mercenary.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(Mercenary);
