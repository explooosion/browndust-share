/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import './Footer.scss';

import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { FaGithub } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";

class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <a className='footer-item' alt='github' title='github' href='https://github.com/explooosion/browndust-share' target='_blank' rel="noopener noreferrer"><FaGithub size='2em' /></a>
        <a className='footer-item' alt='issue' title='issue' href='https://github.com/explooosion/browndust-share/issues' target='_blank' rel="noopener noreferrer"><GoIssueOpened size='2.3em' /></a>
      </footer>
    );
  }
}

Footer.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default withTranslation()(connect(mapStateToProps)(Footer));
