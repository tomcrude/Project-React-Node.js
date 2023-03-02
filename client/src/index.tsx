import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import Footer from './components/footer';
import "./styles/style.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <Footer/>
  </React.StrictMode>
);

