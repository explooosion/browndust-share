import React, { Component } from 'react';
import './App.scss';

// import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './container/Header';
import Formation from './container/Formation';
import List from './container/List';

class App extends Component {
  render() {
    this.database = this.props.database;
    this.users = this.props.users;
    return (
      <div id="wrapper">
        <Header />
        <section id="container">
          <Formation />
          <List />
        </section>
      </div>
    );
  }
}

App.propTypes = {}

const mapStateToProps = state => {
  return {
    // database: state.database,
    // users: state.users,
  }
}

export default connect(mapStateToProps)(App);
