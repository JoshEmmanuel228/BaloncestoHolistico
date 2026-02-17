import React from 'react';
import { Box } from '@mui/material';
import '../styles/profileBio.css';

interface BioScannerProps {
    src: string;
    alt: string;
}

const BioScanner: React.FC<BioScannerProps> = ({ src, alt }) => {
    return (
        <div className="bio-scanner-frame">
            <div className="bio-scanner-inner">
                <div className="scan-line"></div>
                <Box
                    component="img"
                    src={src}
                    alt={alt}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(20%) contrast(1.1)',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(0%) contrast(1.2)'
                        }
                    }}
                />

                {/* Tech Overlays */}
                <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: 'rgba(0,234,255,0.8)' }}></div>
                <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: 'rgba(0,234,255,0.8)' }}></div>
                <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 2, height: 20, background: 'rgba(0,234,255,0.8)' }}></div>
                <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 2, height: 20, background: 'rgba(0,234,255,0.8)' }}></div>
            </div>
        </div>
    );
};

export default BioScanner;
