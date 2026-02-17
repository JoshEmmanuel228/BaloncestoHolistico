import { useRef, useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid } from '@mui/material';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const commandments = [
    {
        title: "WE > ME",
        subtitle: "El Sacrificio Supremo",
        desc: "El nombre en el pecho es más importante que el de la espalda. Sacrificio por el bien común.",
        deep: "En los momentos de presión, el ego se repliega y el equipo se expande. No se trata de eliminar la individualidad, sino de canalizarla hacia un propósito compartido.",
        anti: "Héroes de 'Heroball' que rompen los sistemas en el 'clutch'. Celebrar estadísticas individuales en una derrota.",
        action: "Celebra las asistencias y defensas más que los puntos. Haz el pase extra ('Good to Great')."
    },
    {
        title: "SWEAT EQUITY",
        subtitle: "Respeto Ganado",
        desc: "El respeto se alquila cada día con sudor, no se compra con talento o estatus.",
        deep: "Tu jerarquía en el vestuario está directamente correlacionada con tu esfuerzo percibido en los entrenamientos. El líder más vocal debe ser el trabajador más duro.",
        anti: "Veteranos que se saltan repeticiones. Novatos que piensan que su 'draft stock' les otorga privilegios.",
        action: "Llega 30 minutos antes. Sé el último en irte. No te saltes ni una línea en los suicidios."
    },
    {
        title: "NEXT PLAY",
        subtitle: "Resiliencia Mental",
        desc: "Olvida el error, olvida el acierto. Enfócate inmediatamente en la siguiente acción.",
        deep: "La 'memoria corta' es la habilidad más valiosa de un atleta élite. Quedarse en la jugada anterior (sea buena o mala) te saca del presente, que es donde se gana el partido.",
        anti: "Lenguaje corporal de frustración tras un fallo. Celebrar demasiado tiempo una volcada mientras el rival saca rápido.",
        action: "Desarrolla un gesto físico (ej. 'limpiarse el hombro') para reiniciar tu mente tras un error."
    },
    {
        title: "ENERGY VAMPIRES",
        subtitle: "Protección del Entorno",
        desc: "No permitimos que nadie robe la energía del grupo. O sumas o te apartas.",
        deep: "La energía es contagiosa. Un jugador que se queja constantemente, pone los ojos en blanco o aísla a compañeros es un cáncer que debe ser extirpado antes de que haga metástasis.",
        anti: "Comentarios sarcásticos en el banquillo. Formar corrillos para hablar mal del staff técnico.",
        action: "Confronta la negatividad inmediatamente. 'Aquí no hacemos eso'. Protege la alegría del juego."
    },
    {
        title: "1% BETTER",
        subtitle: "La Ley de la Agregación",
        desc: "Obsesión por la mejora marginal diaria. Pequeñas victorias suman campeonatos.",
        deep: "No busques el salto cuántico. Busca la mejora microscópica y constante. Si mejoras un 1% cada día, al final del año serás 37 veces mejor.",
        anti: "Buscar atajos o 'hacks' rápidos. Frustrarse porque los resultados no son inmediatos.",
        action: "Define una sola cosa micro-específica para mejorar en cada entrenamiento (ej. 'mi pie derecho en el tiro')."
    },
    {
        title: "ACCOUNTABILITY",
        subtitle: "Espejos, no Ventanas",
        desc: "Mírate al espejo antes de mirar por la ventana para culpar a otros. Acepta la crítica como un regalo de crecimiento.",
        deep: "La responsabilidad radical elimina el victimismo. Si el equipo falla, el líder asume la culpa. Si el equipo gana, el líder reparte el crédito.",
        anti: "Excusas ('Es que el árbitro...', 'Es que mi compañero no cortó...'). Ponerse a la defensiva ante el feedback.",
        action: "Usa la frase 'Mala mía' (My bad) y corrígelo. Agradece al entrenador cuando te exige más."
    },
    {
        title: "FAMILY FIRST",
        subtitle: "Círculo de Confianza",
        desc: "Protegemos a los nuestros. Lo que pasa en el vestuario, se queda en el vestuario.",
        deep: "La lealtad es la moneda de cambio. Podemos pelear entre nosotros, pero nadie de fuera nos toca. La vulnerabilidad requiere un espacio seguro.",
        anti: "Filtrar problemas a la prensa o redes sociales. Hablar mal de un compañero a sus espaldas.",
        action: "Organiza cenas de equipo sin teléfonos. Defiende a tu compañero en público, corrígelo en privado."
    },
    {
        title: "EARN YOUR MINUTES",
        subtitle: "Meritocracia Brutal",
        desc: "Los minutos no se regalan por nombre ni por sueldo. Se alquilan cada día en la práctica.",
        deep: "El entrenador debe ser ciego al estatus y sensible solo al rendimiento y esfuerzo. Si el mejor jugador no defiende, se sienta.",
        anti: "Política de minutos garantizados. Entrenadores que tienen miedo a las estrellas.",
        action: "Compite en cada ejercicio como si fuera el último minuto de una final. Obliga al entrenador a ponerte."
    },
    {
        title: "COMMUNICATE",
        subtitle: "El Sonido de la Victoria",
        desc: "Un equipo silencioso es un equipo perdedor. Habla en defensa, habla en ataque, habla en el banco.",
        deep: "La comunicación elimina la confusión y reduce el tiempo de reacción. Es el pegamento que mantiene unida la estructura táctica bajo presión.",
        anti: "Asumir que tu compañero 'sabe' lo que vas a hacer. Silencio tras un error.",
        action: "Eco de las llamadas del base. Grita las pantallas. Celebra vocalmente el éxito ajeno."
    },
    {
        title: "FINISH STRONG",
        subtitle: "Mentalidad de Cierre",
        desc: "No importa cómo empiezas, importa cómo terminas. Juega hasta el pitido final, corre a través de la línea de meta.",
        deep: "La fatiga hace cobardes a todos. Los campeones encuentran un depósito extra cuando los demás se rinden. El cuarto cuarto se gana en la pretemporada.",
        anti: "Relajarse con una ventaja de 20 puntos. Dejar de correr en un balance defensivo porque 'ya no llego'.",
        action: "Sprinta en cada final de línea. Termina cada repetición. 'No te dejes nada en el tanque'."
    }
];

const CultureCode = () => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ container: scrollRef });
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <Paper
            elevation={4}
            sx={{
                height: 600, // Increased height for more content
                bgcolor: 'black',
                color: 'white',
                overflow: 'hidden',
                position: 'relative',
                borderRadius: 4,
                display: 'flex'
            }}
        >
            {/* Progress Bar */}
            <motion.div
                style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                className="progress-bar"
            >
                <Box sx={{ width: 6, height: '100%', bgcolor: '#d50000', position: 'absolute', left: 0, top: 0 }} />
            </motion.div>

            <Box sx={{ p: 4, width: '100%', overflowY: 'auto' }} ref={scrollRef}>
                <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, letterSpacing: -1, textTransform: 'uppercase', background: '-webkit-linear-gradient(45deg, #fff, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    THE CULTURE CODE
                </Typography>
                <Typography variant="subtitle1" color="gray" sx={{ mb: 5, fontStyle: 'italic' }}>
                    Los 10 Mandamientos no negociables de nuestra identidad.
                </Typography>

                {commandments.map((cmd, i) => (
                    <Box key={i} sx={{ mb: 4, borderLeft: expanded === i ? '4px solid #d50000' : '2px solid #333', pl: 3, transition: 'all 0.3s' }}>
                        <Box
                            sx={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}
                            onClick={() => setExpanded(expanded === i ? null : i)}
                        >
                            <Typography variant="h4" sx={{ opacity: expanded === i ? 0.3 : 0.1, fontWeight: 'bold', mr: 2, transition: 'all 0.3s' }}>
                                {i < 9 ? `0${i + 1}` : i + 1}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" fontWeight="bold" sx={{ color: expanded === i ? '#d50000' : 'white', textTransform: 'uppercase', transition: 'all 0.3s' }}>
                                    {cmd.title}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'gray', textTransform: 'uppercase', letterSpacing: 2, display: 'block', mb: 1 }}>
                                    {cmd.subtitle}
                                </Typography>
                                <AnimatePresence>
                                    {expanded !== i && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <Typography variant="body1" sx={{ color: '#bdbdbd', fontFamily: 'monospace' }}>
                                                {cmd.desc}
                                            </Typography>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Box>
                            <IconButton sx={{ color: 'white' }}>
                                {expanded === i ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </Box>

                        <AnimatePresence>
                            {expanded === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <Box sx={{ pt: 2, pb: 1 }}>
                                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                                            {cmd.deep}
                                        </Typography>

                                        <Grid container spacing={2} sx={{ mt: 1 }}>
                                            <Grid item xs={12} sm={6}>
                                                <Paper sx={{ p: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', border: '1px solid rgba(211, 47, 47, 0.3)' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#ff5252' }}>
                                                        <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} />
                                                        <Typography variant="subtitle2" fontWeight="bold">Anti-Pattern (Tóxico)</Typography>
                                                    </Box>
                                                    <Typography variant="body2" color="#ffcdd2">
                                                        {cmd.anti}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 200, 83, 0.1)', border: '1px solid rgba(0, 200, 83, 0.3)' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#69f0ae' }}>
                                                        <CheckCircleOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                                                        <Typography variant="subtitle2" fontWeight="bold">Acción Inmediata</Typography>
                                                    </Box>
                                                    <Typography variant="body2" color="#b9f6ca">
                                                        {cmd.action}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>
                ))}

                <Box sx={{ textAlign: 'center', mt: 10, mb: 5 }}>
                    <Typography variant="h6" fontStyle="italic" color="#444">
                        "Standard over feelings."
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default CultureCode;
