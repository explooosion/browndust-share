import React, { Component } from 'react';
import './App.scss';

import { HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './container/Header';
import Formation from './container/Formation';
import List from './container/List';
import Toolbar from './container/Toolbar';
import Footer from './container/Footer';

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
      .then(() => this.dispatch(updateDataset({ formation: initialFormation(this.formation, this.characters) })));
  }

  render() {
    this.formation = this.props.dataset.formation;
    this.characters = this.props.characters;
    return (
      <HashRouter>
        <div id='wrapper'>
          <Header />
          <section id='container'>
            <main className='main'>
              <Formation />
              <Toolbar />
              <Footer />
            </main>
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
