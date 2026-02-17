import { useState } from 'react';
import { Box, Typography, Paper, Grid, Chip, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { motion } from 'framer-motion';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HotelIcon from '@mui/icons-material/Hotel';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EliteTravelNutrition = () => {
    const [scenario, setScenario] = useState('airport');

    const scenarios = {
        airport: {
            title: 'Aeropuerto / Vuelo Nacional',
            icon: <FlightTakeoffIcon fontSize="large" />,
            color: '#2196f3',
            tips: [
                "Hidratación x2: La humedad en cabina es <20% (desierto). Compra 1L de agua CADA 3 horas de vuelo.",
                "Snack TSA-Proof: Lleva sándwiches secos, nueces, cecina, barritas, fruta entera (que no requiera corte).",
                "Evita el 'Airplane Mode' gástrico: La presurización expande los gases un 30%. Evita bebidas con gas y chicles."
            ],
            options: [
                { type: 'Oro', desc: 'Tu propio tupper: Pollo, Arroz, Veggies (pasa seguridad sin líquidos).' },
                { type: 'Plata', desc: 'Ensaladas "Grab & Go" (ojo con el aderezo, úsalo a la mitad).' },
                { type: 'Bronce', desc: 'Sándwich de pavo/pollo. Quita una tapa de pan para reducir carga glucémica si estás sentado.' }
            ]
        },
        intl_flight: {
            title: 'Vuelo Internacional (+6h) / Jet Lag',
            icon: <FlightTakeoffIcon fontSize="large" />,
            color: '#303f9f',
            tips: [
                "Ayuno Estratégico: Si llegas de mañana, NO comas en el avión hasta el desayuno 'hora destino'.",
                "Café Táctico: Solo si es de mañana en tu destino. Nunca alcohol (destruye calidad de sueño post-vuelo).",
                "Movimiento: Levántate cada 90 min. 'Calf raises' en el sitio para prevenir trombos."
            ],
            options: [
                { type: 'La Clave', desc: 'Sincroniza tu comida con el horario de DESTINO nada más subir.' },
                { type: 'Suplementos', desc: 'Melatonina (llegada noche), Magnesio (en vuelo), Electrolitos (polvo).' },
                { type: 'Evitar', desc: 'Alcohol (te duerme rápido pero te despierta deshidratado a las 3h).' }
            ]
        },
        roadtrip: {
            title: 'Autobús / Coche (+4h)',
            icon: <DirectionsBusIcon fontSize="large" />,
            color: '#ff9800',
            tips: [
                "La Regla del Tupper Frío: Pasta, arroz o quinoa se comen bien fríos. Inversión en nevera portátil.",
                "Snacking por aburrimiento: El cerebro confunde inactividad con hambre. Chicles sin azúcar o agua con gas.",
                "Paradas Activas: 5 min de caminar/estirar cada parada sanitaria es no-negociable."
            ],
            options: [
                { type: 'Gasolinera VIP', desc: 'Fruta fresca (cesta), Nueces crudas, Yogur bebible (sin azúcar añadido), Huevos duros (envasados).' },
                { type: 'Supervivencia', desc: 'Bocadillo de máquina (mira fecha). Tira el pan sobrante.' },
                { type: 'Zona Roja', desc: 'Bolsas grandes de Doritos/Pringles (diseñadas para no poder parar).' }
            ]
        },
        tournament: {
            title: 'Fin de Semana de Torneo (3-4 partidos)',
            icon: <SportsBasketballIcon fontSize="large" />,
            color: '#d32f2f',
            tips: [
                "Re-Carga Inmediata: Tienes <1h tras el partido para rellenar glucógeno. Batido/Fruta en el vestuario.",
                "Cena de Sábado: Pasta/Arroz + Pollo. Nada de experimentos gastronómicos ni picantes.",
                "Desayuno Domingo: Si juegas temprano, digerible (papilla, tostada). Si es tarde, mete huevo/proteína."
            ],
            options: [
                { type: 'Post-Game', desc: 'Leche con chocolate (ratio 3:1 perfecto), Plátano, Sándwich mermelada y pavo.' },
                { type: 'Cena Equipo', desc: 'Pide DOS platos de carbohidratos. Evita postres cremosos.' },
                { type: 'Peligro', desc: 'Pizza grasienta post-partido (retrasa digestión y recuperación).' }
            ]
        },
        hotel: {
            title: 'Desayuno Buffet de Hotel',
            icon: <HotelIcon fontSize="large" />,
            color: '#9c27b0',
            tips: [
                "Constructor de Plato: 1/4 Fruta, 1/4 Huevos/Pavo, 1/2 Pan/Avena/Cereales (si vas a jugar).",
                "Huevos: Pide tortilla francesa (hecha al momento) > Huevos revueltos (suelen ser de polvo o llevar nata).",
                "Café: Cuidado con las máquinas automáticas (el 'Capuchino' es 50% azúcar)."
            ],
            options: [
                { type: 'Campeón', desc: 'Tortilla, 2 Tostadas, Fruta, Yogur natural.' },
                { type: 'Mantenimiento', desc: 'Cereal (Corn Flakes/Avena) con leche y fruta.' },
                { type: 'Trampa', desc: 'Croissants, Muffins, Cereales de chocolate (energía inestable).' }
            ]
        }
    };

    const fastFoodSurvival = [
        { chain: "McDonald's / Burger King", order: "Hamburguesa simple x2 (Queso opcional) O Hamburguesa Pollo (Grilled).", side: "Ensalada de huerta (aderezo 1/2).", drink: "Agua o Coca-Cola Zero.", avoid: "Patatas Fritas (Sodio+Grasa), Helados, Batidos, Bacon." },
        { chain: "Subway", order: "15-30cm Pan Integral o Avena. Proteína Doble (Pollo/Pavo).", side: "TODOS los vegetales frescos.", drink: "Agua.", avoid: "Salsas cremosas (Ranch, Mayo, Chipotle). Usa Mostaza o Vinagre." },
        { chain: "Pizzería", order: "Masa Fina (Thin Crust).", side: "Toppings: Pollo, Jamón, Piña, Pimientos, Champiñones.", drink: "Agua.", avoid: "Bordes rellenos, 'Meat Lovers' (exceso grasa), Extra Queso, Pan de ajo." },
        { chain: "Chipotle / Mexicano", order: "Burrito Bowl (Sin tortilla). Arroz integral. Frijoles negros.", side: "Pollo/Ternera. Fajita veggies. Guacamole (Grasa OK).", drink: "Agua con limón.", avoid: "Totopos (Chips), Queso extra, Crema agria." },
        { chain: "Panda Express / Asiático", order: "Arroz Blanco al vapor (Steamed).", side: "Teriyaki Chicken (Salsa aparte), Broccoli Beef.", drink: "Té verde.", avoid: "Fried Rice, Chow Mein, Orange Chicken (todo rebozado en azúcar)." },
        { chain: "Starbucks / Café", order: "Oatmeal (Avena) con nueces/fruta seca.", side: "Egg & Gouda Sandwich, Wrap de Feta y Espinacas.", drink: "Cold Brew, Americano, Té.", avoid: "Frappuccinos (40-60g azúcar), Bakery Muffins (bombas calóricas)." }
    ];

    const pantryList = [
        "Avena instantánea (sobres)", "Proteína Whey (monodosis)", "Atún/Pollo en sobre (no lata)",
        "Mantequilla de cacahuete", "Nueces/Almendras (natural)", "Cecina (Beef Jerky)",
        "Barritas de proteínas (bajas en azúcar)", "Multivitamínico + Magnesio"
    ];

    const activeScenario = scenarios[scenario as keyof typeof scenarios];

    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: '#1a237e' }}>
                🥑 Elite Travel Nutrition v2.0
            </Typography>
            <Typography paragraph color="text.secondary">
                Manual operativo para mantener el rendimiento biológico en entornos hostiles (Aeropuertos, Carretera, Hoteles).
            </Typography>

            {/* Scenario Selector */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: '#f5f5f5' }}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="scenario-label" sx={{ bgcolor: 'white', px: 1 }}>Selecciona tu Situación Actual</InputLabel>
                    <Select
                        labelId="scenario-label"
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value)}
                    >
                        <MenuItem value="airport">✈️ Aeropuerto (Nacional)</MenuItem>
                        <MenuItem value="intl_flight">🌍 Vuelo Internacional (Jet Lag)</MenuItem>
                        <MenuItem value="roadtrip">🚌 Autobús / Carretera</MenuItem>
                        <MenuItem value="tournament">🏆 Fin de Semana de Torneo</MenuItem>
                        <MenuItem value="hotel">🏨 Desayuno de Hotel</MenuItem>
                    </Select>
                </FormControl>

                <motion.div
                    key={scenario}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 3, height: '100%', bgcolor: activeScenario.color, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 2 }}>
                                {activeScenario.icon}
                                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, textAlign: 'center' }}>{activeScenario.title}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ mb: 3 }}>
                                {activeScenario.tips.map((tip, idx) => (
                                    <Paper key={idx} sx={{ p: 1.5, mb: 1, bgcolor: '#fff', borderLeft: `5px solid ${activeScenario.color}`, boxShadow: 1 }}>
                                        <Typography variant="body2"><strong>💡 Tip Táctico:</strong> {tip}</Typography>
                                    </Paper>
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {activeScenario.options.map((opt, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: 1 }}>
                                        <Chip
                                            label={opt.type}
                                            size="small"
                                            color={['Oro', 'La Clave', 'Gasolinera VIP', 'Post-Game', 'Campeón'].includes(opt.type) ? 'success' : ['Bronce', 'Peligro', 'Zona Roja', 'Evitar', 'Trampa'].includes(opt.type) ? 'error' : 'warning'}
                                            sx={{ minWidth: 110, fontWeight: 'bold' }}
                                        />
                                        <Typography variant="body2">{opt.desc}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </motion.div>
            </Paper>

            {/* Expanded Fast Food Survival Guide */}
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mt: 5, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <FastfoodIcon color="error" fontSize="large" /> Guía de Supervivencia: Fast Food
            </Typography>
            <Typography paragraph variant="body2" color="text.secondary">
                Protocolo de reducción de daños. Si no queda otra opción, ejecuta estas órdenes de compra.
            </Typography>

            <Grid container spacing={2}>
                {fastFoodSurvival.map((item, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight="bold" sx={{ color: '#d32f2f' }}>{item.chain}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ bgcolor: '#ffebee' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2">✅ <strong>Pide:</strong> {item.order}</Typography>
                                    {item.side && <Typography variant="body2">🥗 <strong>Lado:</strong> {item.side}</Typography>}
                                    <Typography variant="body2">🚫 <strong>Evita:</strong> {item.avoid}</Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))}
            </Grid>

            {/* Travelers Pantry */}
            <Paper sx={{ mt: 5, p: 3, bgcolor: '#e3f2fd', borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    🎒 La Despensa Portátil (Kit de Viaje)
                </Typography>
                <Typography variant="caption" display="block" sx={{ mb: 2 }}>Cosas que SIEMPRE deberían ir en tu maleta de mano.</Typography>
                <Grid container spacing={1}>
                    {pantryList.map((item, idx) => (
                        <Grid item xs={6} sm={4} md={3} key={idx}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                                <Typography variant="body2">{item}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
};

export default EliteTravelNutrition;
