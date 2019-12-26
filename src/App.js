import React, { Component } from 'react';
import './App.scss';

import { HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SnowEffect from 'react-snow-effect';
import {
  // BrowserView,
  // MobileView,
  // isBrowser,
  isMobile,
  isEdge,
  isIE,
} from "react-device-detect";

import Header from './container/Header';
import Formation from './container/Formation';
import List from './container/List';
import Toolbar from './container/Toolbar';
import Footer from './container/Footer';

import NotSupport from './container/BrowserCheck/NotSupport';
import MobileAlert from './container/BrowserCheck/MobileAlert';

import { setCharacters, setCharactersGlobal, updateDataset } from './actions';
import { getCharacters, getCharactersGlobal } from './service/Characters';
import { initialFormation } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {};
  }

  async componentDidMount() {
    await getCharactersGlobal()
      .then(data => this.dispatch(setCharactersGlobal(data)));
    await getCharacters()
      .then(data => this.dispatch(setCharacters(data)))
      .then(() => this.dispatch(updateDataset({ formation: initialFormation(this.formation, this.characters) })));
  }

  render() {
    this.formation = this.props.dataset.formation;
    this.characters = this.props.characters;
    this.locale = this.props.settings.locale;

    if (isEdge || isIE) return <NotSupport />;

    return (
      <HashRouter>
        <div id='wrapper' data-locale={this.locale}>
          {isMobile ? null : <SnowEffect />}
          {isMobile ? <MobileAlert /> : null}
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
    charactersGlobal: state.charactersGlobal,
    dataset: state.dataset,
    settings: state.settings,
  }
}

export default connect(mapStateToProps)(App);
