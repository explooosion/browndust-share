/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import './Mercenary.scss';

import { connect } from 'react-redux';

import { set } from '../service/Session';
import { getThumbnailUrlByImageName } from '../utils';

class Mercenary extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
    }
  }

  /**
   * sid source position id
   * scode source position image code
   */
  onDragStart = (ev, scode, sid) => {
    ev.dataTransfer.setData('scode', scode);
    ev.dataTransfer.setData('sid', sid);
  }

  render() {
    const { _uiIconImageName, _charName_TW, _code } = this.props.params;
    const URL = getThumbnailUrlByImageName(_uiIconImageName);
    return (
      <div
        className='mercenary'
        style={{ backgroundImage: `url(${URL})` }}
        data-tooltip={_charName_TW}
        draggable
        onClick={() => set('_code', _code)}
        onDragStart={(e) => this.onDragStart(e, _code, 0)}
      >
      </div>
    );
  }
}

Mercenary.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(Mercenary);
