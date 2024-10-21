// third party style
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import { CssBaseline } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import App from './app/App';
// import TrackedApp from './app/App';
import * as serviceWorker from './serviceWorker';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(

  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <HashRouter>
    <CssBaseline />
    <App />
  </HashRouter>,
  //</BrowserRouter>,

);

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
