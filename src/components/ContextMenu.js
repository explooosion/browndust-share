import React, { Component } from 'react';
import './ContextMenu.scss';

import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { FaBookMedical, FaTrash } from 'react-icons/fa';
import { Menu, Item, Separator, animation } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

import { updateDataset } from '../actions';

class RightMenu extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.dispatch = props.dispatch;
  }

  onAddLevel = ({ event }) => {
    const levelDialog = {
      ...this.props.dataset.levelDialog,
      show: true,
      left: event.clientX,
      top: event.clientY,
      id: event.target.id,
    }
    this.dispatch(updateDataset({ levelDialog }));
  };

  onClearAll = ({ event, props }) => {
    const formation = this.props.dataset.formation.map(f => f.id === event.target.id ? { ...f, level: 0 } : f);
    this.dispatch(updateDataset({ formation }));
  }

  render() {

    /**
     * API DOC
     * https://fkhadra.github.io/react-contexify/api/theme-and-animation
     */
    return (
      <Menu id='ctmenu' animation={animation.flip}>
        <Item onClick={this.onAddLevel}><FaBookMedical />Add Level</Item>
        <Separator />
        <Item onClick={this.onClearAll}><FaTrash />Clear All</Item>
        {
          /**
           * Sample Code
            <Separator />
            <Submenu label="Foobar">
              <Item onClick={this.onClick}>Foo</Item>
              <Item onClick={this.onClick}>Bar</Item>
            </Submenu>
           */
        }
      </Menu>
    );
  }
}

RightMenu.propTypes = {}

const mapStateToProps = state => {
  return {
    dataset: state.dataset,
  }
}

export default withTranslation()(connect(mapStateToProps)(RightMenu));
