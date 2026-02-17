
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, LinearProgress, Slider } from '@mui/material';
import { motion } from 'framer-motion';

const CardioMetabolism = () => {
    const [speed, setSpeed] = useState<number>(30); // 0 to 100
    const [energyStores, setEnergyStores] = useState({
        atp: 100, // ATP-CP (Sprint)
        glyco: 100, // Glycolytic (Mid)
        oxidative: 100 // Oxidative (Long)
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setEnergyStores(prev => {
                let newAtp = prev.atp;
                let newGlyco = prev.glyco;
                let newOxidative = prev.oxidative;

                // Recovery logic
                if (speed < 20) {
                    newAtp = Math.min(100, newAtp + 2);
                    newGlyco = Math.min(100, newGlyco + 0.5);
                }

                // Depletion logic based on speed (intensity)
                if (speed > 80) { // Sprinting
                    newAtp = Math.max(0, newAtp - 2);
                    if (newAtp < 20) newGlyco = Math.max(0, newGlyco - 0.5);
                } else if (speed > 50) { // Running
                    newGlyco = Math.max(0, newGlyco - 0.8);
                    newAtp = Math.min(100, newAtp + 0.5); // Slow recovery of ATP
                } else if (speed > 10) { // Jogging
                    newOxidative = Math.max(80, newOxidative - 0.1); // Infinite mostly
                }

                return { atp: newAtp, glyco: newGlyco, oxidative: newOxidative };
            });
        }, 100);

        return () => clearInterval(interval);
    }, [speed]);

    const getHeartRate = () => Math.round(60 + speed * 1.3);

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#f0f4f8' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Laboratorio de Energía Metabólica
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
                Ajusta la intensidad para ver qué sistema de energía utiliza tu cuerpo.
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Visualizer */}
                <Box sx={{ flex: 1, position: 'relative', height: 250, bgcolor: '#000', borderRadius: 4, overflow: 'hidden', border: '1px solid #333' }}>
                    {/* Dark Mode Grid Background */}
                    <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                    {/* Track */}
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '15%', background: 'linear-gradient(90deg, #333 0%, #555 100%)' }} />

                    {/* Runner Animation (Detailed Silhouette) */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: 20
                        }}
                        animate={{
                            x: ["-10%", "110%"],
                        }}
                        transition={{
                            duration: 100 / (speed === 0 ? 0.001 : speed), // Speed based
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {/* SVG Silhouette Runner */}
                        <svg width="60" height="80" viewBox="0 0 100 120" style={{ overflow: 'visible' }}>
                            <path d="M 50 20 Q 55 10 60 20 L 55 50 L 70 70 M 55 50 L 30 60 M 50 70 L 60 100 L 80 100 M 50 70 L 30 90 L 10 90"
                                fill="none"
                                stroke={speed > 80 ? "#ff1744" : "#4fc3f7"}
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <animate attributeName="d"
                                    values="M 50 20 Q 55 10 60 20 L 55 50 L 70 70 M 55 50 L 30 60 M 50 70 L 60 100 L 80 100 M 50 70 L 30 90 L 10 90; 
                                            M 50 22 Q 55 12 60 22 L 55 50 L 40 60 M 55 50 L 70 70 M 50 70 L 40 100 L 20 100 M 50 70 L 70 90 L 90 90;
                                            M 50 20 Q 55 10 60 20 L 55 50 L 70 70 M 55 50 L 30 60 M 50 70 L 60 100 L 80 100 M 50 70 L 30 90 L 10 90"
                                    dur={`${0.8 - speed / 200}s`}
                                    repeatCount="indefinite" />
                            </path>
                            <circle cx="50" cy="15" r="8" fill={speed > 80 ? "#ff1744" : "#4fc3f7"} />
                        </svg>
                    </motion.div>

                    {/* Heart Rate Display */}
                    <Box sx={{ position: 'absolute', top: 15, right: 15, textAlign: 'right' }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: speed > 85 ? '#ff1744' : '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                            {getHeartRate()} <span style={{ fontSize: 16 }}>BPM</span>
                        </Typography>
                        <LinearProgress variant="determinate" value={(getHeartRate() / 200) * 100} sx={{ height: 4, bgcolor: '#333', '& .MuiLinearProgress-bar': { bgcolor: speed > 85 ? 'red' : 'green' } }} />
                    </Box>
                </Box>

                {/* Controls & Stats */}
                <Box sx={{ flex: 1 }}>
                    <Typography gutterBottom>Intensidad del Ejercicio: {speed > 80 ? 'Sprint (Anaeróbico Aláctico)' : speed > 50 ? 'Carrera (Anaeróbico Láctico)' : 'Jogging (Aeróbico)'}</Typography>
                    <Slider
                        value={speed}
                        onChange={(_, val) => setSpeed(val as number)}
                        aria-label="Intensity"
                        valueLabelDisplay="auto"
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="caption">Tanque Fosfágeno (ATP-CP) - Potencia Inmediata</Typography>
                        <LinearProgress variant="determinate" value={energyStores.atp} color="warning" sx={{ height: 10, borderRadius: 5 }} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="caption">Tanque Glucolítico - Resistencia Media</Typography>
                        <LinearProgress variant="determinate" value={energyStores.glyco} color="secondary" sx={{ height: 10, borderRadius: 5 }} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="caption">Tanque Oxidativo - Resistencia Larga</Typography>
                        <LinearProgress variant="determinate" value={energyStores.oxidative} color="success" sx={{ height: 10, borderRadius: 5 }} />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default CardioMetabolism;
