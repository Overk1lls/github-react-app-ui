import React from 'react';
import App from './App';
import AppProvider from './app/context';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { createAxiosClient } from './app/axios';
import { getConfig } from './app/config';

import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme();
const { baseUrl } = getConfig();

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <AppProvider axios={createAxiosClient(baseUrl)}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AppProvider>
    </Provider>
  // </React.StrictMode>
);
