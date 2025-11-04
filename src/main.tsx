import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n/config';
import './styles/edtech-variables.css';
import './styles/ta-design-system.css';
import './styles/wow-design-system.css';
import './styles/globals.css';
import 'antd/dist/reset.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
