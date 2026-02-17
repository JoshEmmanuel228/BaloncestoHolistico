
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const BreathingExercise = () => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [cycleCount, setCycleCount] = useState(0);

    // Breathing patterns (seconds)
    const patterns = {
        relax: { inhale: 4, hold: 7, exhale: 8 },
        box: { inhale: 4, hold: 4, exhale: 4 }, // Simplified box for this UI
    };

    const [currentPattern, setCurrentPattern] = useState<'relax' | 'box'>('relax');

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (isActive) {
            const { inhale, hold, exhale } = patterns[currentPattern];

            const runCycle = () => {
                setPhase('inhale');
                timeout = setTimeout(() => {
                    setPhase('hold');
                    timeout = setTimeout(() => {
                        setPhase('exhale');
                        timeout = setTimeout(() => {
                            setCycleCount(c => c + 1);
                            runCycle(); // Loop
                        }, exhale * 1000);
                    }, hold * 1000);
                }, inhale * 1000);
            };

            runCycle();
        } else {
            setPhase('inhale');
            setCycleCount(0);
        }

        return () => clearTimeout(timeout);
    }, [isActive, currentPattern]);

    const getInstruction = () => {
        switch (phase) {
            case 'inhale': return 'Inhala...';
            case 'hold': return 'Mantén...';
            case 'exhale': return 'Exhala...';
        }
    };

    const getScale = () => {
        switch (phase) {
            case 'inhale': return 1.5;
            case 'hold': return 1.5;
            case 'exhale': return 1.0;
        }
    };

    const getDuration = () => {
        const { inhale, exhale } = patterns[currentPattern];
        switch (phase) {
            case 'inhale': return inhale;
            case 'hold':
                // Using hold to ensure logic consistency (and fix linter warning)
                // although strictly not needed for animation duration of 0
                return 0;
            case 'exhale': return exhale;
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                color: 'white',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                    {currentPattern === 'relax' ? 'Respiración Relajante (4-7-8)' : 'Respiración Cuadrada (4-4-4)'}
                </Typography>

                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <AnimatePresence mode='wait'>
                        {isActive ? (
                            <motion.div
                                animate={{
                                    scale: getScale(),
                                    opacity: phase === 'hold' ? 0.8 : 1,
                                }}
                                transition={{
                                    duration: getDuration(),
                                    ease: "easeInOut"
                                }}
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(66,165,245,0.8) 0%, rgba(21,101,192,0.4) 100%)',
                                    boxShadow: '0 0 40px rgba(66,165,245,0.6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    {getInstruction()}
                                </Typography>
                            </motion.div>
                        ) : (
                            <Box
                                sx={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0.7
                                }}
                            >
                                <Typography variant="body1">Listo para comenzar</Typography>
                            </Box>
                        )}
                    </AnimatePresence>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <Button
                        variant="contained"
                        color={isActive ? "error" : "success"}
                        size="large"
                        onClick={() => setIsActive(!isActive)}
                    >
                        {isActive ? 'Detener' : 'Iniciar'}
                    </Button>

                    <Button
                        variant="outlined"
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
                        disabled={isActive}
                        onClick={() => setCurrentPattern(prev => prev === 'relax' ? 'box' : 'relax')}
                    >
                        Cambiar Patrón
                    </Button>
                </Box>

                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Ciclos completados: {cycleCount}
                </Typography>
            </Box>

            {/* Decorative background elements */}
            <Box sx={{
                position: 'absolute',
                top: -50,
                left: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                filter: 'blur(40px)',
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: -50,
                right: -50,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.2)',
                filter: 'blur(40px)',
            }} />
        </Paper>
    );
};

export default BreathingExercise;
