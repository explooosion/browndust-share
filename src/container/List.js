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

import Mercenary from '../components/Mercenary';

const override = css`
    display: block;
    margin: 20vh auto 0;
`;

class List extends Component {
  constructor(props) {
    super(props);
    this.props = props;
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
        { type: 1, style: 'attacker', label: t('attacker') },
        { type: 2, style: 'defender', label: t('defender') },
        { type: 3, style: 'magician', label: t('magician') },
        { type: 4, style: 'supporter', label: t('supporter') },
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


  getListBySearch = (search = '', characters) => {
    if (search === '') return characters;

    return characters.filter(c => {
      const { _charName, _charName_ENG, _charName_TW, _charName_JAP } = c;
      let match = false;
      switch (this.props.settings.locale) {
        case 'US': match = _charName_ENG.indexOf(search) > -1; break;
        case 'TW': match = _charName_TW.indexOf(search) > -1; break;
        case 'CN': match = _charName_TW.indexOf(search) > -1; break;
        case 'KR': match = _charName.indexOf(search) > -1; break;
        case 'JP': match = _charName_JAP.indexOf(search) > -1; break;
        default: match = true;
      }
      console.log(_charName_TW.indexOf(search), -1, search);
      return match;
    });
  }

  /**
   * Render charactor types
   */
  renderTypes() {
    return this.state.types.map(({ type, style, label }) =>
      (
        <button
          key={`type-${label}`}
          type='button'
          className={`type ${style} ${type === this.state.type ? 'active' : ''}`}
          onClick={() => this.setState({ type })}
        >
          <i></i>
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
      <div className='list'>
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
    settings: state.settings,
  }
}

export default withTranslation()(connect(mapStateToProps)(List));
