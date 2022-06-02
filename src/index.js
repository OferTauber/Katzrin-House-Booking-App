import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './components/App';
import ContextProvider from './utils/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ContextProvider>
    <GoogleOAuthProvider clientId="251812152805-0f9f7ifuuss2nc18uf28ddfoiapgh9rh.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </ContextProvider>
  // </React.StrictMode>
);
