import React, { Component } from 'react';
import './Formation.scss';

import { connect } from 'react-redux';

class Formation extends Component {
  render() {
    return (
      <div className='formation'>
        <div className='box ftype-1' data-id='a-1' draggable='true'></div>
        <div className='box ftype-2' data-id='a-2' draggable='true'></div>
        <div className='box ftype-3' data-id='a-3' draggable='true'></div>
        <div className='box ftype-4' data-id='a-4' draggable='true'></div>
        <div className='box' data-id='a-5' draggable='true'></div>
        <div className='box' data-id='a-6' draggable='true'></div>
      </div>
    );
  }
}

Formation.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(Formation);
