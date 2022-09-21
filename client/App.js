import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <div id="nav">
        <Navbar />
      </div>
      <div id="components">
        <Routes />
      </div>
    </div>
  );
};

export default App;
