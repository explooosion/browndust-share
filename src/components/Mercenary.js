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
   * DrageStart Event
   * sid source position id
   * scode source position image code
   */
  onDragStart = (ev, scode, sid) => {
    ev.dataTransfer.setData('scode', scode);
    ev.dataTransfer.setData('sid', sid);
  }

  getCharNameByLocale = (locale) => {
    const { _charName, _charName_ENG, _charName_TW } = this.props.params;
    switch (locale) {
      case 'US': return _charName_ENG;
      case 'TW': return _charName_TW;
      case 'CN': return _charName_TW;
      case 'KR': return _charName;
      default: return _charName_ENG;
    }
  }

  render() {
    const { _uiIconImageName, _code } = this.props.params;
    const URL = getThumbnailUrlByImageName(_uiIconImageName);
    return (
      <div
        className='mercenary'
        style={{ backgroundImage: `url(${URL})` }}
        data-tooltip={this.getCharNameByLocale(this.props.settings.locale)}
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
    settings: state.settings,
  }
}

export default connect(mapStateToProps)(Mercenary);
