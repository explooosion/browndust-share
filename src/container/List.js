import React, { Component } from 'react';
import './List.scss';

import { connect } from 'react-redux';

import Mercenary from '../components/Mercenary';

class List extends Component {
  render() {
    return (
      <div className="list">
        <div className="types">
          <button type="button" className="type attacker active"><i></i><span>攻擊</span></button>
          <button type="button" className="type defender"><i></i><span>防禦</span></button>
          <button type="button" className="type magician"><i></i><span>魔法</span></button>
          <button type="button" className="type supporter"><i></i><span>支援</span></button>
        </div>
        <div className="content">
          <Mercenary />
          <Mercenary />
          <Mercenary />
          <Mercenary />
        </div>
      </div>
    );
  }
}

List.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(List);
