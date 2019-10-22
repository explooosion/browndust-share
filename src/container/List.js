/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import './List.scss';

import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'pretty-checkbox-react';
import { FaStar } from "react-icons/fa";
import { css } from '@emotion/core';
import HashLoader from 'react-spinners/HashLoader';
import { sify } from 'chinese-conv';

import Mercenary from '../components/Mercenary';
import { getIconUrlByTypeId } from '../utils';
import { updateDataset } from '../actions';

const override = css`
    display: block;
    margin: 20vh auto 0;
`;

class List extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.dispatch = props.dispatch;
    this.t = props.t;
    this.state = {
      search: '',
      type: 1,
      stars: [
        { label: '5', checked: true, star: 5 },
        { label: '4', checked: true, star: 4 },
        { label: '3', checked: false, star: 3 },
        { label: this.t('normal'), checked: false, star: 2 },
      ],
      nameOptions: [
        { label: this.t('show'), checked: true },
        { label: this.t('bold'), checked: false },
      ],
    };
  }

  static getDerivedStateFromProps({ t }, state) {
    let stars = [];
    let nameOptions = [];

    stars = state.stars;
    stars[3].label = t('normal');

    nameOptions = state.nameOptions;
    nameOptions[0].label = t('show');
    nameOptions[1].label = t('bold');

    return {
      ...state,
      types: [
        { type: 1, label: t('attacker') },
        { type: 2, label: t('defender') },
        { type: 3, label: t('magician') },
        { type: 4, label: t('supporter') },
      ],
      stars,
      nameOptions,
    }
  }

  onStarChange = (_label) => {
    const stars = this.state.stars;
    const star = stars.find(({ label }) => label === _label);
    star.checked = !star.checked;
    this.setState({ stars });
  }

  onNameOptionsChange = (_label) => {
    const nameOptions = this.state.nameOptions.map(n =>
      (n.label === _label) ? { ...n, checked: !n.checked } : n
    );
    this.setState({ nameOptions });
  }

  onRemoveByDrop = (ev) => {
    const sid = ev.dataTransfer.getData('sid');
    if (sid === '0') return;
    const formation = this.props.dataset.formation.map((f) => {
      return sid !== f.id
        ? f
        : { ...f, type: 0, backgroundImage: null, uniqueCode: 0, dragOver: false, queue: 0, level: 0 };
    });
    this.dispatch(updateDataset({ formation }))
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  getListBySearch = (search = '', characters) => {
    if (search === '') return characters;

    return this.props.charactersGlobal.filter(c => {
      const { _charName, _charName_ENG, _charName_TW, _charName_JAP } = c;
      let match = false;
      console.log(search, _charName_TW, _charName_TW.indexOf(search))
      switch (this.props.settings.locale) {
        case 'US': match = _charName_ENG.indexOf(search) > -1; break;
        case 'TW': match = _charName_TW.indexOf(search) > -1 || sify(_charName_TW).indexOf(search) > -1; break;
        case 'CN': match = _charName_TW.indexOf(search) > -1 || sify(_charName_TW).indexOf(search) > -1; break;
        case 'KR': match = _charName.indexOf(search) > -1; break;
        case 'JP': match = _charName_JAP.indexOf(search) > -1; break;
        default: match = true;
      }
      return match;
    });
  }

  /**
   * Render charactor types
   */
  renderTypes() {
    return this.state.types.map(({ type, label }) =>
      (
        <button
          key={`type-${label}`}
          type='button'
          className={`type  ${type === this.state.type ? 'active' : ''}`}
          onClick={() => this.setState({ type })}
        >
          <i style={{ backgroundImage: getIconUrlByTypeId(type) }}></i>
          <span>{label}</span>
        </button>
      ));
  }

  /**
   * Render stars filter
   */
  renderFilterStars() {
    return this.state.stars.map(({ label, checked }, index) =>
      (
        <Checkbox
          key={`start-${index}`}
          shape='round'
          color='info'
          animation='jelly'
          icon={<i className="mdi mdi-check" />}
          checked={checked}
          onChange={() => this.onStarChange(label)}
        >
          {label}
        </Checkbox>
      ));
  }

  /**
   * Render names filter
   */
  renderFilterNameOptions() {
    return this.state.nameOptions.map(({ label, checked }, index) => (
      <Checkbox
        key={`name-${index}`}
        shape='round'
        color='info'
        animation='jelly'
        icon={<i className="mdi mdi-check" />}
        checked={checked}
        onChange={() => this.onNameOptionsChange(label)}
      >
        {label}
      </Checkbox>
    ));
  }

  /**
   * Render lists
   */
  renderCharacters(characters) {
    return this.getListBySearch(this.state.search, characters)
      .filter(({ _type, _growType, _star }) => {
        return (
          Number(_type) === this.state.type &&
          Number(_growType) >= 0 &&
          (
            this.state.stars[0].checked && Number(_star) === 5 ||
            this.state.stars[1].checked && Number(_star) === 4 ||
            this.state.stars[2].checked && Number(_star) === 3 ||
            this.state.stars[3].checked && Number(_star) === 2 ||
            this.state.stars[3].checked && Number(_star) === 1
          )
        )
      })
      .map((c, index) => (
        <Mercenary
          key={`mercenary-${index}`}
          params={c}
          nameOptions={this.state.nameOptions}
        />
      ))
  }

  render() {
    const characters = this.props.characters;
    return (
      <div
        className='list'
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => this.onRemoveByDrop(e)}
      >
        <div className='types'>
          {this.renderTypes()}
        </div>
        <div className='filter'>
          <div className='star'>
            <span className='filter-title'><FaStar /> {this.t('star')}：</span>
            {this.renderFilterStars()}
          </div>
          <div className='name'>
            <span className='filter-title'>{this.t('name')}：</span>
            {this.renderFilterNameOptions()}
          </div>
        </div>
        <div className='search'>
          <input
            className='search-text'
            type='text'
            placeholder={this.t('search')}
            value={this.state.search}
            onChange={(e) => this.setState({ search: e.target.value })}
          />
        </div>

        <div className='content'>
          {
            characters.length === 0 ? (
              <HashLoader
                css={override}
                color={'#5ac0de'}
                size={100}
              />
            ) : this.renderCharacters(characters)
          }
        </div>
      </div>
    );
  }
}

List.propTypes = {
  characters: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
  return {
    characters: state.characters,
    charactersGlobal: state.charactersGlobal,
    dataset: state.dataset,
    settings: state.settings,
  }
}

export default withTranslation()(connect(mapStateToProps)(List));
