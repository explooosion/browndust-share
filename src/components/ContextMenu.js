/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import './ContextMenu.scss';

import { FaBookMedical, FaTrash, FaFortAwesomeAlt } from 'react-icons/fa';
import { Menu, Item, Separator, animation } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

import { updateDataset } from '../actions';
import { bookDetailUrl } from '../config/api';

const Main = styled(Menu)`
  /* overwrite */
  &.react-contexify {
    /* stylelint-disable */
    .react-contexify__item__content {
      align-items: center;

      svg {
        margin-right: .5rem;
      }
    }
  }
`;

function RightMenu() {
  const dispatch = useDispatch();
  const { dataset, characters } = useSelector(state => state);

  function onAddLevel({ event }) {
    const levelDialog = {
      ...dataset.levelDialog,
      show: true,
      left: event.clientX,
      top: event.clientY,
      id: event.target.id,
    }
    dispatch(updateDataset({ levelDialog }));
  };

  function onClearAll({ event }) {
    const formation = dataset.formation.map(f => f.id === event.target.id ? { ...f, level: 0 } : f);
    dispatch(updateDataset({ formation }));
  }

  function onLinkClick({ event }) {
    const { uniqueCode } = dataset.formation.find(f => f.id === event.target.id);
    if (uniqueCode === 0) return;
    const { _uniqueCode } = characters.find(c => c._uniqueCode === uniqueCode);
    window.open(bookDetailUrl + _uniqueCode, '_blank');
  }

  /**
   * API DOC
   * https://fkhadra.github.io/react-contexify/api/theme-and-animation
   */
  return (
    <Main id='ctmenu' animation={animation.flip}>
      <Item onClick={onLinkClick}><FaFortAwesomeAlt />Mercenary Info</Item>
      <Item onClick={onAddLevel}><FaBookMedical />Add Level</Item>
      <Separator />
      <Item onClick={onClearAll}><FaTrash />Clear Settings</Item>
      {
        /**
         * Sample Code
          <Separator />
          <Submenu label="Foobar">
            <Item onClick={onClick}>Foo</Item>
            <Item onClick={onClick}>Bar</Item>
          </Submenu>
         */
      }
    </Main>
  );
}

RightMenu.propTypes = {}

export default RightMenu;
