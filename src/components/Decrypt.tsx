import React, { useState } from 'react';
import * as openpgp from 'openpgp';
import CopyButton from './extras/clipboard';

const DecryptMessage: React.FC = () => {
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const handleDecrypt = async () => {
    try {
      const privateKeyObject = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }),
        passphrase,
      });
      const message = await openpgp.readMessage({ armoredMessage: encryptedMessage });
      const { data: decrypted } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKeyObject,
      });
      setDecryptedMessage(decrypted as string);
    } catch (error) {
      console.error('Error decrypting message:', error);
      setDecryptedMessage('Error decrypting message');
    }
  };

  return (
    <div className="component">
      <h2>Decrypt Message</h2>
      <textarea
        value={encryptedMessage}
        onChange={(e) => setEncryptedMessage(e.target.value)}
        placeholder="Enter encrypted message"
      />
      <textarea
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Enter your private key"
      />
      <input
        type="password"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
        placeholder="Enter your passphrase"
      />
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedMessage && (
        <div className="copy-container">
          <pre>{decryptedMessage}</pre>
          <CopyButton textToCopy={decryptedMessage} />
        </div>
      )}
    </div>
  );
};

export default DecryptMessage;
