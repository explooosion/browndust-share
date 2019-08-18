import React, { Component } from 'react';
import './Header.scss';

import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import ReactFlagsSelect from 'react-flags-select';

import { setLocal } from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.t = props.t;
    this.state = {
      countries: props.settings.countries,
      customLabels: props.settings.customLabels,
      transDefault: props.settings.locale,
    }
  }

  onSelectFlag(countryCode) {
    this.dispatch(setLocal({ locale: countryCode }));
  }

  render() {
    return (
      <header id="header">
        <center style={{ position: 'relative' }}>
          <h1>BROWNDUST <small>{this.t('title')}</small></h1>
          <ReactFlagsSelect
            className='flag-select'
            defaultCountry={this.state.transDefault}
            countries={this.state.countries}
            customLabels={this.state.customLabels}
            selectedSize={30}
            showSelectedLabel={false}
            onSelect={(e) => this.onSelectFlag(e)}
          />
        </center>
      </header>
    );
  }
}

Header.propTypes = {}

const mapStateToProps = state => {
  return {
    settings: state.settings,
  }
}

export default withTranslation()(connect(mapStateToProps)(Header));
