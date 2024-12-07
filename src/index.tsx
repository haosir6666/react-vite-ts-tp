import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
if(root) {
    createRoot(root).render(<App />)
}
console.log('API URL:', process.env.REACT_APP_API_URL);
console.log('BASE_ENV', process.env.REACT_APP_APP_NAME)
