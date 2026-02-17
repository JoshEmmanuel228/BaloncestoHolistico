import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatHexProps {
    value: string | number;
    label: string;
    color?: string;
}

const StatHex: React.FC<StatHexProps> = ({ value, label, color = '#00eaff' }) => {
    return (
        <Box sx={{ position: 'relative', width: 100, height: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Hexagon Shape SVG background */}
            <svg
                viewBox="0 0 100 115"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 0 }}
            >
                <path
                    d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                    fill="rgba(10, 25, 40, 0.8)"
                    stroke={color}
                    strokeWidth="2"
                    filter="drop-shadow(0 0 5px rgba(0,234,255,0.5))"
                />
            </svg>

            <Box sx={{ zIndex: 1, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Orbitron', sans-serif", fontWeight: 'bold' }}>
                    {value}
                </Typography>
                <Typography variant="caption" sx={{ color: color, fontFamily: "'Rajdhani', sans-serif", fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' }}>
                    {label}
                </Typography>
            </Box>
        </Box>
    );
};

export default StatHex;
