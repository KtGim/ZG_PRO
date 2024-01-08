import React from 'react';
import ReactDOM from 'react-dom/client';
import MasonryLayout from '../../components/Layouts/Masonry';

type AppProps = {
};

const App: React.FC<AppProps> = () => {
  return <MasonryLayout dataSource={[]} >hello</MasonryLayout>;
};

ReactDOM.createRoot(document.getElementById('root') as Element, {
  // identifierPrefix?: string;
  onRecoverableError: (error: unknown, errorInfo) => {
    console.error('CREATE ROOT CONTAINER', error, errorInfo);
  }
}).render(<App />);

export default App;