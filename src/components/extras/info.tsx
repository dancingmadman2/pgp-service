import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <h3>Security and Open Source</h3>
      <p>
        All of the cryptographic operations are performed entirely on the client-side, meaning your private keys and decrypted messages never leave your device. None of the information is stored.
      </p>
      <p>
        The project is open-source, and you can review the source code on GitHub.
      </p>
      <p>
        <a href="https://github.com/dancingmadman2/pgp-service" target="_blank" rel="noopener noreferrer">View the source code on GitHub</a>
      </p>
    </div>
  );
};

export default InfoSection;
