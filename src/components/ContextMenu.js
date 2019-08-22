import React, { Component } from 'react';
import './ContextMenu.scss';

import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { FaBookMedical, FaTrash } from "react-icons/fa";
import { IoIosPhotos } from "react-icons/io";
import { Menu, Item, Separator, Submenu, animation } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

import { updateDataset } from '../actions';

class RightMenu extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.dispatch = props.dispatch;
  }

  onClick = ({ event, props }) => {
    const levelDialog = {
      ... this.props.dataset.levelDialog,
      show: true,
      left: event.clientX,
      top: event.clientY,
      id: event.target.id,
    }
    this.dispatch(updateDataset({ levelDialog }));
  };

  render() {

    /**
     * API DOC
     * https://fkhadra.github.io/react-contexify/api/theme-and-animation
     */
    return (
      <Menu id='ctmenu' animation={animation.flip}>
        <Item onClick={this.onClick}><FaBookMedical />Add Level</Item>
        <Item onClick={this.onClick}><IoIosPhotos />Add Mask</Item>
        <Separator />
        <Item onClick={this.onClick}><FaTrash />Clear All</Item>
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
