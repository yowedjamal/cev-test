// import React, { useState } from 'react';

// interface JsonPreviewProps {
//   data: object;
//   title: string;
// }

// export const JsonPreview: React.FC<JsonPreviewProps> = ({ data, title }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
//       >
//         <span>{title}</span>
//         <span>{isOpen ? 'Hide Payload' : 'Show Payload'}</span>
//       </button>
//       {isOpen && (
//         <div className="p-4 bg-gray-900 overflow-x-auto">
//           <pre className="text-xs text-green-400 font-mono">
//             {JSON.stringify(data, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';

interface JsonPreviewProps {
  data: object;
  title: string;
  onChange?: (updated: object) => void;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ data, title, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rawJson, setRawJson] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState<string | null>(null);

  // Sync editor when parent changes
  useEffect(() => {
    setRawJson(JSON.stringify(data, null, 2));
  }, [data]);

  const handleEdit = (value: string) => {
    setRawJson(value);

    try {
      const parsed = JSON.parse(value);
      setError(null);
      onChange?.(parsed); // send updated JSON to parent
    } catch (err: any) {
      setError(err.message);
    }
  };

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
        <div className="p-4 bg-gray-900">
          <textarea
            value={rawJson}
            onChange={(e) => handleEdit(e.target.value)}
            className="w-full h-72 text-xs font-mono text-green-400 bg-gray-900 border border-gray-700 rounded-md p-3 outline-none resize-none focus:ring-1 focus:ring-green-500"
          />

          {error && (
            <p className="mt-2 text-red-400 text-xs">Invalid JSON: {error}</p>
          )}
        </div>
      )}
    </div>
  );
};
