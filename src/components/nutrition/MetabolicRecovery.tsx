import { useState } from 'react';
import { Box, Typography, Paper, Grid, Switch, FormControlLabel, Slider, Chip, Collapse } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import HealingIcon from '@mui/icons-material/Healing';
import SpaIcon from '@mui/icons-material/Spa';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const InflammationItem = ({ item, type }: { item: any, type: 'anti' | 'pro' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isAnti = type === 'anti';
    const color = isAnti ? 'success' : 'error';
    const bgColor = isAnti ? '#f1f8e9' : '#ffebee';
    const barColor = isAnti ? '#4caf50' : '#ef5350';
    const value = isAnti ? item.power : item.risk;

    return (
        <Box
            onClick={() => setIsOpen(!isOpen)}
            sx={{
                mb: 2,
                p: 1.5,
                bgcolor: bgColor,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { transform: 'scale(1.02)', boxShadow: 1 }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography fontWeight="bold" variant="subtitle2" sx={{ color: isAnti ? '#1b5e20' : '#b71c1c' }}>
                    {item.food}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="caption" fontWeight="bold" color={`${color}.main`}>
                        {isAnti ? '+' : '-'}{value}%
                    </Typography>
                    {isOpen ? <ExpandLessIcon fontSize="small" color="action" /> : <ExpandMoreIcon fontSize="small" color="action" />}
                </Box>
            </Box>
            <Slider
                value={value}
                disabled
                sx={{
                    color: barColor,
                    p: 0,
                    height: 4,
                    '& .MuiSlider-thumb': { width: 0, height: 0 },
                    '& .MuiSlider-track': { border: 'none' }
                }}
            />
            <Collapse in={isOpen}>
                <Box sx={{ mt: 1.5, pt: 1, borderTop: `1px dashed ${isAnti ? '#a5d6a7' : '#ef9a9a'}` }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
                        {item.desc}
                    </Typography>
                </Box>
            </Collapse>
        </Box>
    );
};

const MetabolicRecovery = () => {
    const [injuryMode, setInjuryMode] = useState(false);

    // Expanded Anti-Inflammatory List
    const antiInflammatory = [
        { food: "Cúrcuma + Pimienta Negra", power: 98, desc: "La curcumina (500mg) reduce TNF-alfa. La pimienta aumenta absorción 2000%." },
        { food: "Jengibre Fresco", power: 88, desc: "Gingeroles actúan como COX-2 inhibidores (similar al Ibuprofeno)." },
        { food: "Omega-3 (EPA/DHA)", power: 95, desc: "Resolvinas y protectinas que 'apagan' la inflamación celular." },
        { food: "Cerezas Ácidas (Tart Cherry)", power: 92, desc: "Reduce dolor muscular post-esfuerzo y mejora sueño (Melatonina natural)." },
        { food: "Té Verde (Matcha)", power: 85, desc: "EGCG protege contra el estrés oxidativo y daño celular." },
        { food: "Ajo Envejecido", power: 82, desc: "Compuestos azufrados que mejoran la circulación y la inmunidad." },
        { food: "Piña (Bromelaína)", power: 80, desc: "Enzima proteolítica que ayuda a reabsorber edemas y hematomas." }
    ];

    // Expanded Pro-Inflammatory List
    const proInflammatory = [
        { food: "Grasas Trans / Hidrogenadas", risk: 100, desc: "Margarina, bollería. Daño directo al endotelio vascular." },
        { food: "Aceites de Semillas (Soja/Maíz)", risk: 92, desc: "Exceso de Omega-6 compite con el Omega-3 y genera ácido araquidónico." },
        { food: "Alcohol (Etanol)", risk: 98, desc: "Tóxico celular. Inhibe síntesis proteica (-30%) y hormona crecimiento." },
        { food: "Jarabe de Maíz (HFCS)", risk: 90, desc: "Fructosa industrial que esteatosis hepática e inflamación visceral." },
        { food: "Carnes Procesadas (Nitratos)", risk: 85, desc: "Salchichas, embutidos baratos. Estrés nitrosativo." },
        { food: "Gluten (si hay sensibilidad)", risk: 75, desc: "Puede aumentar permeabilidad intestinal (Zonulina) y fatiga sistémica." }
    ];

    // Vastly Expanded Injury Protocols
    const injuryProtocol = {
        muscle: {
            title: "Desgarro Muscular / Tejido Blando",
            icon: <HealingIcon fontSize="inherit" />,
            nutrients: [
                { name: "Proteína Total", amount: "2.3g/kg", why: "Crucial para evitar atrofia por desuso. Leucina alta (3g) por comida." },
                { name: "Creatina", amount: "5g-10g/día", why: "Mantiene la carga energética celular y reduce pérdida de masa." },
                { name: "Omega-3", amount: "4g/día", why: "Dosis alta terapéutica para modular la fase inflamatoria aguda." },
                { name: "HMB", amount: "3g/día", why: "Metabolito de leucina, potente anti-catabólico en reposo." }
            ]
        },
        bone: {
            title: "Fractura Ósea / Estrés",
            icon: <HealingIcon fontSize="inherit" />,
            nutrients: [
                { name: "Calcio", amount: "1200mg", why: "Base mineral. Mejor de fuentes reales (Lácteos, Sardinas) o Citrato." },
                { name: "Vitamina D3", amount: "5000 UI", why: "Imprescindible para absorción de calcio. Testar niveles en sangre." },
                { name: "Vitamina K2 (MK-7)", amount: "100mcg", why: "Redirige el calcio al hueso y no a las arterias." },
                { name: "Colágeno + Vit C", amount: "15g Pre-rehab", why: "La Vit C (500mg) activa la síntesis de colágeno en la matriz ósea." }
            ]
        },
        tendon: {
            title: "Tendinopatía / Ligamentos",
            icon: <HealingIcon fontSize="inherit" />,
            nutrients: [
                { name: "Colágeno Hidrolizado", amount: "15g", why: "Tomar 40-60 min ANTES de la rehabilitación para llegar al tejido." },
                { name: "Vitamina C", amount: "500mg", why: "Cofactor obligatorio para cruzar las fibras de colágeno." },
                { name: "Glicina", amount: "Extra 5g", why: "Aminoácido principal del tejido conectivo. Ayuda nocturna." },
                { name: "Cobre", amount: "2mg", why: "Ayuda a la formación de elastina." }
            ]
        },
        concussion: {
            title: "Conmoción Cerebral (Concussion)",
            icon: <HealingIcon fontSize="inherit" />,
            nutrients: [
                { name: "Creatina", amount: "10g/día", why: "Neuroprotector crítico. Mantiene ATP cerebral post-impacto." },
                { name: "DHA (Omega-3)", amount: "2-3g/día", why: "Estructural para membranas neuronales. Anti-inflamatorio cerebral." },
                { name: "Magnesio Treonato", amount: "400mg", why: "Única forma que cruza eficientemente la barrera hematoencefálica." },
                { name: "NAC", amount: "600mg", why: "Precursor de Glutatión, antioxidante maestro cerebral." }
            ]
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#2e7d32' }}>
                        🌿 Cura Metabólica Profunda
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Protocolos clínicos para optimización y rehabilitación</Typography>
                </Box>
                <FormControlLabel
                    control={<Switch checked={injuryMode} onChange={() => setInjuryMode(!injuryMode)} color="error" />}
                    label={
                        <Box sx={{ bgcolor: injuryMode ? '#ffebee' : 'transparent', p: 1, borderRadius: 2, border: injuryMode ? '1px solid red' : '1px solid transparent' }}>
                            <Typography fontWeight="bold" color={injuryMode ? 'error' : 'text.secondary'}>
                                {injuryMode ? "🚨 MODO LESIÓN: ACTIVO" : "✅ Modo: Rendimiento"}
                            </Typography>
                        </Box>
                    }
                />
            </Box>

            <AnimatePresence mode='wait'>
                {injuryMode ? (
                    <motion.div
                        key="injury"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <Paper elevation={4} sx={{ p: 3, mb: 4, bgcolor: '#ffebee', border: '2px solid #ef5350' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <LocalHospitalIcon color="error" sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="h5" fontWeight="bold" color="error">Protocolos de Rehabilitación Metabólica</Typography>
                                    <Typography variant="body2">Nutrición de precisión para acelerar tiempos biológicos de curación.</Typography>
                                </Box>
                            </Box>

                            <Grid container spacing={3}>
                                {Object.entries(injuryProtocol).map(([key, protocol]) => (
                                    <Grid item xs={12} md={6} key={key}>
                                        <Paper sx={{ p: 2, height: '100%', position: 'relative', overflow: 'hidden' }}>
                                            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', bgcolor: '#ef5350' }} />
                                            <Typography variant="h6" gutterBottom fontWeight="bold" color="text.primary">
                                                {protocol.title}
                                            </Typography>
                                            {protocol.nutrients.map((n, i) => (
                                                <Box key={i} sx={{ mb: 1.5, borderBottom: i === protocol.nutrients.length - 1 ? 'none' : '1px dashed #eee', pb: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography fontWeight="bold" variant="body2">{n.name}</Typography>
                                                        <Chip label={n.amount} size="small" color="error" variant="outlined" sx={{ fontWeight: 'bold' }} />
                                                    </Box>
                                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>{n.why}</Typography>
                                                </Box>
                                            ))}
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </motion.div>
                ) : (
                    <motion.div
                        key="maintenance"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Paper sx={{ p: 2, mb: 4, bgcolor: '#e8f5e9', borderLeft: '4px solid #43a047' }}>
                            <Typography variant="body1">
                                <strong>Estado Base:</strong> El objetivo es mantener la <i>Carga Alostática</i> baja. Controla el estrés oxidativo del entrenamiento con alimentos reales, no solo suplementos.
                            </Typography>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>

            <Grid container spacing={4}>
                {/* Anti-Inflammatory Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%', position: 'relative' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#2e7d32', mb: 2 }}>
                            <SpaIcon /> Escudo Anti-Inflamatorio
                        </Typography>
                        <Box sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
                            {antiInflammatory.map((item, idx) => (
                                <InflammationItem key={idx} item={item} type="anti" />
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Pro-Inflammatory Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%', border: '1px solid #ffebee' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#c62828', mb: 2 }}>
                            <HealingIcon /> Agentes Destructivos
                        </Typography>
                        <Box sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
                            {proInflammatory.map((item, idx) => (
                                <InflammationItem key={idx} item={item} type="pro" />
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Deep Gut Health Analysis */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3, bgcolor: '#e3f2fd', borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <BubbleChartIcon color="primary" fontSize="large" />
                            <Box>
                                <Typography variant="h6" fontWeight="bold">Protocolo Microbiota (Eje Intestino-Cerebro)</Typography>
                                <Typography variant="caption" color="text.secondary">El 90% de la serotonina se produce aquí. Tu estado de ánimo depende de tus bacterias.</Typography>
                            </Box>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.7)' }}>
                                    <Typography fontWeight="bold" color="primary" gutterBottom>1. Siembra (Probióticos)</Typography>
                                    <Typography variant="body2" fontSize="0.85rem">• Kéfir de cabra/oveja</Typography>
                                    <Typography variant="body2" fontSize="0.85rem">• Chucrut (sin pasteurizar)</Typography>
                                    <Typography variant="body2" fontSize="0.85rem">• Kombucha (baja en azúcar)</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.7)' }}>
                                    <Typography fontWeight="bold" color="secondary" gutterBottom>2. Abono (Prebióticos)</Typography>
                                    <Typography variant="body2" fontSize="0.85rem">• Almidón Resistente (Arroz frío)</Typography>
                                    <Typography variant="body2" fontSize="0.85rem">• Ajos, Puerros, Espárragos</Typography>
                                    <Typography variant="body2" fontSize="0.85rem">• Plátano macho verde</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.7)' }}>
                                    <Typography fontWeight="bold" color="error" gutterBottom>3. Sellado (Mucosa)</Typography>
                                    <Typography variant="body2" fontSize="0.85rem">• Caldo de Huesos (Bone Broth)</Typography>
                                    <Typography variant="body2" fontSize="0.85rem">• L-Glutamina (5g en ayunas)</Typography>
                                    <Typography variant="body2" fontSize="0.85rem">• Colágeno</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Sleep Stack */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3, bgcolor: '#311b92', color: 'white', borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>🌙 Neuro-Recuperación Nocturna (Sleep Stack)</Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip label="Magnesio Bisglicinato (400mg)" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} />
                            <Chip label="Ashwagandha (KSM-66)" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} />
                            <Chip label="Glicina (3g)" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} />
                            <Chip label="Apagar pantallas (Filtro azul) 1h antes" color="warning" />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MetabolicRecovery;
