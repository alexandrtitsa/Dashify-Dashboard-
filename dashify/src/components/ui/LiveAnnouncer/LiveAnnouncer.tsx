import React from 'react';

interface LiveAnnouncerProps {
  message: string;
}

export const LiveAnnouncer: React.FC<LiveAnnouncerProps> = ({ message }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        margin: '-1px',
        padding: '0',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: '0',
      }}
    >
      {message}
    </div>
  );
};