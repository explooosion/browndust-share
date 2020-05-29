import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import ReactFlagsSelect from 'react-flags-select';
import styled from 'styled-components';

import { setLocal } from '../actions';

const Head = styled.header`

  font-size: 20px;

  @media only screen and (max-width: ${p => p.theme.screenXl}) {
    text-align: center;
  }

  center {
    position: relative;
  }

  .header-text {
    display: block;
    margin: 1rem 0;
    width: 600px;

    /* stylelint-disable */
    font-family: ${p => p.theme.enTitleFont};
    /* stylelint-enable */

    text-decoration: none;
    color: ${p => p.theme.warning};
    user-select: none;

    &:visited {
      color: ${p => p.theme.warning};
    }

    small {
      @media only screen and (max-width: ${p => p.theme.screenSm}) {
        display: none;
      }
    }
  }

  /* overwrite flag-select */
  .flag-select {
    position: absolute;
    top: 0;
    left: 10px;
    font-family: 'Fira Sans', Helvetica, Arial, sans-serif;
    color: #222;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .arrow-down {
      display: none;
      color: #fff;
    }

    .flag-options {
      max-height: none;
    }

    /* stylelint-disable-next-line */
    .flag-select__options {
      display: table;
    }
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.t = props.t;
  }

  onSelectFlag(countryCode) {
    this.dispatch(setLocal({ locale: countryCode }));
  }

  render() {
    const { locale, countries, customLabels } = this.props.settings;
    return (
      <Head>
        <center>
          <h1>
            <a href={process.env.REACT_APP_WEB_URL} className='header-text'>
              BROWNDUST <small>{this.t('title')}</small>
            </a>
          </h1>
          <ReactFlagsSelect
            className='flag-select'
            defaultCountry={locale}
            countries={countries}
            customLabels={customLabels}
            selectedSize={30}
            showSelectedLabel={false}
            onSelect={(e) => this.onSelectFlag(e)}
          />
        </center>
      </Head>
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
