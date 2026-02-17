import { useState } from 'react';
import { Box, Typography, Paper, Slider, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';

const PreGameFuel = () => {
    const [hoursBefore, setHoursBefore] = useState<number>(4);

    const getFuelStatus = (hours: number) => {
        if (hours >= 3) return { level: 30, color: '#f44336', status: 'Cargando Depósitos', advice: 'Comida Principal Rica en Carbohidratos' };
        if (hours >= 2) return { level: 60, color: '#ff9800', status: 'Digestión Activa', advice: 'Snacks Ligeros y Proteína Moderada' };
        if (hours >= 1) return { level: 90, color: '#4caf50', status: 'Listo para Rendir', advice: 'Carbohidratos Simples + Hidratación' };
        return { level: 100, color: '#2196f3', status: 'GAME TIME', advice: 'Activación y Foco' };
    };

    const status = getFuelStatus(hoursBefore);

    const mealRecommendations = [
        {
            hours: 4,
            title: "Comida Principal (3-4h antes)",
            icon: <RiceBowlIcon />,
            desc: "Carga completa de glucógeno. Fácil digestión.",
            why: "Necesitas llenar los depósitos de energía sin sentir pesadez. Debes terminar de comer al menos 3 horas antes del partido.",
            options: ["Pollo a la plancha + Arroz blanco + Zanahorias cocidas", "Pasta con salsa de tomate natural y pavo", "Pescado blanco + Patata asada (sin piel)"],
            avoid: "Fritos, salsas grasas (carbonara), legumbres (gases), verduras crudas (exceso de fibra)."
        },
        {
            hours: 2,
            title: "Refuerzo / Snack (2h antes)",
            icon: <LocalCafeIcon />,
            desc: "Mantenimiento. Pequeño aporte de carbohidratos.",
            why: "Si tienes hambre, es el momento de un refuerzo ligero que se digiera rápido.",
            options: ["Tostada con mermelada y poco de pavo", "Yogur desnatado con cereales bajos en fibra", "Batido de fruta con agua"],
            avoid: "Frutos secos (mucha grasa), lácteos enteros, carnes rojas."
        },
        {
            hours: 1,
            title: "Toque Final (1h antes)",
            icon: <SportsBasketballIcon />,
            desc: "Energía inmediata. Índice glucémico alto.",
            why: "El objetivo es tener glucosa disponible en sangre para el calentamiento. Solo carbohidratos simples.",
            options: ["Plátano maduro", "Bebida deportiva (Isotónica)", "Barrita de cereales (baja en grasa)", "Geles energéticos (si estás acostumbrado)"],
            avoid: "Cualquier grasa, proteína sólida o fibra. Nada de frutos secos o barritas con chocolate."
        },
    ];

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#fff', borderRadius: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Cronograma de Combustión Pre-Partido
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
                Desliza para ver qué comer según el tiempo restante para el salto inicial.
            </Typography>

            <Grid container spacing={5} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{ px: 2, py: 4 }}>
                        <Typography gutterBottom fontWeight="bold">Horas antes del partido: {hoursBefore}h</Typography>
                        <Slider
                            value={hoursBefore}
                            min={0}
                            max={4}
                            step={0.5}
                            marks
                            onChange={(_, val) => setHoursBefore(val as number)}
                            track="inverted"
                            sx={{
                                height: 8,
                                '& .MuiSlider-track': {
                                    border: 'none',
                                },
                                '& .MuiSlider-thumb': {
                                    height: 24,
                                    width: 24,
                                    backgroundColor: '#fff',
                                    border: '2px solid currentColor',
                                    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                                        boxShadow: 'inherit',
                                    },
                                    '&:before': {
                                        display: 'none',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        {mealRecommendations.map((meal, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0.5, x: -10 }}
                                animate={{
                                    opacity: hoursBefore >= meal.hours - 0.5 && hoursBefore <= meal.hours + 0.5 ? 1 : 0.4,
                                    x: hoursBefore >= meal.hours - 0.5 && hoursBefore <= meal.hours + 0.5 ? 0 : -10,
                                    scale: hoursBefore >= meal.hours - 0.5 && hoursBefore <= meal.hours + 0.5 ? 1.02 : 1
                                }}
                            >
                                <Paper
                                    elevation={hoursBefore >= meal.hours - 0.5 && hoursBefore <= meal.hours + 0.5 ? 3 : 0}
                                    sx={{
                                        p: 2, mb: 2,
                                        bgcolor: hoursBefore >= meal.hours - 0.5 && hoursBefore <= meal.hours + 0.5 ? '#fff' : 'rgba(0,0,0,0.02)',
                                        border: hoursBefore >= meal.hours - 0.5 && hoursBefore <= meal.hours + 0.5 ? '1px solid #2196f3' : '1px solid #eee',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Avatar sx={{ bgcolor: hoursBefore >= meal.hours - 0.5 && hoursBefore <= meal.hours + 0.5 ? 'primary.main' : '#bdbdbd' }}>
                                            {meal.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography fontWeight="bold" variant="h6">{meal.title}</Typography>
                                            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'bold' }}>{meal.desc}</Typography>
                                        </Box>
                                    </Box>

                                    {/* Expanded Details - Only show if active or explicitly expanded (can add toggle later, for now show if active) */}
                                    {hoursBefore >= meal.hours - 0.5 && hoursBefore <= meal.hours + 0.5 && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                            <Box sx={{ mt: 1, pl: 7 }}>
                                                <Typography variant="body2" paragraph>
                                                    <strong>¿Por qué?</strong> {meal.why}
                                                </Typography>
                                                <Typography variant="subtitle2" fontWeight="bold">Opciones Recomendadas:</Typography>
                                                <ul style={{ margin: 0, paddingLeft: 20 }}>
                                                    {meal.options.map((opt, i) => (
                                                        <li key={i}><Typography variant="body2">{opt}</Typography></li>
                                                    ))}
                                                </ul>
                                                <Box sx={{ mt: 1, bgcolor: '#ffebee', p: 1, borderRadius: 1 }}>
                                                    <Typography variant="caption" color="error" fontWeight="bold">EVITAR:</Typography>
                                                    <Typography variant="caption" display="block">{meal.avoid}</Typography>
                                                </Box>
                                            </Box>
                                        </motion.div>
                                    )}
                                </Paper>
                            </motion.div>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <Box sx={{ position: 'relative', height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* Fuel Tank Visualization */}
                        <svg viewBox="0 0 200 200" width="200" height="200">
                            <defs>
                                <linearGradient id="fuelGrad" x1="0" x2="0" y1="1" y2="0">
                                    <stop offset="0%" stopColor="#f44336" />
                                    <stop offset="50%" stopColor="#ff9800" />
                                    <stop offset="100%" stopColor="#4caf50" />
                                </linearGradient>
                            </defs>
                            <path d="M 40 160 A 80 80 0 1 1 160 160" fill="none" stroke="#ddd" strokeWidth="20" strokeLinecap="round" />
                            <motion.path
                                d="M 40 160 A 80 80 0 1 1 160 160"
                                fill="none"
                                stroke="url(#fuelGrad)"
                                strokeWidth="20"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: status.level / 100 }}
                                transition={{ duration: 0.8 }}
                            />
                            <text x="100" y="100" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#333">{Math.round(status.level)}%</text>
                            <text x="100" y="125" textAnchor="middle" fontSize="12" fill="#777">GLYCOGEN TANK</text>
                        </svg>
                    </Box>
                    <Typography variant="h6" sx={{ color: status.color, fontWeight: 'bold' }}>
                        {status.status}
                    </Typography>
                    <Typography gutterBottom>
                        {status.advice}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PreGameFuel;
