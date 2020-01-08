import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

const Main = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-flow: column;

  h1 {
    margin: 1.25rem 0;
  }

  a {
    margin: 0 1rem;
    color: ${p => lighten(p.theme.primary, 10)};

    &:hover {
      color: ${p => lighten(p.theme.primary, 25)};
    }
  }
`;

function NotSupport() {
  return (
    <Main>
      <h1>Your Browser Is Not Supported.</h1>
      <h1> Please Download:</h1>
      <h1>
        <a href='https://www.google.com/intl/En/chrome/' target='blank'>Chrome</a>
        /
        <a href='https://www.opera.com' target='blank'>Opera</a>
        /
        <a href='https://www.mozilla.org' target='blank'>Firefox</a>
      </h1>
    </Main>
  );
}

NotSupport.propTypes = {}

export default NotSupport;
