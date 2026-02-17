
import { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { PlayArrow, Refresh, SportsBasketball } from '@mui/icons-material';

const GameTacticsBoard = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    // Simple Pick and Roll Animation Coords
    // P1 (Ball Handler): Starts Top, Moves Right
    // P5 (Screener): Starts Low, Sets Screen Top, Rolls Rim
    // D1 (Defender): Follows P1, gets hit by Screen

    const runPlay = () => {
        setIsPlaying(false);
        setTimeout(() => setIsPlaying(true), 100);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#fff' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Pizarra Táctica Inteligente
            </Typography>
            <Typography variant="body2" paragraph>
                Simulación en tiempo real de jugadas clave. Ejemplo: "Pick and Roll Central".
            </Typography>

            <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, margin: '0 auto', aspectRatio: '1.5', bgcolor: '#fff', border: '2px solid #333', borderRadius: 2, overflow: 'hidden' }}>
                <svg viewBox="0 0 600 400" style={{ width: '100%', height: '100%', background: '#ffcc80' }}>
                    {/* Court Lines */}
                    <line x1="300" y1="0" x2="300" y2="400" stroke="white" strokeWidth="2" /> {/* Half court line? No, let's do half court view */}
                    <path d="M 0 150 A 60 60 0 0 1 120 150" fill="none" stroke="white" strokeWidth="2" /> {/* 3pt top placeholder? Let's just draw standard half court vertical */}

                    {/* Half Court Vertical View */}
                    <rect x="170" y="0" width="260" height="190" fill="none" stroke="white" strokeWidth="2" /> {/* Key */}
                    <circle cx="300" cy="190" r="60" fill="none" stroke="white" strokeWidth="2" /> {/* Free throw */}
                    <path d="M 50 0 C 50 300 550 300 550 0" fill="none" stroke="white" strokeWidth="2" /> {/* 3pt Line */}
                    <line x1="270" y1="40" x2="330" y2="40" stroke="black" strokeWidth="4" /> {/* Backboard */}
                    <circle cx="300" cy="55" r="10" stroke="orange" strokeWidth="2" fill="none" /> {/* Rim */}


                    {/* --- PLAYERS --- */}

                    {/* P1: Point Guard (Circle) */}
                    <motion.g
                        initial={{ x: 300, y: 350 }}
                        animate={isPlaying ? { x: [300, 250, 450], y: [350, 300, 150] } : { x: 300, y: 350 }}
                        transition={{ duration: 4, times: [0, 0.3, 1] }}
                    >
                        <circle r="15" fill="blue" stroke="white" strokeWidth="2" />
                        <text y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
                        {/* Ball */}
                        <motion.circle
                            r="5" cx="12" cy="12" fill="orange"
                            animate={isPlaying ? { opacity: [1, 1, 0] } : { opacity: 1 }} // Pass to rolling player
                            transition={{ duration: 4, times: [0, 0.8, 0.81] }}
                        />
                    </motion.g>

                    {/* P5: Center (Screen/Roll) */}
                    <motion.g
                        initial={{ x: 200, y: 200 }}
                        animate={isPlaying ? {
                            x: [200, 280, 280, 300], // Move to screen, Hold, Roll
                            y: [200, 300, 300, 70]
                        } : { x: 200, y: 200 }}
                        transition={{ duration: 4, times: [0, 0.3, 0.5, 1] }}
                    >
                        <circle r="15" fill="blue" stroke="white" strokeWidth="2" />
                        <text y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
                        {/* Catch Ball */}
                        <motion.circle
                            r="5" cx="0" cy="0" fill="orange"
                            initial={{ opacity: 0 }}
                            animate={isPlaying ? { opacity: [0, 0, 1] } : { opacity: 0 }}
                            transition={{ duration: 4, times: [0, 0.8, 0.81] }}
                        />
                    </motion.g>

                    {/* D1: Defender (Triangle) */}
                    <motion.g
                        initial={{ x: 300, y: 300 }}
                        animate={isPlaying ? {
                            x: [300, 300, 280, 350], // Tries to follow, hits screen P5
                            y: [300, 320, 320, 250]
                        } : { x: 300, y: 300 }}
                        transition={{ duration: 4 }}
                    >
                        <path d="M -15 10 L 15 10 L 0 -15 Z" fill="red" stroke="white" strokeWidth="2" />
                        <text y="8" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">D1</text>
                    </motion.g>

                </svg>

                {/* Controls Overlay */}
                <Box sx={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 1 }}>
                    <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#eee' } }} onClick={runPlay}>
                        {isPlaying ? <Refresh /> : <PlayArrow />}
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button variant="outlined" startIcon={<SportsBasketball />}>Pick & Roll</Button>
                <Button variant="outlined" startIcon={<SportsBasketball />}>Corte al Aro</Button>
                <Button variant="outlined" startIcon={<SportsBasketball />}>Tiro de Esquina</Button>
            </Box>
        </Paper>
    );
};

export default GameTacticsBoard;
