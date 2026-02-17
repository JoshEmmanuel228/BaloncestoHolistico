import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardActionArea, Button, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EggIcon from '@mui/icons-material/Egg';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import KitchenIcon from '@mui/icons-material/Kitchen'; // Snack

const DailyMealPlan = () => {
    const [dayType, setDayType] = useState<'training' | 'rest'>('training');
    const [selectedMeal, setSelectedMeal] = useState<string | null>('breakfast');

    const totalCalories = dayType === 'training' ? 3200 : 2600;

    // Macro targets
    const targets = dayType === 'training'
        ? { carbs: 450, protein: 180, fats: 80 }
        : { carbs: 300, protein: 180, fats: 70 };

    const meals = {
        breakfast: {
            title: 'Desayuno (7:00 AM)',
            icon: <EggIcon />,
            insight: "El desayuno rompe el ayuno nocturno y repone el glucógeno hepático. Es crucial para la función cognitiva y la energía matutina. Prioriza proteínas de alta calidad y carbohidratos complejos.",
            tips: ["Evita azúcares refinados para no tener picos de insulina.", "Incluye una fuente de grasa saludable para saciedad duradera."],
            options: [
                { name: 'Omelette 3 Huevos con Espinacas y Champiñones + Avena con Canela', carbs: 45, protein: 28, fats: 18, cals: 480 },
                { name: 'Batido de Proteína (Whey/Vegana) + Tostadas Integrales con Aguacate', carbs: 55, protein: 35, fats: 15, cals: 500 },
                { name: 'Yogur Griego con Frutos Rojos, Nueces y Semillas de Chía', carbs: 30, protein: 20, fats: 12, cals: 350 },
                { name: 'Burrito de Desayuno: Tortilla Integral, Frijoles Negros, Huevo y Salsa', carbs: 60, protein: 25, fats: 15, cals: 550 }
            ]
        },
        lunch: {
            title: 'Almuerzo (1:00 PM)',
            icon: <RestaurantIcon />,
            insight: "La comida más importante para la carga de energía sostenida. Debe ser equilibrada pero enfocada en la fácil digestión si hay entreno por la tarde.",
            tips: ["Mastica bien para facilitar la digestión.", "La mitad de tu plato deberían ser vegetales (fibra y micronutrientes)."],
            options: [
                { name: 'Pechuga de Pollo a la Parrilla (200g) + Quinoa Tricolor + Brócoli', carbs: 65, protein: 50, fats: 12, cals: 600 },
                { name: 'Pasta Integral a la Boloñesa (Carne Magra 5%) + Ensalada Verde', carbs: 85, protein: 45, fats: 18, cals: 700 },
                { name: 'Bowl de Salmón Poke: Arroz, Edamame, Aguacate y Algas', carbs: 70, protein: 35, fats: 25, cals: 650 },
                { name: 'Filete de Ternera Magra con Batata Asada y Espárragos', carbs: 50, protein: 40, fats: 20, cals: 580 }
            ]
        },
        snack: {
            title: 'Pre-Entreno / Snack (5:00 PM)',
            icon: <KitchenIcon />,
            insight: "El objetivo es disponibilidad de energía rápida sin malestar estomacal. Evita exceso de grasas y fibras justo antes de entrenar.",
            tips: ["Consume esto 60-90 minutos antes de tu sesión.", "Si es post-entreno, añade más proteína."],
            options: [
                { name: 'Plátano con Crema de Cacahuete Natural (1 cda)', carbs: 35, protein: 6, fats: 10, cals: 280 },
                { name: 'Barrita de Proteína Casera (Avena, Whey, Miel)', carbs: 30, protein: 20, fats: 8, cals: 290 },
                { name: 'Tortitas de Arroz con Pavo y Queso Fresco', carbs: 25, protein: 15, fats: 5, cals: 210 },
                { name: 'Batido de Frutas (Bayas) con 1 Scoop de Proteína', carbs: 25, protein: 25, fats: 2, cals: 220 }
            ]
        },
        dinner: {
            title: 'Cena (9:00 PM)',
            icon: <DinnerDiningIcon />,
            insight: "Enfocada en la recuperación muscular y preparación para el sueño. Los carbohidratos en la cena ayudan a liberar serotonina y mejorar el descanso.",
            tips: ["Evita comidas muy pesadas o picantes que interrumpan el sueño.", "La caseína (lácteos) o proteína lenta es excelente antes de dormir."],
            options: [
                { name: 'Filete de Salmón al Horno con Pure de Patata y Zanahoria', carbs: 40, protein: 35, fats: 22, cals: 520 },
                { name: 'Revuelto de Claras con Pavo, Espinacas y Queso Cottage', carbs: 10, protein: 35, fats: 8, cals: 280 },
                { name: 'Tacos de Pescado (Tilapia) con Ensalada de Col y Aguacate', carbs: 45, protein: 30, fats: 15, cals: 450 },
                { name: 'Sopa de Lentejas con Verduras y Trozos de Pollo', carbs: 55, protein: 35, fats: 10, cals: 480 }
            ]
        }
    };

    // State for consumed items (simple toggle logic for demo)
    const [consumed, setConsumed] = useState<string[]>(['Omelette 3 Huevos + Avena', 'Pollo (200g) + Arroz Integral', 'Plátano + Crema de Cacahuete', 'Salmón + Espárragos']);

    const toggleConsumed = (foodName: string) => {
        if (consumed.includes(foodName)) {
            setConsumed(consumed.filter(c => c !== foodName));
        } else {
            setConsumed([...consumed, foodName]);
        }
    };

    // Calculate totals
    let current = { carbs: 0, protein: 0, fats: 0, cals: 0 };
    Object.values(meals).forEach(mealGroup => {
        mealGroup.options.forEach(opt => {
            if (consumed.includes(opt.name)) {
                current.carbs += opt.carbs;
                current.protein += opt.protein;
                current.fats += opt.fats;
                current.cals += opt.cals;
            }
        });
    });

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#fff', borderRadius: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">Planificador Nutricional 360°</Typography>
                <Box>
                    <Button
                        variant={dayType === 'training' ? 'contained' : 'outlined'}
                        onClick={() => setDayType('training')}
                        sx={{ mr: 1, borderRadius: 4 }}
                        color="primary"
                    >
                        Día de Entreno
                    </Button>
                    <Button
                        variant={dayType === 'rest' ? 'contained' : 'outlined'}
                        onClick={() => setDayType('rest')}
                        sx={{ borderRadius: 4 }}
                        color="secondary"
                    >
                        Día de Descanso
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={4}>
                {/* TIMELINE / MEAL SELECTOR */}
                <Grid item xs={12} md={7}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3, overflowX: 'auto', pb: 1 }}>
                        {Object.entries(meals).map(([key, meal]) => (
                            <Card
                                key={key}
                                sx={{
                                    minWidth: 140,
                                    cursor: 'pointer',
                                    border: selectedMeal === key ? '2px solid #1976d2' : '1px solid #eee',
                                    transform: selectedMeal === key ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'all 0.3s'
                                }}
                                onClick={() => setSelectedMeal(key)}
                            >
                                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                    <Box sx={{ color: selectedMeal === key ? 'primary.main' : 'text.secondary' }}>
                                        {meal.icon}
                                    </Box>
                                    <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                                        {meal.title.split(' ')[0]}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {meal.title.split('(')[1].replace(')', '')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Typography variant="h6" gutterBottom color="primary.main">
                        {meals[selectedMeal as keyof typeof meals].title}
                    </Typography>

                    {/* Insights Section */}
                    <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: '#e3f2fd', borderRadius: 2, borderLeft: '4px solid #1976d2' }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                            <strong>Ciencia:</strong> {meals[selectedMeal as keyof typeof meals].insight}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            {meals[selectedMeal as keyof typeof meals].tips.map((tip, i) => (
                                <Typography key={i} variant="caption" display="block" color="text.secondary">
                                    • {tip}
                                </Typography>
                            ))}
                        </Box>
                    </Paper>

                    <Grid container spacing={2}>
                        {meals[selectedMeal as keyof typeof meals].options.map((option, idx) => (
                            <Grid item xs={12} key={idx}>
                                <CardActionArea onClick={() => toggleConsumed(option.name)}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            bgcolor: consumed.includes(option.name) ? '#f0f4c3' : '#fff',
                                            borderLeft: consumed.includes(option.name) ? '6px solid #827717' : '6px solid transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Box>
                                            <Typography fontWeight="bold" variant="subtitle1">{option.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {option.cals} kcal | <span style={{ color: '#1976d2' }}>C: {option.carbs}g</span> <span style={{ color: '#d32f2f' }}>P: {option.protein}g</span> <span style={{ color: '#fbc02d' }}>F: {option.fats}g</span>
                                            </Typography>
                                        </Box>
                                        <Box>
                                            {consumed.includes(option.name) && <LocalDiningIcon color="primary" />}
                                        </Box>
                                    </Paper>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* MACRO VISUALIZER */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={0} sx={{ p: 3, bgcolor: '#fafafa', borderRadius: 4, height: '100%' }}>
                        <Typography variant="h6" gutterBottom textAlign="center">Objetivos Diarios</Typography>

                        <Box sx={{ position: 'relative', width: 200, height: 200, margin: '0 auto', mb: 4 }}>
                            {/* Simple SVG Donut Chart */}
                            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#eee" strokeWidth="10" />
                                <motion.circle
                                    cx="50" cy="50" r="40" fill="none" stroke="#1976d2" strokeWidth="10"
                                    strokeDasharray="251"
                                    initial={{ strokeDashoffset: 251 }}
                                    animate={{ strokeDashoffset: 251 - (251 * Math.min(1, current.cals / totalCalories)) }}
                                    transition={{ duration: 1 }}
                                />
                            </svg>
                            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="h4" fontWeight="bold">{current.cals}</Typography>
                                <Typography variant="caption" color="text.secondary">/ {totalCalories} kcal</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2">Proteína</Typography>
                                <Typography variant="body2" fontWeight="bold">{current.protein} / {targets.protein}g</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={Math.min(100, (current.protein / targets.protein) * 100)} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2">Carbohidratos</Typography>
                                <Typography variant="body2" fontWeight="bold">{current.carbs} / {targets.carbs}g</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={Math.min(100, (current.carbs / targets.carbs) * 100)} color="primary" sx={{ height: 8, borderRadius: 4 }} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2">Grasas</Typography>
                                <Typography variant="body2" fontWeight="bold">{current.fats} / {targets.fats}g</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={Math.min(100, (current.fats / targets.fats) * 100)} color="warning" sx={{ height: 8, borderRadius: 4 }} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DailyMealPlan;
