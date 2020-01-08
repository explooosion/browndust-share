import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { rgba } from 'polished';

import { FaDesktop, FaHeart } from "react-icons/fa";

const Main = styled.div`

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  text-align: center;
  color: #fff;
  background-color: ${p => rgba(p.theme.success, 0.95)};
  z-index: 999;

  &.checked {
    display: none;
  }

  span {
    font-size: 25px;
  }

  svg {
    margin: 0 .25rem;
  }
`;

function MobileAlert() {
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();

  return (
    <Main
      className={checked ? 'checked' : ''}
      onClick={() => setChecked(true)}
    >
      <span>{t('browser-mobile-alert')}<FaHeart size='1.25rem' /><FaDesktop size='1.25rem' /></span>
    </Main>
  );
}

MobileAlert.propTypes = {}

export default MobileAlert;
