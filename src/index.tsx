import ReactDOM from 'react-dom/client';
import App from '@pages/App/App';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
