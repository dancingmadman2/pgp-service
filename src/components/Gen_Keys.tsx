import React, { useState } from 'react';
import * as openpgp from 'openpgp';
import CopyButton from './extras/clipboard';

const GenerateKeys: React.FC = () => {
  const [passphrase, setPassphrase] = useState('');
  const [keyType, setKeyType] = useState<'rsa' | 'ecc'>('rsa');
  const [rsaBits, setRsaBits] = useState<number>(2048);
  const [userName, setUserName] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleGenerateKeys = async () => {
    try {
      const { privateKey, publicKey } = await openpgp.generateKey({
        type: keyType,
        rsaBits: keyType === 'rsa' ? rsaBits : undefined,
        userIDs: [{ name: userName }],
        passphrase,
      });
      setPublicKey(publicKey);
      setPrivateKey(privateKey);
    } catch (error) {
      console.error('Error generating keys:', error);
    }
  };

  return (
    <div className="component">
      <h2>Generate PGP Keys</h2>
      <div>
        <label>
          Passphrase:
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Enter a passphrase for your private key"
          />
        </label>
      </div>
      <div>
        <label>
          Key Type:
          <select value={keyType} onChange={(e) => setKeyType(e.target.value as 'rsa' | 'ecc')}>
            <option value="rsa">RSA</option>
            <option value="ecc">ECC</option>
          </select>
        </label>
      </div>
      {keyType === 'rsa' && (
        <div>
          <label>
            RSA Key Size:
            <select value={rsaBits} onChange={(e) => setRsaBits(Number(e.target.value))}>
              <option value={2048}>2048</option>
              <option value={3072}>3072</option>
              <option value={4096}>4096</option>
            </select>
          </label>
        </div>
      )}
      <div>
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name"
          />
        </label>
      </div>
      <button onClick={handleGenerateKeys}>Generate Keys</button>
      {publicKey && (
        <div className="copy-container">
          <h3>Public Key:</h3>
          <pre>{publicKey}</pre>
          <CopyButton textToCopy={publicKey} />
        </div>
      )}
      {privateKey && (
        <div className="copy-container">
          <h3>Private Key:</h3>
          <pre>{privateKey}</pre>
          <CopyButton textToCopy={privateKey} />
        </div>
      )}
    </div>
  );
};

export default GenerateKeys;
