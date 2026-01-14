import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

type Props = {
  sx?: SxProps<Theme>;
  size?: number;
  pulse?: boolean;
};

const HeartBeatIcon: React.FC<Props> = ({ sx, size = 20, pulse = true }) => {
  const styleKeyframes = `@keyframes heartbeat{0%{transform:scale(1)}25%{transform:scale(1.15)}40%{transform:scale(0.95)}60%{transform:scale(1.05)}100%{transform:scale(1)}}`;
  return (
    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0, fontSize: size, ...((sx as any) || {}) }}>
      <style>{styleKeyframes}</style>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transformOrigin: 'center', animation: pulse ? 'heartbeat 1.2s infinite' : undefined }}
        aria-hidden
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.01 3.99 4 6.5 4c1.54 0 3.04.99 3.57 2.36h.87C13.46 4.99 14.96 4 16.5 4 19.01 4 21 6.01 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="currentColor"
        />
      </svg>
    </Box>
  );
};

export default HeartBeatIcon;
