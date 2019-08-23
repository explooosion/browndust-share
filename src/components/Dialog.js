import React, { Component } from 'react';
import './Dialog.scss';

import propTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateDataset } from '../actions';

class Dialog extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.dispatch = props.dispatch;
    this.state = {};
  }

  static getDerivedStateFromProps({ dataset, id }, state) {
    if (_.isNull(id) || !_.isUndefined(state.level)) return state;
    const formation = dataset.formation.find(f => f.id === id);
    const level = _.isUndefined(formation) ? 0 : formation.level;
    return { ...state, level }
  }

  onLevelClick(id) {
    if (_.isUndefined(id) || this.state.level > 15 || this.state.level < 0) return;
    const formation = this.props.dataset.formation
      .map(f => f.id === id ? { ...f, level: this.state.level } : f);

    const levelDialog = {
      show: false,
      id: null,
      left: 0,
      top: 0,
    };
    this.dispatch(updateDataset({ formation, levelDialog }));
  }

  renderLevelDialog(id = null) {
    return (
      <div className='dialog-level'>
        <h3>Level</h3>
        <hr />
        <input
          type='number'
          min={0}
          max={15}
          value={this.state.level}
          onChange={(e) => this.setState({ level: e.target.value })}
          onKeyPress={({ charCode }) => charCode === 13 ? this.onLevelClick(id) : null}
          onFocus={(e) => e.target.select()}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
        <button type='button' onClick={() => this.onLevelClick(id)}>OK</button>
      </div>
    );
  }

  renderMask(id) {
    return null;
  }

  render() {
    const { id, left, top, mode } = this.props;
    let renderTemplate = null;
    switch (mode) {
      case 'level': renderTemplate = this.renderLevelDialog(id); break;
      case 'mask': renderTemplate = this.renderMask(id); break;
      default: renderTemplate = null;
    }
    return (
      <div id='dialog' style={{ left, top: `${top + -60}px` }}>
        {renderTemplate}
      </div>
    );
  }
}

Dialog.propTypes = {
  top: propTypes.number.isRequired,
  left: propTypes.number.isRequired,
  mode: propTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    dataset: state.dataset,
  }
}

export default withTranslation()(connect(mapStateToProps)(Dialog));
