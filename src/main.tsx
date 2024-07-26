import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
