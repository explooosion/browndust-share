/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import './MobileAlert.scss';

import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { FaDesktop, FaHeart } from "react-icons/fa";

class MobileAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    }
    this.t = this.props.t;
  }

  render() {
    return (
      <div
        className={`m-alert ${this.state.checked ? 'checked' : ''}`}
        onClick={() => this.setState({ checked: true })}
      >
        <span>{this.t('browser-mobile-alert')}<FaHeart size='1.25rem' /><FaDesktop size='1.25rem' /></span>
      </div>
    );
  }
}

MobileAlert.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default withTranslation()(connect(mapStateToProps)(MobileAlert));
