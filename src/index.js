import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";


import './index.scss';
import 'macro-css'

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);


