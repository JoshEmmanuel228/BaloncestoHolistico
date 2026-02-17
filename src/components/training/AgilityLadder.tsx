
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, ToggleButton, ToggleButtonGroup, Slider } from '@mui/material';
import { motion } from 'framer-motion';

const AgilityLadder = () => {
    const [pattern, setPattern] = useState<'icky' | 'inout'>('icky');
    const [speed, setSpeed] = useState<number>(50);
    const [activeStep, setActiveStep] = useState(0);

    const patterns = {
        icky: [0, 1, 2, 3, 4, 5, 0, 1], // Simplified sequence indices
        inout: [0, 2, 1, 3, 2, 4, 3, 5]
    };

    useEffect(() => {
        const intervalTime = 1000 - speed * 8; // Speed 0 = 1000ms, Speed 100 = 200ms
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % patterns[pattern].length);
        }, intervalTime);
        return () => clearInterval(interval);
    }, [speed, pattern]);

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#fffde7' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Simulador de Footwork
            </Typography>
            <Typography variant="body2" paragraph>
                Entrena tu coordinación neuromuscular con la escalera de agilidad virtual.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {/* Ladder Visualization using Grid */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, py: 4, perspective: '500px' }}>
                        {[0, 1, 2, 3, 4, 5].map((rung) => (
                            <Box
                                key={rung}
                                sx={{
                                    width: 200,
                                    height: 60,
                                    border: '4px solid #333',
                                    borderBottom: 'none',
                                    position: 'relative',
                                    bgcolor: 'rgba(255,255,255,0.5)',
                                    transform: 'rotateX(20deg)', // 3D effect
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {/* Last rung bottom border */}
                                {rung === 5 && <Box sx={{ position: 'absolute', bottom: -4, width: '100%', height: 4, bgcolor: '#333' }} />}

                                {/* Footprints Animation */}
                                {(activeStep === rung || activeStep === rung + 1) && ( // Simplified visualization logic
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ position: 'relative' }}
                                    >
                                        <Typography variant="h4" sx={{ zIndex: 2, position: 'relative' }}>👟</Typography>

                                        {/* Heat Map Effect */}
                                        <motion.div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: 60,
                                                height: 40,
                                                borderRadius: '50%',
                                                background: speed > 70 ? 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0) 70%)' : 'radial-gradient(circle, rgba(255,165,0,0.6) 0%, rgba(255,165,0,0) 70%)',
                                                zIndex: 1
                                            }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0.8, 0] }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </motion.div>
                                )}

                                {/* Persistent Heatmap Trails (ghost) */}
                                {activeStep > rung && (
                                    <Box sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: speed > 70 ? 'rgba(255, 0, 0, 0.05)' : 'transparent',
                                        pointerEvents: 'none'
                                    }} />
                                )}
                            </Box>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <ToggleButtonGroup
                        orientation="vertical"
                        value={pattern}
                        exclusive
                        onChange={(_, val) => val && setPattern(val)}
                        fullWidth
                        sx={{ mb: 4 }}
                    >
                        <ToggleButton value="icky">Ickyuffle (Coordinación)</ToggleButton>
                        <ToggleButton value="inout">In-Out (Rapidez)</ToggleButton>
                    </ToggleButtonGroup>

                    <Typography gutterBottom>Velocidad de Ejecución</Typography>
                    <Slider
                        value={speed}
                        onChange={(_, val) => setSpeed(val as number)}
                        min={10}
                        max={90}
                        valueLabelDisplay="auto"
                    />
                    <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                        Aumenta la velocidad para simular la demanda de un partido real.
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AgilityLadder;
