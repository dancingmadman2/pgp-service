import React from 'react';
import { FiClipboard } from 'react-icons/fi';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <button onClick={handleCopy} className="copy-button" title="Copy to clipboard">
      <FiClipboard />
    </button>
  );
};

export default CopyButton;
