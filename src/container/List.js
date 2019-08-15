/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import './List.scss';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Mercenary from '../components/Mercenary';

class List extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      type: 1,
    };
  }


  render() {
    return (
      <div className='list'>
        <div className='types'>
          <button type='button' className='type attacker active'><i></i><span>攻擊</span></button>
          <button type='button' className='type defender'><i></i><span>防禦</span></button>
          <button type='button' className='type magician'><i></i><span>魔法</span></button>
          <button type='button' className='type supporter'><i></i><span>支援</span></button>
        </div>
        <div className='content'>
          {
            this.props.characters
              .filter(c => c._type === String(this.state.type))
              .map((c, index) => <Mercenary key={index} params={c} />)
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
  }
}

export default connect(mapStateToProps)(List);
