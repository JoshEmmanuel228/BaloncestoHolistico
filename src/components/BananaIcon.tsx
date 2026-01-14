import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

type Props = {
  sx?: SxProps<Theme>;
  size?: number;
};

const BananaIcon: React.FC<Props> = ({ sx, size = 20 }) => {
  return (
    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0, fontSize: size, ...((sx as any) || {}) }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M21.5 6.5c-1.2 0-3.3.5-5.5 2.1-2.6 2-4.4 4.8-5 6.6-.7 2.5.2 3.9 1.2 4.9s2.4 1.9 4.9 1.2c1.8-.6 4.6-2.4 6.6-5 1.6-2.2 2.1-4.3 2.1-5.5 0-1.1-.9-2-2-2z" fill="currentColor" />
        <path d="M14 3c-1 0-2 .4-3 1.2l-.5.4C10 5 9 6 8 7c-1 1.1-2 2.7-2 4.5 0 1 .5 2 1 3 1 2 3 3 5 3 .9 0 1.9-.2 2.8-.6 1.8-.8 3.5-2.5 4.3-4.3.4-.9.6-1.9.6-2.8 0-2-1-4-3-4.9C16.3 3.3 15.2 3 14 3z" fill="currentColor" opacity="0.95" />
      </svg>
    </Box>
  );
};

export default BananaIcon;
