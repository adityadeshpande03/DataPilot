import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import theme from './theme/theme.js';

import './index.css'
import App from './App.jsx'
import NotificationProvider from "./components/common/NotificationProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <GlobalStyles
          styles={(theme) => ({
            body: {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          })}
        />
        <App />
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>,
)