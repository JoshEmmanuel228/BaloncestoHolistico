import { useState } from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PsychologyIcon from '@mui/icons-material/Psychology';

const archetypes = [
    {
        id: 'general',
        title: 'El General de Campo',
        subtitle: 'Liderazgo Táctico y Cognitivo',
        icon: <RecordVoiceOverIcon sx={{ fontSize: 60, color: '#ffd700' }} />,
        color: '#ffd700',
        desc: 'El estratega definitivo. No solo ejecuta, sino que anticipa. Su voz es la extensión del entrenador en la cancha. Gestiona el ritmo, las asignaciones defensivas y la moral táctica.',
        example: 'Chris Paul / LeBron James / Sue Bird',
        traits: ['IQ Élite', 'Comunicación Constante', 'Gestión del Tempo'],
        shadow: 'Micro-gestión excesiva que paraliza la creatividad de los compañeros. Puede volverse cínico si el equipo no alcanza su estándar intelectual.',
        communication: 'Directa, instruccional y preventiva ("¡Cuidado con el corte!", "¡No saltes!").',
        development: 'Estudiar vídeo obsesivamente. Aprender a delegar confianza en momentos de baja presión.'
    },
    {
        id: 'spark',
        title: 'La Chispa (The Spark)',
        subtitle: 'Liderazgo Emocional y Energético',
        icon: <BoltIcon sx={{ fontSize: 60, color: '#ff1744' }} />,
        color: '#ff1744',
        desc: 'El catalizador del "momentum". Transforma un partido muerto en una guerra total. Su liderazgo es contagioso; una jugada suya vale por tres en términos de moral.',
        example: 'Russell Westbrook / Kevin Garnett / Ja Morant',
        traits: ['Energía Inagotable', 'Lenguaje Corporal Dominante', 'Miedo Inexistente'],
        shadow: 'Inconsistencia emocional. Puede jugar fuera de control o cometer faltas técnicas costosas. Su fuego puede quemar al propio equipo.',
        communication: 'Gritos guturales, contacto físico celebratorio, desafío al rival.',
        development: 'Aprender técnicas de "Anclaje Emocional" para regular la activación. Usar la energía en defensa, no solo en ataque.'
    },
    {
        id: 'enforcer',
        title: 'El Protector (Enforcer)',
        subtitle: 'Liderazgo Físico y Territorial',
        icon: <ShieldIcon sx={{ fontSize: 60, color: '#2979ff' }} />,
        color: '#2979ff',
        desc: 'El guardián de la cultura física. Establece los límites de lo permitido. Nadie toca a la estrella si él está cerca. Su valor no aparece en el Box Score, pero gana campeonatos.',
        example: 'Draymond Green / Marcus Smart / Dennis Rodman',
        traits: ['Dureza Mental', 'Sacrificio Corporal', 'Intimidación Deportiva'],
        shadow: 'Agresividad desmedida que resulta en expulsiones. Puede ser una distracción si se centra más en el conflicto que en el juego.',
        communication: 'Confrontacional con el rival, protectora con el compañero. Habla con acciones contundentes.',
        development: 'Canalizar la agresividad hacia la anticipación (cargas, robos). Ser el primero en levantar a un compañero del suelo.'
    },
    {
        id: 'connector',
        title: 'El Pegamento (Connector)',
        subtitle: 'Liderazgo Social y Cohesivo',
        icon: <PsychologyIcon sx={{ fontSize: 60, color: '#00e676' }} />,
        color: '#00e676',
        desc: 'El diplomático del vestuario. Detecta fracturas antes de que rompan al equipo. Une a las estrellas con los roles secundarios. Es el oído que todos buscan.',
        example: 'Shane Battier / Udonis Haslem / Andre Iguodala',
        traits: ['Empatía Radical', 'Inteligencia Emocional', 'Ego Cero'],
        shadow: 'Evitación del conflicto necesario. Puede ser visto como "demasiado blando" o complaciente por líderes más agresivos.',
        communication: 'Escucha activa, mediación privada, refuerzo positivo silencioso.',
        development: 'Aprender a tener conversaciones difíciles. Entender que la armonía no siempre es el objetivo; a veces se necesita fricción productiva.'
    },
    {
        id: 'lead_by_example',
        title: 'El Ejecutor Silencioso',
        subtitle: 'Liderazgo por Estándar de Trabajo',
        icon: <VisibilityIcon sx={{ fontSize: 60, color: '#ba68c8' }} />,
        color: '#ba68c8',
        desc: 'El primero en llegar, el último en irse. No da discursos, da lecciones de ética profesional. Su autoridad viene de su consistencia inquebrantable.',
        example: 'Kawhi Leonard / Tim Duncan / Derrick Rose',
        traits: ['Disciplina Espartana', 'Consistencia', 'Autonomía'],
        shadow: 'Dificultad para verbalizar correcciones. Puede frustrarse si otros no "ven" lo que él hace. A veces invisible en crisis vocales.',
        communication: 'No verbal. Miradas significativas. Demostración técnica perfecta.',
        development: 'Forzarse a hablar en los tiempos muertos. Usar su credibilidad de trabajo para exigir más a los talentosos pero perezosos.'
    }
];

const LeadershipArchetypes = () => {
    const [flipped, setFlipped] = useState<string | null>(null);

    return (
        <Box sx={{ p: 4, bgcolor: '#121212', color: 'white', borderRadius: 4, minHeight: 800 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 1, textTransform: 'uppercase', letterSpacing: 2 }}>
                Arquetipos de Liderazgo Élite
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 6, color: 'gray' }}>
                Identifica tu rol, comprende tu sombra y maximiza tu impacto.
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {archetypes.map((arch) => (
                    <Grid item xs={12} md={4} key={arch.id}>
                        <Box
                            sx={{
                                perspective: '1000px',
                                height: 550,
                                cursor: 'pointer'
                            }}
                            onClick={() => setFlipped(flipped === arch.id ? null : arch.id)}
                        >
                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    transformStyle: 'preserve-3d',
                                }}
                                animate={{ rotateY: flipped === arch.id ? 180 : 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Front Side */}
                                <Paper
                                    elevation={10}
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 3,
                                        bgcolor: '#1e1e1e',
                                        border: `2px solid ${arch.color}`,
                                        borderRadius: 4,
                                        boxShadow: `0 0 20px ${arch.color}30`
                                    }}
                                >
                                    <Box sx={{ mb: 3, p: 2, borderRadius: '50%', border: `4px solid ${arch.color}50` }}>
                                        {arch.icon}
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" align="center" sx={{ color: arch.color, mb: 1 }}>
                                        {arch.title}
                                    </Typography>
                                    <Typography variant="body2" color="gray" align="center" sx={{ mb: 3 }}>
                                        {arch.subtitle}
                                    </Typography>

                                    <Divider sx={{ width: '80%', bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />

                                    <Typography variant="subtitle2" align="center" sx={{ fontStyle: 'italic', px: 2 }}>
                                        "{arch.desc.substring(0, 100)}..."
                                    </Typography>

                                    <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                                        <AutorenewIcon fontSize="small" /> <Typography variant="caption">Ver Análisis Profundo</Typography>
                                    </Box>
                                </Paper>

                                {/* Back Side */}
                                <Paper
                                    elevation={10}
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        p: 3,
                                        bgcolor: '#1e1e1e',
                                        border: `2px solid ${arch.color}`,
                                        borderRadius: 4,
                                        color: 'white',
                                        overflowY: 'auto'
                                    }}
                                >
                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: arch.color }}>Misión Operativa:</Typography>
                                    <Typography variant="body2" paragraph sx={{ lineHeight: 1.4, fontSize: '0.85rem' }}>{arch.desc}</Typography>

                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#bdbdbd', fontSize: '0.75rem' }}>Sombra (Riesgo):</Typography>
                                            <Typography variant="caption" display="block" color="error.main" sx={{ lineHeight: 1.2 }}>{arch.shadow}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#bdbdbd', fontSize: '0.75rem' }}>Comunicación:</Typography>
                                            <Typography variant="caption" display="block" color="info.main" sx={{ lineHeight: 1.2 }}>{arch.communication}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 1.5, borderRadius: 2, my: 2 }}>
                                        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: arch.color, fontSize: '0.8rem' }}>Protocolo de Desarrollo:</Typography>
                                        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>{arch.development}</Typography>
                                    </Box>

                                    <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid #333', width: '100%' }}>
                                        <Typography variant="caption" color="gray" display="block">Arquetipo NBA:</Typography>
                                        <Typography variant="subtitle2" fontWeight="bold">{arch.example}</Typography>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LeadershipArchetypes;
