import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { Main } from './pages/Main/Main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Main />
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>
);
