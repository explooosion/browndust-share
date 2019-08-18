import React, { Component } from 'react';
import './App.scss';

import { HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './container/Header';
import Formation from './container/Formation';
import List from './container/List';
import Toolbar from './container/Toolbar';

import { setCharacters, updateDataset } from './actions';
import { getCharacters } from './service/Characters';
import { initialFormation } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {};
  }

  componentDidMount() {
    getCharacters()
      .then(data => this.dispatch(setCharacters(data)))
      .then(data => this.dispatch(updateDataset({ formation: initialFormation(this.formation, this.characters) })));
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log(props.characters);
  //   return state;
  // }

  render() {
    this.formation = this.props.dataset.formation;
    this.characters = this.props.characters;
    return (
      <HashRouter>
        <div id='wrapper'>
          <Header />
          <section id='container'>
            <div className='main'>
              <Formation />
              <Toolbar />
            </div>
            <List />
          </section>
        </div>
      </HashRouter>
    );
  }
}

App.propTypes = {}

const mapStateToProps = state => {
  return {
    characters: state.characters,
    dataset: state.dataset,
  }
}

export default connect(mapStateToProps)(App);
