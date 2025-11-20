import React, { useState } from 'react';

interface JsonPreviewProps {
  data: object;
  title: string;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ data, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <span>{title}</span>
        <span>{isOpen ? 'Hide Payload' : 'Show Payload'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-900 overflow-x-auto">
          <pre className="text-xs text-green-400 font-mono">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};