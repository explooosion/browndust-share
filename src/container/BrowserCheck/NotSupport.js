/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import './NotSupport.scss';

class NotSupport extends Component {
  render() {
    return (
      <div className='notsupport'>
        <h1>Your Browser Is Not Supported.</h1>
        <h1> Please Download:</h1>
        <h1>
          <a href='https://www.google.com/intl/En/chrome/' target='blank'>Chrome</a>
          /
          <a href='https://www.opera.com' target='blank'>Opera</a>
          /
          <a href='https://www.mozilla.org' target='blank'>Firefox</a>
        </h1>
      </div>
    );
  }
}

NotSupport.propTypes = {}


export default NotSupport;
