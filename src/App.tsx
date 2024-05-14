import React from 'react';
import './App.css';
import './styles.css';  
import EncryptMessage from './components/Encrypt';
import DecryptMessage from './components/Decrypt';
import GenerateKeys from './components/Gen_Keys';
import InfoSection from './components/extras/info';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>PGP Service</h1>
      <div className="container">
        <EncryptMessage />
        <DecryptMessage />
        <GenerateKeys />
        <InfoSection />
      </div>
    </div>
  );
};

export default App;
