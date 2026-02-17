import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Slider, Button, TextField } from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import { motion } from 'framer-motion';

const HydrationStrategy = () => {
    // Urine Chart State
    const [urineValue, setUrineValue] = useState<number>(2); // 1 (Clear) to 8 (Dark)

    // Sweat Calculator State
    const [preWeight, setPreWeight] = useState<string>('');
    const [postWeight, setPostWeight] = useState<string>('');
    const [fluidResult, setFluidResult] = useState<number | null>(null);

    const handleCalculateLoss = () => {
        const pre = parseFloat(preWeight);
        const post = parseFloat(postWeight);
        if (pre && post) {
            const loss = (pre - post) * 1.5; // Recommend 1.5L per kg lost
            setFluidResult(loss);
        }
    };

    const getHydrationStatus = (val: number) => {
        if (val <= 2) return { status: 'Hidratado (Óptimo)', color: '#e0f7fa', advice: 'Sigue así. Mantén el consumo regular.' };
        if (val <= 4) return { status: 'Ligeramente Deshidratado', color: '#fff9c4', advice: 'Bebe 500ml de agua ahora.' };
        if (val <= 6) return { status: 'Deshidratado', color: '#ffecb3', advice: 'Necesitas rehidratación inmediata. Usa electrolitos.' };
        return { status: 'Deshidratación Severa', color: '#ffcc80', advice: 'PELIGRO. Detén la actividad y bebe urgentemente.' };
    };

    const hydrationStatus = getHydrationStatus(urineValue);

    // Urine Colors Gradient steps approximation
    const urineColors = [
        '#f8fcfd', // 1
        '#fffde7', // 2
        '#fff9c4', // 3
        '#fff59d', // 4
        '#fff176', // 5
        '#ffd54f', // 6
        '#ffb74d', // 7
        '#ff8a65'  // 8
    ];

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#fff', borderRadius: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Laboratorio de Hidratación
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                            <OpacityIcon color="primary" sx={{ mr: 1 }} /> Test de Color (Pee Chart)
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Desliza para coincidir con el color de tu orina y obtener recomendaciones.
                        </Typography>

                        <Box sx={{ height: 100, borderRadius: 2, mb: 2, bgcolor: urineColors[urineValue - 1], transition: 'background-color 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd' }}>
                            <Typography variant="h6" sx={{ color: '#555', fontWeight: 'bold' }}>Nivel {urineValue}</Typography>
                        </Box>

                        <Slider
                            value={urineValue}
                            min={1}
                            max={8}
                            step={1}
                            onChange={(_, val) => setUrineValue(val as number)}
                            sx={{
                                color: urineColors[urineValue - 1],
                                '& .MuiSlider-thumb': {
                                    boxShadow: '0 0 0 8px rgba(0,0,0,0.1)'
                                }
                            }}
                        />

                        <Box sx={{ mt: 2, p: 2, bgcolor: '#fafafa', borderRadius: 2 }}>
                            <Typography fontWeight="bold" color={urineValue > 4 ? 'error' : 'success.main'}>
                                {hydrationStatus.status}
                            </Typography>
                            <Typography variant="body2">{hydrationStatus.advice}</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>Calculadora de Sudoración</Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Pésate antes y después del entrenamiento para saber cuánto líquido reponer.
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Peso Antes (kg)"
                                    type="number"
                                    fullWidth
                                    value={preWeight}
                                    onChange={(e) => setPreWeight(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Peso Después (kg)"
                                    type="number"
                                    fullWidth
                                    value={postWeight}
                                    onChange={(e) => setPostWeight(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleCalculateLoss}
                            disabled={!preWeight || !postWeight}
                        >
                            Calcular Rehidratación
                        </Button>

                        {fluidResult !== null && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Box sx={{ mt: 3, textAlign: 'center', p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                                    <Typography variant="subtitle2">Debes beber:</Typography>
                                    <Typography variant="h3" color="primary" fontWeight="bold">
                                        {fluidResult.toFixed(2)} L
                                    </Typography>
                                    <Typography variant="caption">En las próximas 2 horas.</Typography>
                                </Box>
                            </motion.div>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default HydrationStrategy;
