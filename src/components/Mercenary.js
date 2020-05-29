/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import './Mercenary.scss';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { sify } from 'chinese-conv';

import { getThumbnailUrlByImageName } from '../utils';
import { bookDetailUrl } from '../config/api';
import { updateDataset } from '../actions';

class Mercenary extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.props = props;
  }

  /**
   * DrageStart Event
   * sid source position id
   * suCode source position image uniqueueCode
   */
  onDragStart = (ev, suCode, sid) => {
    ev.dataTransfer.setData('suCode', suCode);
    ev.dataTransfer.setData('sid', sid);
  }

  onDoubleClick = (_uniqueCode) => {
    window.open(bookDetailUrl + _uniqueCode, '_blank');
  }

  onClickSetCode = (_uniqueCode) => {
    const mercenarySelected = this.props.dataset.mercenarySelected === _uniqueCode ? null : _uniqueCode;
    this.dispatch(updateDataset({ mercenarySelected }));
  }

  getCharNameByLocale = (locale = 'US', params = null) => {
    if (_.isNull(params)) return;

    const {
      _uniqueCode,

      _charName,
      _charName_ENG,
      _charName_TW,
      _charName_JAP,
      _charName_SPA,
      _charName_GER,
      _charName_TH,
    } = params;

    let name = '';
    switch (locale) {
      case 'US': name = _charName_ENG; break;
      case 'ES': name = _charName_SPA; break;
      case 'DE': name = _charName_GER; break;
      case 'TW': name = _charName_TW; break;
      case 'CN': name = sify(_charName_TW); break;
      case 'JP': name = _charName_JAP; break;
      case 'KR': name = _charName; break;
      case 'TH': name = _charName_TH; break;
      default:
        console.warn('can not find character by locale.')
        name = _charName_ENG;
        break;
    }
    // check the name is empty
    if (!_.isEmpty(name)) return name;
    // if empty return korea name, but global api is faild..
    if (_.isUndefined(this.props.charactersGlobal)) return _charName;
    // if empty return korea name
    const cGlobal = this.props.charactersGlobal.find(c => c._uniqueCode === _uniqueCode);
    if (_.isUndefined(cGlobal)) return _charName;
    switch (locale) {
      case 'US': name = cGlobal._charName_ENG; break;
      case 'TW': name = cGlobal._charName_TW; break;
      case 'CN': name = sify(cGlobal._charName_TW); break;
      case 'KR': name = cGlobal._charName; break;
      case 'JP': name = cGlobal._charName_JAP; break;
      default: name = cGlobal._charName_ENG; break;
    }
    return _.isEmpty(name) ? cGlobal._charName : name;
  }

  render() {
    const { _uiIconImageName, _uniqueCode } = this.props.params;
    const formation = this.props.dataset.formation;
    const { mercenarySelected } = this.props.dataset;
    const nops = this.props.nameOptions.map(n => n.checked);
    const URL = getThumbnailUrlByImageName(_uiIconImageName);
    const opacity = _.isUndefined(formation.find(f => f.uniqueCode === _uniqueCode))
      ? 1 : 0.2;

    return (
      <div
        className={`mercenary ${nops[0] ? 'show' : ''} ${nops[1] ? 'bold' : ''} ${mercenarySelected === _uniqueCode && opacity === 1 ? 'selected' : ''}`}
        style={{ backgroundImage: `url(${URL})`, opacity }}
        data-tooltip={this.getCharNameByLocale(this.props.settings.locale, this.props.params)}
        draggable
        onClick={() => this.onClickSetCode(_uniqueCode)}
        onDragStart={(e) => this.onDragStart(e, _uniqueCode, 0)}
        onDoubleClick={() => this.onDoubleClick(_uniqueCode)}
      >
      </div>
    );
  }
}

Mercenary.propTypes = {
  nameOptions: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    dataset: state.dataset,
    charactersGlobal: state.charactersGlobal,
  }
}

export default connect(mapStateToProps)(Mercenary);
