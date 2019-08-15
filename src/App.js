import React, { Component } from 'react';
import './App.scss';

// import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './container/Header';
import Formation from './container/Formation';
import List from './container/List';

import { setCharacters } from './actions';
import { getCharacters } from './service/Characters';

class App extends Component {
  constructor(props) {
    super();
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
    getCharacters().then(data => this.dispatch(setCharacters(data)));
  }

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
    characters: state.characters,
  }
}

export default connect(mapStateToProps)(App);
