import React from 'react';

interface StatusBadgeProps {
  status: 'idle' | 'loading' | 'success' | 'error';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    idle: { color: 'bg-gray-100 text-gray-600', text: 'Ready' },
    loading: { color: 'bg-blue-100 text-blue-700', text: 'Processing...' },
    success: { color: 'bg-green-100 text-green-700', text: 'Success' },
    error: { color: 'bg-red-100 text-red-700', text: 'Error' },
  };

  const current = config[status];

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${current.color}`}>
      {current.text}
    </span>
  );
};