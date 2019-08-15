/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import './Mercenary.scss';

import { connect } from 'react-redux';

class Mercenary extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = { ...this.props.params };
  }

  render() {
    const id = String(this.state._uiIconImageName).split('*')[1];
    const URL = `https://ic-common.pmang.cloud/static/bdt_book/thumbnail/${id}.png`;

    return (
      <div className='mercenary' style={{ backgroundImage: `url(${URL})` }}></div>
    );
  }
}

Mercenary.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(Mercenary);
