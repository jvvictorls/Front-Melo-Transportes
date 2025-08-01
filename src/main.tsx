import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import AuthProvider from './context/AuthProvider.tsx';
import AddCollaboratorsProvider from './context/AddCollaboratorsProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AddCollaboratorsProvider>
          <App />
        </AddCollaboratorsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
