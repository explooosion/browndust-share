/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import './Mercenary.scss';

import { connect } from 'react-redux';

class Mercenary extends Component {
  render() {
    const { _uiIconImageName, _charName_TW } = this.props.params;
    const id = _uiIconImageName.split('*')[1];
    const URL = `https://ic-common.pmang.cloud/static/bdt_book/thumbnail/${id}.png`;
    return (
      <div className='mercenary' style={{ backgroundImage: `url(${URL})` }} data-tooltip={_charName_TW}></div>
    );
  }
}

Mercenary.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(Mercenary);
