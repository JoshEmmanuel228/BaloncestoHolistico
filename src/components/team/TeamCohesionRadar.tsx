import { useState } from 'react';
import { Box, Typography, Paper, Grid, Slider } from '@mui/material';
import { motion } from 'framer-motion';

const metrics = [
    {
        id: 'trust',
        label: 'Confianza (Vulnerabilidad)',
        color: '#00e5ff',
        desc: 'La capacidad de admitir errores, pedir ayuda y saber que tus compañeros cubren tu espalda. Sin confianza, no hay conflicto productivo, solo política.'
    },
    {
        id: 'comms',
        label: 'Comunicación Táctica',
        color: '#76ff03',
        desc: 'Frecuencia y claridad de la información en cancha. "Early, Loud, and Continuous". El silencio es el enemigo de la ejecución y el primer síntoma de fatiga.'
    },
    {
        id: 'accountability',
        label: 'Responsabilidad (Accountability)',
        color: '#ff3d00',
        desc: 'La voluntad de exigir y ser exigido. Sostener el estándar incluso cuando es incómodo. "Mírate al espejo antes de mirar a otro".'
    },
    {
        id: 'sacrifice',
        label: 'Sacrificio (We > Me)',
        color: '#d500f9',
        desc: 'La disposición a renunciar a la gloria individual por el éxito del grupo. Pantallas, cajas de rebote, cortar con fuerza sin esperar el balón.'
    },
    {
        id: 'focus',
        label: 'Enfoque (Next Play)',
        color: '#ffea00',
        desc: 'Resiliencia mental ante el error. La capacidad de pasar página instantáneamente. No dejar que una mala jugada se convierta en dos.'
    }
];

const TeamCohesionRadar = () => {
    const [values, setValues] = useState({
        trust: 70,
        comms: 60,
        accountability: 80,
        sacrifice: 50,
        focus: 75
    });

    const [activeMetric, setActiveMetric] = useState<string | null>(null);

    // Calculate Radar Points (Simple Pentagon logic)
    const getPoints = () => {
        const center = 150;
        const radius = 120;
        const angleStep = (Math.PI * 2) / 5;

        const points = metrics.map((m, i) => {
            const value = values[m.id as keyof typeof values] / 100;
            const angle = i * angleStep - Math.PI / 2; // Start at top
            const x = center + Math.cos(angle) * (radius * value);
            const y = center + Math.sin(angle) * (radius * value);
            return `${x},${y}`;
        });

        return points.join(' ');
    };

    const getDiagnosis = () => {
        const avg = Object.values(values).reduce((a, b) => a + b, 0) / 5;
        if (avg > 90) return { title: "Nivel Campeonato: Cultura Élite", color: '#00e676', text: "El equipo opera como una mente colmena. El único enemigo ahora es la complacencia. Mantén la tensión competitiva alta en los entrenamientos." };
        if (avg > 75) return { title: "Equipo Sólido (Playoff Potential)", color: '#ffea00', text: "Buenos cimientos, pero se agrietan bajo presión extrema. Necesitan trabajar en la recuperación tras el error y la profundidad de la confianza." };
        if (avg > 60) return { title: "En Desarrollo: Riesgo de Fractura", color: '#ff9100', text: "Hay talento, pero agendas individuales visibles. La confianza es condicional. Se requiere intervención urgente en 'Role Acceptance'." };
        return { title: "Alerta Roja: Vestuario Tóxico", color: '#ff1744', text: "Fragmentación total. Subgrupos (cliques), falta de respeto y lenguaje corporal negativo. Prioridad: 'Limpieza' cultural y redefinición de estándares no negociables." };
    };

    const diagnosis = getDiagnosis();

    return (
        <Paper elevation={4} sx={{ p: 4, bgcolor: '#1a1a1a', color: 'white', borderRadius: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ borderLeft: '4px solid #00e5ff', pl: 2 }}>
                🕸️ Psicometría del Equipo (Team Alchemist)
            </Typography>
            <Typography variant="body2" color="gray" paragraph>
                Diagnóstico en tiempo real del "Tejido conectivo" del equipo. Ajusta los niveles según tu observación.
            </Typography>

            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{ position: 'relative', width: 300, height: 300, margin: '0 auto' }}>
                        <svg width="300" height="300" style={{ overflow: 'visible' }}>
                            {/* Background Grid (Pentagons) */}
                            {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
                                <polygon
                                    key={scale}
                                    points={metrics.map((_, i) => {
                                        const angle = (i * (Math.PI * 2) / 5) - Math.PI / 2;
                                        const x = 150 + Math.cos(angle) * (120 * scale);
                                        const y = 150 + Math.sin(angle) * (120 * scale);
                                        return `${x},${y}`;
                                    }).join(' ')}
                                    fill="none"
                                    stroke="#333"
                                    strokeWidth="1"
                                />
                            ))}

                            {/* Data Polygon */}
                            <motion.polygon
                                points={getPoints()}
                                fill="rgba(0, 229, 255, 0.3)"
                                stroke="#00e5ff"
                                strokeWidth="2"
                                initial={{ opacity: 0 }}
                                animate={{ points: getPoints(), opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                            />

                            {/* Labels */}
                            {metrics.map((m, i) => {
                                const angle = (i * (Math.PI * 2) / 5) - Math.PI / 2;
                                const x = 150 + Math.cos(angle) * 145;
                                const y = 150 + Math.sin(angle) * 145;
                                return (
                                    <text key={i} x={x} y={y} fill={m.color} textAnchor="middle" fontSize="10" fontWeight="bold">
                                        {m.label.split(' ')[0]}
                                    </text>
                                );
                            })}
                        </svg>
                    </Box>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={diagnosis.title} // Re-animate on change
                    >
                        <Box sx={{ textAlign: 'center', mt: 2, p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, border: `1px solid ${diagnosis.color}40` }}>
                            <Typography variant="subtitle1" sx={{ color: diagnosis.color, fontWeight: 'bold' }}>
                                {diagnosis.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#ccc', mt: 0.5, display: 'block' }}>
                                {diagnosis.text}
                            </Typography>
                        </Box>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                    {metrics.map((m) => (
                        <Box key={m.id} sx={{ mb: 3 }} onMouseEnter={() => setActiveMetric(m.id)} onMouseLeave={() => setActiveMetric(null)}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                <Typography variant="body2" sx={{ color: m.color, fontWeight: 'bold' }}>{m.label}</Typography>
                                <Typography variant="caption" color="white" sx={{ bgcolor: 'rgba(255,255,255,0.1)', px: 1, borderRadius: 1 }}>
                                    {values[m.id as keyof typeof values]}%
                                </Typography>
                            </Box>
                            <Slider
                                value={values[m.id as keyof typeof values]}
                                onChange={(_, v) => setValues({ ...values, [m.id]: v as number })}
                                sx={{
                                    color: m.color,
                                    height: 6,
                                    '& .MuiSlider-thumb': { width: 16, height: 16, bgcolor: 'white', border: `2px solid ${m.color}` },
                                    '& .MuiSlider-rail': { opacity: 0.3, bgcolor: 'gray' }
                                }}
                            />
                            {/* Contextual Description */}
                            <motion.div
                                style={{ height: 20 }}
                                animate={{ opacity: activeMetric === m.id ? 1 : 0.5 }}
                            >
                                <Typography variant="caption" sx={{ color: 'gray', fontSize: '0.7rem' }}>
                                    {m.desc}
                                </Typography>
                            </motion.div>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TeamCohesionRadar;
