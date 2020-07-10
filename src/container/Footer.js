/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaGithub } from "react-icons/fa";
import { GoIssueOpened, GoQuestion } from "react-icons/go";
import { lighten, rgba } from 'polished';

const Foot = styled.footer`

  position: relative;
  display: flex;
  justify-content: flex-start;
  padding: 0 .75rem;
  flex-flow: column;

  .footer-tip {
    position: absolute;
    top: -11rem;
    left: 9rem;
    margin-top: 1rem;
    padding: .75rem;
    color: #fff;
    background-color: #162028;
    border: 1px solid ${p => p.theme.warning};
    border-radius: .5rem;
    opacity: 0;
    visibility: hidden;
    transition: all .2s ease-in-out;

    &.active {
      opacity: 1;
      visibility: initial;
    }

    span {
      display: block;
      font-size: 16px;
      letter-spacing: 1px;
    }
  }
`;

const Items = styled.div`

  display: flex;
  align-items: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

  .footer-link {
    margin-right: .75rem;
    color: #fff;

    &:hover {
      color: ${p => lighten(0.5, p.theme.lightWarning)}
    }
  }
`;

const CopyRight = styled.span`

  position: fixed;
  bottom: 20px;
  left: 20px;
  display: block;
  font-size: 14px;
  color: ${p => lighten(0.2, p.theme.gray)};

  @media only screen and (max-width: ${p => p.theme.screenXl}) {
    display: none;
  }
`;

function Footer() {
  const [helpTips, setHelpTips] = useState(false);
  const { t } = useTranslation();

  return (
    <Foot>
      <Items>
        <a className='footer-link' alt='github' title='github' href='https://github.com/explooosion/browndust-share' target='_blank' rel="noopener noreferrer"><FaGithub size='2em' /></a>
        <a className='footer-link' alt='issue' title='issue' href='https://github.com/explooosion/browndust-share/issues' target='_blank' rel="noopener noreferrer"><GoIssueOpened size='2.3em' /></a>
        <span
          className='footer-link'
          onClick={() => setHelpTips(!helpTips)}
        >
          <GoQuestion size='2.3em' />
        </span>
      </Items>
      <div className={`footer-tip ${helpTips ? 'active' : ''}`}>
        <span>1. {t('tip1')}</span>
        <span>2. {t('tip2')}</span>
        <span>3. {t('tip3')}</span>
        <span>4. {t('tip4')}</span>
        <span>5. {t('tip5')}</span>
        <span>6. {t('tip6')}</span>
      </div>
      <CopyRight>This site is fan-made and not affiliated with NEOWIZ and GAMFS in any way.</CopyRight>
    </Foot>
  );
}

export default Footer;
