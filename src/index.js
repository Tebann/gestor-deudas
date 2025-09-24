import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// 👇 1. IMPORTA TU PROVIDER
import { DeudasProvider } from './context/DeudasContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 👇 2. ENVUELVE TU APP CON EL PROVIDER */}
    <DeudasProvider>
      <App />
    </DeudasProvider>
  </React.StrictMode>
);