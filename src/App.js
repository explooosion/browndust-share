import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { HashRouter } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import SnowEffect from 'react-snow-effect';
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
import { getCharacters, getCharactersGlobal } from './services/Characters';
import { initialFormation } from './utils';

const Main = styled.main`

  padding-bottom: 3rem;

  &[data-locale='ES'] {
    .tool.tool-queue {
      width: 120px;
    }

    .tool {
      width: 140px;
    }
  }

  &[data-locale='DE'] {
    .tool.tool-queue,
    .tool.tool-download {
      width: 160px;
    }

    .tool.tool-reset {
      width: 100px;
    }

    .tool {
      width: 150px;
    }
  }

  &[data-locale='JP'] {
    font-family: 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro','Segoe UI', Helvetica, Arial, sans-serif;

    .tool.tool-queue {
      width: 140px;
    }

    .tool {
      width: 160px;

      span {
        font-size: 14px;
      }
    }
  }

  &[data-locale='KR'] {
    font-family: 'Helvetica Neue', 'Apple SD Gothic Neo', 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  &[data-locale='TH'] {
    .tool.tool-queue {
      width: 150px;
    }

    .tool {
      width: 140px;

      span {
        font-size: 14px;
      }
    }
  }

  #container {
    margin: 0 auto;
    width: 1550px;

    @media only screen and (max-width: ${p => p.theme.screenXl}) {
      width: 100%;
    }

    .main {
      position: relative;
      float: left;
      margin: 0 .2rem 0 1rem;
      width: 700px;

      @media only screen and (max-width: ${p => p.theme.screenXl}) {
        float: none;
        margin: 0 auto;
      }
    }
  }
`;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { formation, locale } = useSelector(state => ({
    characters: state.characters,
    // charactersGlobal: state.charactersGlobal,
    formation: state.dataset.formation,
    locale: state.settings.locale,
  }), shallowEqual);

  useEffect(() => {

    const fetchData = async () => {
      const _cGlobal = await getCharactersGlobal();
      await dispatch(setCharactersGlobal(_cGlobal));

      const _c = await getCharacters();
      await dispatch(setCharacters(_c));

      const _f = initialFormation(formation, _c);
      await dispatch(updateDataset({ formation: _f }));
    }

    setIsLoading(false);
    if (isLoading) fetchData();
  }, [formation, dispatch, isLoading, setIsLoading]);

  if (isEdge || isIE) return <NotSupport />;

  return (
    <HashRouter>
      <Main data-locale={locale}>
        {/** isMobile ? null : <SnowEffect /> */}
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
      </Main>
    </HashRouter>
  );
}
