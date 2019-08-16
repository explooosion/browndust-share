/* eslint-disable no-underscore-dangle */
/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import './List.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'pretty-checkbox-react';
import { FaStar, FaEye } from "react-icons/fa";

import Mercenary from '../components/Mercenary';

class List extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      type: 1,
      types: [
        { type: 1, style: 'attacker', label: '攻擊' },
        { type: 2, style: 'defender', label: '防禦' },
        { type: 3, style: 'magician', label: '魔法' },
        { type: 4, style: 'supporter', label: '支援' },
      ],
      stars: [
        { label: '5星', checked: true, star: 5 },
        { label: '4星', checked: true, star: 4 },
        { label: '3星', checked: false, star: 3 },
        { label: '一般', checked: false, star: 2 },
      ],
      nameOptions: [
        { label: '顯示', checked: true },
        { label: '粗體', checked: false },
      ],
    };
  }

  onStarChange = (_label) => {
    const stars = this.state.stars;
    const star = stars.find(({ label }) => label === _label);
    star.checked = !star.checked;
    this.setState({ stars });
  }

  onNameOptionsChange = (_label) => {
    const nameOptions = this.state.nameOptions;
    const nameOption = nameOptions.find(({ label }) => label === _label);
    nameOption.checked = !nameOption.checked;
    this.setState({ nameOptions });
  }

  /**
   * 渲染傭兵類型
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
   * 渲染傭兵星級篩選功能
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
   * 渲染傭兵名稱呈現功能
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
   * 渲染傭兵列表
   */
  renderCharacters() {
    return this.props.characters
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
    return (
      <div className='list'>
        <div className='types'>
          {this.renderTypes()}
        </div>
        <div className='filter'>
          <div className='star'>
            <span className='filter-title'><FaStar /> 星級：</span>
            {this.renderFilterStars()}
          </div>
          <div className='name'>
            <span className='filter-title'><FaEye /> 名稱：</span>
            {this.renderFilterNameOptions()}
          </div>
        </div>

        <div className={`content
          ${this.state.nameOptions[0].checked ? 'show' : ''} 
          ${this.state.nameOptions[1].checked ? 'bold' : ''}
          `}
        >
          {this.renderCharacters()}
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
  }
}

export default connect(mapStateToProps)(List);
