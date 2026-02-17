import { useState } from 'react';
import { Box, Typography, Paper, Grid, Accordion, AccordionSummary, AccordionDetails, Chip, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import ScienceIcon from '@mui/icons-material/Science';
import SpaIcon from '@mui/icons-material/Spa';

const HolisticNutritionReport = () => {
    const [activeLayer, setActiveLayer] = useState<string | null>(null);

    return (
        <Box>
            {/* Header Section */}
            <Paper
                elevation={0}
                sx={{
                    p: 6, mb: 4,
                    background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                    borderRadius: 4,
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Chip label="Informe Premium" color="warning" sx={{ mb: 2 }} />
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Nutrición Holística de Alto Rendimiento
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800 }}>
                        La guía definitiva para convertir tu alimentación en tu mayor ventaja competitiva.
                        Ciencia, timing y bienestar mental integrados.
                    </Typography>
                </motion.div>

                {/* Decorative circle */}
                <Box sx={{ position: 'absolute', top: -50, right: -50, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Paper>

            <Grid container spacing={4}>
                {/* Main Content Column */}
                <Grid item xs={12} md={8}>

                    {/* Section 1: Philosophy */}
                    <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SpaIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
                            <Typography variant="h5" fontWeight="bold">Filosofía: Más allá de las Calorías</Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                        <Typography paragraph sx={{ lineHeight: 1.8 }}>
                            En el baloncesto de élite, la nutrición no es solo combustible; es señalización molecular.
                            Lo que comes le dice a tus genes cómo expresarse, a tus músculos cómo recuperarse y a tu cerebro cómo enfocarse.
                        </Typography>
                        <Typography paragraph sx={{ lineHeight: 1.8 }}>
                            Abordamos la nutrición desde tres pilares: <strong>Biodisponibilidad</strong> (calidad real), <strong>Crononutrición</strong> (timing exacto) y <strong>Psiconutrición</strong> (relación con la comida).
                        </Typography>
                    </Paper>

                    {/* Section 2: Supplement Pyramid Interaction */}
                    <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: '#fafafa' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ScienceIcon color="secondary" sx={{ mr: 1, fontSize: 30 }} />
                            <Typography variant="h5" fontWeight="bold">Pirámide de Suplementación & Bio-Hacking</Typography>
                        </Box>
                        <Typography variant="body2" paragraph>Haz clic en los niveles para desplegar el arsenal bioquímico.</Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, my: 4 }}>
                            {/* Level 4: Cellular Optimization (New) */}
                            <motion.div whileHover={{ scale: 1.05 }} style={{ width: '30%' }}>
                                <Paper
                                    sx={{
                                        p: 1.5, textAlign: 'center',
                                        background: activeLayer === 'cellular' ? 'linear-gradient(90deg, #aa00ff 0%, #6200ea 100%)' : '#7c4dff',
                                        color: 'white', cursor: 'pointer',
                                        clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
                                        boxShadow: activeLayer === 'cellular' ? '0 0 20px #d500f9' : 'none'
                                    }}
                                    onClick={() => setActiveLayer(activeLayer === 'cellular' ? null : 'cellular')}
                                >
                                    <Typography fontWeight="bold" fontSize="0.8rem">Optimización Celular</Typography>
                                </Paper>
                            </motion.div>

                            {/* Level 3: Performance */}
                            <motion.div whileHover={{ scale: 1.05 }} style={{ width: '50%' }}>
                                <Paper
                                    sx={{
                                        p: 1.5, textAlign: 'center', bgcolor: activeLayer === 'performance' ? '#d50000' : '#ff1744', color: 'white', cursor: 'pointer',
                                        clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
                                    }}
                                    onClick={() => setActiveLayer(activeLayer === 'performance' ? null : 'performance')}
                                >
                                    <Typography fontWeight="bold">Rendimiento (Ergogénicos)</Typography>
                                </Paper>
                            </motion.div>

                            {/* Level 2: Health */}
                            <motion.div whileHover={{ scale: 1.05 }} style={{ width: '70%' }}>
                                <Paper
                                    sx={{
                                        p: 1.5, textAlign: 'center', bgcolor: activeLayer === 'health' ? '#1976d2' : '#42a5f5', color: 'white', cursor: 'pointer',
                                        clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
                                    }}
                                    onClick={() => setActiveLayer(activeLayer === 'health' ? null : 'health')}
                                >
                                    <Typography fontWeight="bold">Salud Sistémica</Typography>
                                </Paper>
                            </motion.div>

                            {/* Level 1: Basics */}
                            <motion.div whileHover={{ scale: 1.05 }} style={{ width: '90%' }}>
                                <Paper
                                    sx={{
                                        p: 1.5, textAlign: 'center', bgcolor: activeLayer === 'basics' ? '#388e3c' : '#66bb6a', color: 'white', cursor: 'pointer',
                                        clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'
                                    }}
                                    onClick={() => setActiveLayer(activeLayer === 'basics' ? null : 'basics')}
                                >
                                    <Typography fontWeight="bold">Fundamentos (La Base)</Typography>
                                </Paper>
                            </motion.div>
                        </Box>

                        {/* Detail View */}
                        <AnimatePresence mode='wait'>
                            {activeLayer && (
                                <motion.div
                                    key={activeLayer}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, border: '1px solid #eee', boxShadow: 3 }}>
                                        {activeLayer === 'cellular' && (
                                            <>
                                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6200ea' }} gutterBottom>
                                                    🧬 Bio-Hacking y Longevidad
                                                </Typography>
                                                <Typography variant="body2" paragraph sx={{ fontStyle: 'italic' }}>
                                                    "Moléculas avanzadas para protección del ADN, eficiencia mitocondrial y gestión inflamatoria de élite."
                                                </Typography>
                                                <Divider sx={{ mb: 2 }} />

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={6}>
                                                        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f3e5f5', borderLeft: '3px solid #ab47bc' }}>
                                                            <Typography fontWeight="bold" color="secondary">Astaxantina (AXCAHANITA)</Typography>
                                                            <Typography variant="caption" display="block" color="text.secondary">Dosis: 4-12mg/día</Typography>
                                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                                El antioxidante más potente de la naturaleza (6,000x más fuerte que la Vit C). Protege la membrana mitocondrial durante el estrés oxidativo extremo del partido.
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Paper elevation={0} sx={{ p: 2, bgcolor: '#e0f7fa', borderLeft: '3px solid #26c6da' }}>
                                                            <Typography fontWeight="bold" color="primary">Fucoxantina & Fucoidano</Typography>
                                                            <Typography variant="caption" display="block" color="text.secondary">Origen: Algas Marinas Marrones</Typography>
                                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                                Activadores metabólicos que inducen la expresión de la proteína UCP1 (termogénesis no temblorosa) y modulan la respuesta inmune innata.
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Paper elevation={0} sx={{ p: 2, bgcolor: '#e8f5e9', borderLeft: '3px solid #66bb6a' }}>
                                                            <Typography fontWeight="bold" color="success.main">CBD (Cannabidiol) Broad Spectrum</Typography>
                                                            <Typography variant="caption" display="block" color="text.secondary">Dosis: 30-50mg Post-Entreno/Noche</Typography>
                                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                                Potente neuroprotector. Reduce la ansiedad competitiva sin psicoactividad. Modula los receptores de dolor (TRPV1) y mejora la arquitectura del sueño profundo.
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        )}
                                        {activeLayer === 'performance' && (
                                            <>
                                                <Typography variant="h6" color="error" gutterBottom>🚀 Nivel 3: Rendimiento (Ergogénicos)</Typography>
                                                <Typography variant="body2" paragraph>Suplementos Grado-A con impacto directo en W (Vatios) y Potencia.</Typography>
                                                <Divider sx={{ mb: 2 }} />
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="subtitle2" fontWeight="bold">Creatina Monohidrato (Creapure®):</Typography>
                                                    <Typography variant="caption" color="text.secondary">Dosis: 5g diarios (Sin fase de carga necesaria).</Typography>
                                                    <Typography variant="body2">Satura los depósitos de Fosfocreatina (PCr) para esfuerzos explosivos de &lt; 10s. Neuroprotector clave en deportes de contacto.</Typography>
                                                </Box>
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="subtitle2" fontWeight="bold">Cafeína Anhidra:</Typography>
                                                    <Typography variant="caption" color="text.secondary">3-6mg/kg (45 min antes).</Typography>
                                                    <Typography variant="body2">Antagonista de la adenosina. Reduce la percepción de esfuerzo (RPE) y aumenta el reclutamiento de unidades motoras.</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight="bold">Beta-Alanina:</Typography>
                                                    <Typography variant="body2">Aumenta la carnosina intramuscular, actuando como buffer de pH ante la acidosis láctica.</Typography>
                                                </Box>
                                            </>
                                        )}
                                        {activeLayer === 'health' && (
                                            <>
                                                <Typography variant="h6" color="primary" gutterBottom>🛡️ Nivel 2: Salud y Prevención</Typography>
                                                <Divider sx={{ mb: 2 }} />
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="subtitle2" fontWeight="bold">Vitamina D3 (5000UI) + K2 (MK-7):</Typography>
                                                    <Typography variant="body2">Hormona esteroidea disfrazada de vitamina. Regula +200 genes, incluyendo función inmune y fuerza muscular.</Typography>
                                                </Box>
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="subtitle2" fontWeight="bold">Omega-3 (IFOS 5-Star):</Typography>
                                                    <Typography variant="body2">Ratio EPA/DHA alto (2:1). Reduce la inflamación sistémica crónica de bajo grado.</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight="bold">Magnesio Bisglicinato/Treonato:</Typography>
                                                    <Typography variant="body2">El mineral "maestro". Interviene en 300 reacciones enzimáticas. Clave para la relajación CNS.</Typography>
                                                </Box>
                                            </>
                                        )}
                                        {activeLayer === 'basics' && (
                                            <>
                                                <Typography variant="h6" color="success.main" gutterBottom>🥗 Nivel 1: Los Fundamentos</Typography>
                                                <Divider sx={{ mb: 2 }} />
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle2" fontWeight="bold">Proteína de Suero (Whey Isolate):</Typography>
                                                        <Typography variant="body2">Rápida absorción post-entreno. Alta en Leucina para activar mTOR.</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle2" fontWeight="bold">Aminoácidos Esenciales (EAA):</Typography>
                                                        <Typography variant="body2">Superiores a los BCAA aislados. Útiles intra-entreno si la sesión &gt; 90 min.</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle2" fontWeight="bold">Carbohidratos (Ciclado):</Typography>
                                                        <Typography variant="body2">Alto en días de pierna/partido, bajo en días de descanso. Flexibilidad metabólica.</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle2" fontWeight="bold">Hidratación + Electrolitos:</Typography>
                                                        <Typography variant="body2">Sodio es el rey. 500-1000mg de sodio por litro de sudor perdido.</Typography>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        )}
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Paper>

                    {/* Section 4: Superfoods for Basketball */}
                    <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h5" fontWeight="bold">Superalimentos para el Rendimiento</Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                        <Grid container spacing={2}>
                            {[
                                { name: 'Jugo de Remolacha', benefit: 'Aumenta el flujo sanguíneo y la resistencia (Óxido Nítrico).' },
                                { name: 'Cúrcuma + Pimienta', benefit: 'Potente antiinflamatorio natural para recuperación post-partido.' },
                                { name: 'Jugo de Cereza Ácida', benefit: 'Reduce el dolor muscular y mejora la calidad del sueño.' },
                                { name: 'Semillas de Chía', benefit: 'Hidratación prolongada y Omega-3.' }
                            ].map((item, idx) => (
                                <Grid item xs={12} sm={6} key={idx}>
                                    <Box sx={{ p: 2, bgcolor: '#f1f8e9', borderRadius: 2 }}>
                                        <Typography fontWeight="bold" color="primary.main">{item.name}</Typography>
                                        <Typography variant="body2">{item.benefit}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>

                    {/* Section 5: Crononutrición (Meal Timing) */}
                    <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3, borderLeft: '6px solid #ff9800' }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>Timing Nutricional (Crononutrición)</Typography>
                        <Typography paragraph>
                            No es solo qué comes, sino <strong>cuándo</strong> lo comes.
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">3-4 Horas Antes (Carga Grande):</Typography>
                                <Typography variant="body2">Carbohidratos complejos + Proteína moderada. (Ej: Pasta con Pollo).</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">1 Hora Antes (Topping):</Typography>
                                <Typography variant="body2">Carbohidratos simples, bajo en fibra. (Ej: Plátano, Tostada con mermelada).</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Intra-Entreno (+60 min):</Typography>
                                <Typography variant="body2">Bebida isotónica o geles si la intensidad es máxima.</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Ventana Anabólica (Post-Entreno):</Typography>
                                <Typography variant="body2">La prioridad es la reposición de glucógeno y la síntesis proteica en las primeras 2 horas.</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Section 3: Recovery Protocol */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" fontWeight="bold">Protocolo de Recuperación 4R</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                {['Rehidratar', 'Reponer', 'Reparar', 'Relajar'].map((r, i) => (
                                    <Grid key={i} item xs={6} md={3}>
                                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                                            <Typography variant="h5" color="primary" fontWeight="bold">{r}</Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ mt: 2 }}>
                                <ul>
                                    <li><strong>Rehidratar:</strong> Agua + Electrolitos inmediatamente.</li>
                                    <li><strong>Reponer:</strong> Glucógeno muscular (Carbohidratos rápidos).</li>
                                    <li><strong>Reparar:</strong> Tejido muscular (Proteína rápida - Whey).</li>
                                    <li><strong>Relajar:</strong> Sistema nervioso (Magnesio, Sueño).</li>
                                </ul>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, bgcolor: '#212121', color: 'white', borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <StarIcon sx={{ color: '#ffd700', mr: 1 }} />
                            <Typography variant="h6">Reglas de Oro</Typography>
                        </Box>
                        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                            <li>Nunca pruebes algo nuevo el día del partido.</li>
                            <li>La hidratación empieza el día anterior.</li>
                            <li>Más colores en el plato = más micronutrientes.</li>
                            <li>El suplemento más fuerte es el sueño (8h+).</li>
                        </ul>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HolisticNutritionReport;
