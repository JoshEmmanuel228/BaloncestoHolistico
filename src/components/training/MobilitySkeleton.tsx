
import { useState } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';

const MobilitySkeleton = () => {
    const [joint, setJoint] = useState<'ankle' | 'hip' | 'shoulder'>('ankle');

    const handleJointClick = (selected: 'ankle' | 'hip' | 'shoulder') => {
        setJoint(selected);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#e3f2fd' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Movilidad Articular y ROM
            </Typography>
            <Typography variant="body2" paragraph>
                Explora el Rango de Movimiento (ROM) crítico para evitar lesiones y mejorar el rendimiento.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button variant={joint === 'ankle' ? 'contained' : 'outlined'} onClick={() => handleJointClick('ankle')}>
                            Tobillo (Dorsiflexión)
                        </Button>
                        <Button variant={joint === 'hip' ? 'contained' : 'outlined'} onClick={() => handleJointClick('hip')}>
                            Cadera (Triple Extensión)
                        </Button>
                        <Button variant={joint === 'shoulder' ? 'contained' : 'outlined'} onClick={() => handleJointClick('shoulder')}>
                            Hombro (Tiro)
                        </Button>

                        <Box sx={{ mt: 2, p: 2, bgcolor: 'white', borderRadius: 2 }}>
                            {joint === 'ankle' && <Typography variant="body2">La dorsiflexión limitada aumenta el riesgo de rotura de LCA y esguinces.</Typography>}
                            {joint === 'hip' && <Typography variant="body2">La movilidad de cadera es esencial para posturas defensivas bajas y saltos explosivos.</Typography>}
                            {joint === 'shoulder' && <Typography variant="body2">Un rango completo permite una mecánica de tiro fluida y previene tendinitis.</Typography>}
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Box sx={{ height: 300, bgcolor: 'white', borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%' }}>
                            {/* Simple Skeleton Visualization */}

                            {/* Torso */}
                            <line x1="150" y1="80" x2="150" y2="180" stroke="#ccc" strokeWidth="10" strokeLinecap="round" />

                            {/* Head */}
                            <circle cx="150" cy="50" r="20" fill="#ccc" />

                            {/* Legs (Static part) */}
                            <line x1="150" y1="180" x2="120" y2="280" stroke="#ccc" strokeWidth="8" strokeLinecap="round" />
                            <line x1="150" y1="180" x2="180" y2="280" stroke="#ccc" strokeWidth="8" strokeLinecap="round" />


                            {/* Ankle Animation */}
                            {joint === 'ankle' && (
                                <g>
                                    <circle cx="120" cy="280" r="5" fill="red" />
                                    <motion.path
                                        d="M 120 280 L 100 280"
                                        stroke="red" strokeWidth="4"
                                        markerEnd="url(#arrow)"
                                        animate={{ rotate: [-20, 20, -20] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ originX: 1 }} // Rotate around ankle
                                    />
                                    <text x="50" y="260" fill="red" fontSize="12">Flexión/Extensión</text>
                                </g>
                            )}

                            {/* Hip Animation */}
                            {joint === 'hip' && (
                                <g>
                                    <circle cx="150" cy="180" r="8" fill="blue" />
                                    {/* Moving Leg */}
                                    <motion.line
                                        x1="150" y1="180" x2="150" y2="280"
                                        stroke="blue" strokeWidth="8"
                                        strokeLinecap="round"
                                        animate={{ rotate: [-45, 45, -45] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        style={{ originY: 0 }} // Rotate around hip
                                    />
                                    <text x="180" y="180" fill="blue" fontSize="12">Rango Completo</text>
                                </g>
                            )}

                            {/* Shoulder Animation */}
                            {joint === 'shoulder' && (
                                <g>
                                    <circle cx="150" cy="90" r="6" fill="orange" />
                                    {/* Moving Arm */}
                                    <motion.line
                                        x1="150" y1="90" x2="220" y2="90"
                                        stroke="orange" strokeWidth="8"
                                        strokeLinecap="round"
                                        animate={{ rotate: [-160, 0, -160] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        style={{ originX: 0 }} // Rotate around shoulder
                                    />
                                    <text x="180" y="70" fill="orange" fontSize="12">Circunducción</text>
                                </g>
                            )}

                        </svg>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MobilitySkeleton;
