import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss'
import GiftListApp from './GiftListApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GiftListApp />
  </React.StrictMode>
);
