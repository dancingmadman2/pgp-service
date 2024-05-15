/* eslint-disable no-sequences */
import React, { useState } from 'react';
import * as openpgp from 'openpgp';
import CopyButton from './extras/clipboard';

const EncryptMessage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');

  const handleEncrypt = async () => {
    try {
      const publicKeyObject = await openpgp.readKey({ armoredKey: publicKey });
      const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: message }),
        encryptionKeys: publicKeyObject,
      });

      let encryptedString: string;

      if (typeof encrypted === 'string') {
        encryptedString = encrypted;
      } else if (encrypted instanceof Uint8Array) {
        encryptedString = new TextDecoder().decode(encrypted);
      } else if (encrypted instanceof ReadableStream) {
        const reader = encrypted.getReader();
        const chunks: Uint8Array[] = [];
        let done: boolean | undefined, value: Uint8Array | undefined;
        while ({ done, value } = await reader.read(), !done) {
          if (value) {
            chunks.push(value);
          }
        }

        const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
        const concatenatedChunks = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
          concatenatedChunks.set(chunk, offset);
          offset += chunk.length;
        }

        encryptedString = new TextDecoder().decode(concatenatedChunks);
      } else {
        throw new Error('Unsupported encrypted data type');
      }

      setEncryptedMessage(encryptedString);
    } catch (error:any) {
      console.error('Error encrypting message:', error);
   
      if (error.message.includes('Ascii armor integrity check failed')) {
        setEncryptedMessage('Incorrect public key.');
      } else if (error.message.includes('Misformed armored text')) {
        setEncryptedMessage('Bad format on public key.')
      } else if (error.message.includes('RSA keys shorter than 2047 bits')) {
        setEncryptedMessage('Key is too weak, must have at least 2048 bits.')
      } 
      else {
        setEncryptedMessage('Error encrypting message. Please check the inputs.');
      }

      //setEncryptedMessage(`${error}`);
    }
  };

  return (
    <div className="component">
      <h2>Encrypt Message</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to encrypt"
      />
      <textarea
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
        placeholder="Enter recipient's public key"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      {encryptedMessage && (
        <div className="copy-container">
          <pre>{encryptedMessage}</pre>
          <CopyButton textToCopy={encryptedMessage} />
        </div>
      )}
    </div>
  );
};

export default EncryptMessage;
