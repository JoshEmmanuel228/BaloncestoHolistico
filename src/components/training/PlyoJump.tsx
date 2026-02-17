
import { useState } from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const PlyoJump = () => {
    const [jumpType, setJumpType] = useState<'box' | 'depth'>('box');
    const [isJumping, setIsJumping] = useState(false);

    const handleJump = (type: 'box' | 'depth') => {
        setJumpType(type);
        setIsJumping(false);
        setTimeout(() => setIsJumping(true), 50);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#f9f9f9', borderLeft: '6px solid #ff9800' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Física del Salto Vertical
            </Typography>
            <Typography variant="body2" paragraph>
                Visualiza las fuerzas reactivas y la fase de amortiguación en pliometría.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ height: 350, bgcolor: '#fff', borderRadius: 4, position: 'relative', border: '1px solid #eee', overflow: 'hidden' }}>
                        <svg viewBox="0 0 400 350" style={{ width: '100%', height: '100%' }}>
                            <defs>
                                <marker id="arrowUp" markerWidth="10" markerHeight="10" refX="5" refY="0" orient="auto">
                                    <path d="M0,10 L5,0 L10,10 z" fill="green" />
                                </marker>
                                <marker id="arrowDown" markerWidth="10" markerHeight="10" refX="5" refY="10" orient="auto">
                                    <path d="M0,0 L5,10 L10,0 z" fill="red" />
                                </marker>
                            </defs>

                            {/* Floor */}
                            <rect x="0" y="250" width="400" height="50" fill="#ddd" />

                            {/* Box */}
                            <rect x="250" y="180" width="80" height="70" fill="#333" />

                            {/* Character */}
                            <motion.g
                                initial={{ x: 100, y: 250 }}
                                animate={isJumping ?
                                    (jumpType === 'box' ? {
                                        y: [250, 260, 150, 180], // Dip, Jump, Land
                                        x: [100, 100, 200, 290]
                                    } : {
                                        // Depth Jump: Start on box (simulated), drop, land, explode up
                                        x: [290, 220, 220, 220],
                                        y: [180, 250, 260, 100] // Drop, Amortize, Explode
                                    })
                                    : { x: jumpType === 'box' ? 100 : 290, y: jumpType === 'box' ? 250 : 180 }
                                }
                                transition={{ duration: 1.5, times: [0, 0.2, 0.6, 1], ease: "easeInOut" }}
                            >
                                <circle cx="0" cy="-60" r="10" fill="#333" /> {/* Head relative to group */}
                                <line x1="0" y1="-50" x2="0" y2="-20" stroke="#333" strokeWidth="4" />
                                <line x1="0" y1="-20" x2="-10" y2="0" stroke="#333" strokeWidth="4" />
                                <line x1="0" y1="-20" x2="10" y2="0" stroke="#333" strokeWidth="4" />

                                {/* Force Vectors (Animated opacity) */}
                                <motion.line
                                    x1="0" y1="0" x2="0" y2="40"
                                    stroke="red" strokeWidth="2" markerEnd="url(#arrowDown)"
                                    animate={{ opacity: [0, 1, 0, 0] }}
                                    transition={{ duration: 1.5, times: [0, 0.3, 0.5, 1] }}
                                />
                                <motion.line
                                    x1="20" y1="0" x2="20" y2="-40"
                                    stroke="green" strokeWidth="2" markerEnd="url(#arrowUp)"
                                    animate={{ opacity: [0, 0, 1, 0] }}
                                    transition={{ duration: 1.5, times: [0, 0.3, 0.5, 1] }}
                                />
                            </motion.g>

                            {isJumping && (
                                <text x="20" y="30" fontSize="12" fill="#555">
                                    {jumpType === 'box' ? "Fuerza Concéntrica Max" : "Ciclo Estiramiento-Acortamiento (CEA)"}
                                </text>
                            )}

                            {/* --- FORCE PLATE GRAPH OVERLAY --- */}
                            <g transform="translate(10, 280)">
                                <rect width="150" height="60" fill="rgba(255,255,255,0.9)" stroke="#ccc" />
                                <text x="5" y="15" fontSize="8" fontWeight="bold">Ground Reaction Force (N)</text>
                                {/* Graph Lines */}
                                <polyline points="0,50 150,50" stroke="#eee" strokeWidth="1" />
                                <polyline points="0,30 150,30" stroke="#eee" strokeWidth="1" />

                                {/* Animated Path based on Jump Type */}
                                {isJumping && (
                                    <motion.path
                                        d={jumpType === 'box'
                                            ? "M 0 50 L 30 50 L 40 20 L 60 55 L 150 50" // Dip (force down), Explosion (force up), Flight (0)
                                            : "M 0 50 L 20 50 L 30 10 L 40 55 L 60 50" // Impact spike, Explosion spike
                                        }
                                        fill="none"
                                        stroke="blue"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, ease: "linear" }}
                                    />
                                )}
                            </g>
                        </svg>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            variant={jumpType === 'box' ? "contained" : "outlined"}
                            color="warning"
                            onClick={() => handleJump('box')}
                        >
                            Box Jump (Potencia Pura)
                        </Button>
                        <Button
                            variant={jumpType === 'depth' ? "contained" : "outlined"}
                            color="error"
                            onClick={() => handleJump('depth')}
                        >
                            Depth Jump (Reactividad)
                        </Button>

                        <Box sx={{ mt: 2, p: 2, bgcolor: '#fff', borderRadius: 2 }}>
                            <Typography variant="caption" display="block" gutterBottom>
                                🔴 Vector Rojo: Fuerza de Impacto / Gravedad
                            </Typography>
                            <Typography variant="caption" display="block">
                                🟢 Vector Verde: Fuerza de Reacción del Suelo (Explosividad)
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PlyoJump;
