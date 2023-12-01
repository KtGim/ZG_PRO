import React from 'react';
import ReactDOM from 'react-dom';

type AppProps = {
};

const App: React.FC<AppProps> = () => {
  return <div>你好</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;