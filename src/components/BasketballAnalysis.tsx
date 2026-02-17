import { Box, Typography, Paper, Divider, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const BasketballAnalysis = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 50 }
        },
    };

    return (
        <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            sx={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <Paper elevation={10} sx={{
                p: { xs: 3, md: 8 },
                bgcolor: 'rgba(10, 20, 35, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 234, 255, 0.3)',
                borderRadius: 4,
                color: '#e0f7fa'
            }}>
                <motion.div variants={itemVariants}>
                    <Typography variant="h3" component="h1" sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: '#FF8C00',
                        textAlign: 'center',
                        mb: 4,
                        fontWeight: 700,
                        letterSpacing: 2,
                        textShadow: '0 0 10px rgba(255, 140, 0, 0.5)',
                        fontSize: { xs: '2rem', md: '3rem' }
                    }}>
                        FILOSOFÍA DEL CRECIMIENTO HUMANO
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.25rem', lineHeight: 1.8 }}>
                        Estimado miembro de nuestra comunidad, le damos la más sincera bienvenida a un espacio donde el baloncesto trasciende la mera competición para convertirse en una disciplina formativa y una poderosa herramienta de crecimiento humano. Nuestra visión se alinea con el enfoque del posdesarrollo, cuestionando los paradigmas tradicionales del "éxito" deportivo para priorizar su evolución integral como persona. No buscamos simplemente fabricar jugadores; buscamos esculpir individuos conscientes, resilientes y socialmente responsables. En nuestra filosofía, el marcador final es secundario frente a la victoria interna del autoconocimiento y la superación personal.
                    </Typography>
                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.25rem', lineHeight: 1.8 }}>
                        Entendemos que cada bote, cada pase y cada defensa es una metáfora de la vida misma. La cancha se convierte en un laboratorio de experiencias donde se ponen a prueba el carácter, la ética y la voluntad. Aquí, el error no es un fracaso, sino un dato esencial para el algoritmo del aprendizaje.
                    </Typography>
                </motion.div>

                <Divider sx={{ my: 6, borderColor: 'rgba(0, 234, 255, 0.2)', borderWidth: 1 }} />

                <motion.div variants={itemVariants}>
                    <Typography variant="h4" component="h2" sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: '#00eaff',
                        mb: 3,
                        textShadow: '0 0 10px rgba(0, 234, 255, 0.6)'
                    }}>
                        I. CONSTRUCCIÓN SOCIAL Y CONVIVENCIA
                    </Typography>
                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.15rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.8 }}>
                        En este entorno, entendemos el baloncesto como un sofisticado catalizador para la construcción de tejido social y la promoción de la sana convivencia. La práctica colectiva fomenta de manera natural valores esenciales como el respeto inquebrantable, la cooperación sinérgica, la empatía profunda y la responsabilidad compartida. Este deporte es una estrategia educativa de alto impacto que posiciona a los jóvenes con principios y valores sólidos, haciéndolos plenamente conscientes de su rol activo y transformador dentro de la sociedad.
                    </Typography>

                    <Box sx={{ pl: 4, borderLeft: '3px solid #00eaff', my: 4 }}>
                        <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#00eaff', mb: 1 }}>
                            Diplomacia en la Cancha
                        </Typography>
                        <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)' }}>
                            Aquí cultivamos activamente las habilidades sociales, generando espacios de diálogo constructivo y toma de decisiones democrática en equipo. Resolvemos conflictos no mediante la imposición, sino a través de la negociación y el entendimiento mutuo. El 100% de nuestros deportistas reconoce que el baloncesto ha mejorado su capacidad de comunicación efectiva, fortaleciendo el respeto hacia compañeros, entrenadores y oponentes, y transformando la rivalidad en una oportunidad para el crecimiento mutuo.
                        </Typography>
                    </Box>
                </motion.div>

                <Box sx={{ mt: 8 }}>
                    <motion.div variants={itemVariants}>
                        <Typography variant="h4" component="h2" sx={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#00eaff',
                            mb: 3,
                            textShadow: '0 0 10px rgba(0, 234, 255, 0.6)'
                        }}>
                            II. MAESTRÍA MENTAL, COGNITIVA Y EMOCIONAL
                        </Typography>
                        <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.15rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.8 }}>
                            El baloncesto es una compleja interacción entre el cuerpo y la mente, ofreciendo un terreno fértil para moldear nuestras capacidades cognitivas y neurológicas. No es solo un juego de músculos, sino de neuronas.
                        </Typography>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 4, mt: 4 }}>
                            <Box sx={{ p: 3, bgcolor: 'rgba(255, 0, 255, 0.05)', borderRadius: 2, border: '1px solid rgba(255, 0, 255, 0.2)' }}>
                                <Typography variant="h5" component="h3" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#ff00ff', fontSize: '1.3rem', mb: 2 }}>
                                    A. Neuroplasticidad y Agilidad Mental
                                </Typography>
                                <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>
                                    Esta disciplina es un acelerador de la neuroplasticidad. La constante necesidad de tomar decisiones en milisegundos bajo presión estimula el córtex prefrontal y las áreas relacionadas con la anticipación y la flexibilidad cognitiva. La práctica regular optimiza la mielinización de los circuitos neuronales, mejorando funciones ejecutivas como la memoria de trabajo, la inhibición de impulsos y la integración sensoriomotora. El cerebro del jugador se vuelve más eficiente, consumiendo menos energía para procesar información compleja.
                                </Typography>
                            </Box>

                            <Box sx={{ p: 3, bgcolor: 'rgba(255, 0, 255, 0.05)', borderRadius: 2, border: '1px solid rgba(255, 0, 255, 0.2)' }}>
                                <Typography variant="h5" component="h3" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#ff00ff', fontSize: '1.3rem', mb: 2 }}>
                                    B. Inteligencia Emocional y Resiliencia
                                </Typography>
                                <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>
                                    El entorno deportivo entrena la regulación emocional en tiempo real. La exposición al error público y a la presión del marcador fortalece la amígdala y los circuitos de control emocional. Enseñamos a transformar la frustración en enfoque y el miedo en alerta. Para un líder en cancha, la compostura es la cualidad intangible más vital; es el ancla emocional del equipo. Sin una cabeza fría, la estructura táctica se desmorona.
                                </Typography>
                            </Box>

                            <Box sx={{ p: 3, bgcolor: 'rgba(255, 0, 255, 0.05)', borderRadius: 2, border: '1px solid rgba(255, 0, 255, 0.2)', gridColumn: { md: 'span 2' } }}>
                                <Typography variant="h5" component="h3" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#ff00ff', fontSize: '1.3rem', mb: 2 }}>
                                    C. La Visión como Superpoder Táctico
                                </Typography>
                                <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>
                                    La agudeza visual dinámica y periférica son determinantes. Entrenamos la "visión blanda", la capacidad de percibir la totalidad del campo sin focalizar excesivamente en un punto. Los jugadores expertos realizan menos fijaciones oculares pero extraen más información de cada una, anticipando patrones de movimiento antes de que ocurran. Esta capacidad de "ver el futuro" inmediato es lo que separa al jugador promedio del maestro táctico.
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Box>

                <Box sx={{ mt: 8 }}>
                    <motion.div variants={itemVariants}>
                        <Typography variant="h4" component="h2" sx={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#00eaff',
                            mb: 3,
                            textShadow: '0 0 10px rgba(0, 234, 255, 0.6)'
                        }}>
                            III. EXCELENCIA FÍSICA Y TÉCNICA HOLÍSTICA
                        </Typography>

                        <Box sx={{ pl: 4, borderLeft: '3px solid #ffd700', my: 4 }}>
                            <Typography variant="h5" component="h3" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#ffd700', fontSize: '1.3rem', mb: 2 }}>
                                A. Bioingeniería del Atleta
                            </Typography>
                            <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
                                Abordamos la preparación física como una ciencia. Nos enfocamos en el desarrollo de los sistemas energéticos específicos (ATP-PC para explosividad, glucolítico para resistencia a la intensidad). Utilizamos el *Complex Training* y la pliometría para maximizar la tasa de desarrollo de fuerza (RFD). Además, integramos la propiocepción y el entrenamiento preventivo para blindar las articulaciones contra lesiones, asegurando una longevidad deportiva. El cuerpo es el templo y la máquina; debe estar afinado a la perfección.
                            </Typography>

                            <Typography variant="h5" component="h3" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#ffd700', fontSize: '1.3rem', mt: 4, mb: 2 }}>
                                B. El Arte de los Fundamentos
                            </Typography>
                            <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
                                El dominio técnico es la libertad en la cancha. El dribble no es solo rebotar el balón; es una extensión de la mano que permite navegar el caos. El pase es el lenguaje del altruismo y la velocidad del juego. El tiro es la culminación de la biomecánica eficiente y la concentración zen. Si un jugador no amenaza con su tiro, la defensa se cierra; por ello, el tiro es una obligación táctica que abre espacios para todos.
                            </Typography>
                        </Box>

                        <Typography variant="h5" component="h3" sx={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#ffd700',
                            fontSize: '1.5rem',
                            mt: 8,
                            mb: 4,
                            textAlign: 'center',
                            borderBottom: '1px solid #ffd700',
                            pb: 1,
                            display: 'inline-block'
                        }}>
                            C. ARQUITECTURA POSICIONAL Y DATOS TÁCTICOS
                        </Typography>

                        <Grid container spacing={4}>
                            {/* BASE */}
                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 3, border: '1px solid rgba(0, 234, 255, 0.3)', borderRadius: 2, height: '100%', bgcolor: 'rgba(0, 234, 255, 0.03)' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#00eaff', mb: 1, borderBottom: '1px solid rgba(0,234,255,0.2)', pb: 1 }}>
                                        1. BASE (POINT GUARD)
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#fff', mb: 2, fontStyle: 'italic' }}>Arquetipo: "El Centro Neural"</Typography>

                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">Perfil Biométrico:</Box> Agilidad lateral extrema, centro de gravedad bajo para el manejo y cambios de dirección.
                                    </Typography>
                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">Competencias Críticas:</Box>
                                        <br />• Lectura de *Pick & Roll* (Identificar Defensa Drop vs Hedge).
                                        <br />• Gestión del reloj de posesión (Situaciones de Tiempo/Marcador).
                                        <br />• Habilidad de pase ambidiestro bajo presión defensiva (Trap).
                                    </Typography>
                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">KPIs Tácticos:</Box> Ratio Asistencias/Pérdidas (&gt; 2.5 ideal), % de Uso (Usage Rate) controlado.
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* ESCOLTA */}
                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 3, border: '1px solid rgba(0, 234, 255, 0.3)', borderRadius: 2, height: '100%', bgcolor: 'rgba(0, 234, 255, 0.03)' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#00eaff', mb: 1, borderBottom: '1px solid rgba(0,234,255,0.2)', pb: 1 }}>
                                        2. ESCOLTA (SHOOTING GUARD)
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#fff', mb: 2, fontStyle: 'italic' }}>Arquetipo: "El Francotirador Dinámico"</Typography>

                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">Perfil Biométrico:</Box> Resistencia anaeróbica superior (mayor distancia recorrida en cancha a alta intensidad).
                                    </Typography>
                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">Competencias Críticas:</Box>
                                        <br />• Mecánica de tiro rápida (&lt; 0.6s release time).
                                        <br />• Lectura de pantallas indirectas (Pin-down, Stagger, Flare).
                                        <br />• Defensa perimetral en aislamiento (1vs1).
                                    </Typography>
                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">KPIs Tácticos:</Box> True Shooting % (TS%), Puntos por Posesión (PPP) en Spot-up.
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* ALERO */}
                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 3, border: '1px solid rgba(0, 234, 255, 0.3)', borderRadius: 2, height: '100%', bgcolor: 'rgba(0, 234, 255, 0.03)' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#00eaff', mb: 1, borderBottom: '1px solid rgba(0,234,255,0.2)', pb: 1 }}>
                                        3. ALERO (SMALL FORWARD)
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#fff', mb: 2, fontStyle: 'italic' }}>Arquetipo: "El Híbrido Versátil"</Typography>

                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">Perfil Biométrico:</Box> Combinación óptima de fuerza y velocidad. Envergadura (Wingspan) clave para la defensa.
                                    </Typography>
                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">Competencias Críticas:</Box>
                                        <br />• Defensa multisposicional (Switching 1-4).
                                        <br />• Capacidad de finalización en contacto (Eurostep, Floater).
                                        <br />• Rebote desde el perímetro (Crash the boards).
                                    </Typography>
                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">KPIs Tácticos:</Box> Deflections (Desvíos), Valoración en +/- (Impacto Global).
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* ALA-PÍVOT */}
                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 3, border: '1px solid rgba(0, 234, 255, 0.3)', borderRadius: 2, height: '100%', bgcolor: 'rgba(0, 234, 255, 0.03)' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#00eaff', mb: 1, borderBottom: '1px solid rgba(0,234,255,0.2)', pb: 1 }}>
                                        4. ALA-PÍVOT (POWER FORWARD)
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#fff', mb: 2, fontStyle: 'italic' }}>Arquetipo: "El Conector Moderno / Stretch 4"</Typography>

                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">Perfil Biométrico:</Box> Fuerza explosiva vertical, movilidad de cadera lateral para defender perímetros.
                                    </Typography>
                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">Competencias Críticas:</Box>
                                        <br />• Tiro de 3 puntos (Espaciado vertical y horizontal).
                                        <br />• Defensa de ayudas (Weak side help) y rotaciones rápidas.
                                        <br />• Juego de poste alto y distribución (Short Roll playmaker).
                                    </Typography>
                                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                        <Box component="span" fontWeight="bold" color="#00eaff">KPIs Tácticos:</Box> Effective Field Goal % (eFG%), Rebotes por partido, Screen Efficiency.
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* PÍVOT */}
                            <Grid item xs={12}>
                                <Box sx={{ p: 4, border: '1px solid rgba(255, 0, 255, 0.3)', borderRadius: 2, bgcolor: 'rgba(255, 0, 255, 0.05)' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#ff00ff', mb: 1, textAlign: 'center', borderBottom: '1px solid rgba(255,0,255,0.2)', pb: 1 }}>
                                        5. PÍVOT (CENTER)
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#fff', mb: 3, fontStyle: 'italic', textAlign: 'center' }}>Arquetipo: "El Guardián del Eje Vertical"</Typography>

                                    <Grid container spacing={4}>
                                        <Grid item xs={12} md={4}>
                                            <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                                <Box component="span" fontWeight="bold" color="#ff00ff">Perfil Biométrico:</Box>
                                                <br />Altura y alcance vertical máximos. Fuerza isométrica para ganar posición profunda en la pintura.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                                <Box component="span" fontWeight="bold" color="#ff00ff">Competencias Críticas:</Box>
                                                <br />• Protección del aro (Rim Protection) y disuasión vertical.
                                                <br />• Bloqueos sólidos (Screen Assists) para liberar tiradores.
                                                <br />• Rebote ofensivo y finalización agresiva (Putbacks).
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                                                <Box component="span" fontWeight="bold" color="#ff00ff">KPIs Tácticos:</Box>
                                                <br />• FG% permitido en el aro (&lt; 50%).
                                                <br />• Screen Assists (Asistencias de bloqueo).
                                                <br />• Rebote Defensivo % (DRB%).
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </motion.div>
                </Box>

                <Divider sx={{ my: 6, borderColor: 'rgba(0, 234, 255, 0.2)', borderWidth: 1 }} />

                <motion.div variants={itemVariants}>
                    <Typography variant="h4" component="h2" sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: '#FFD700',
                        textAlign: 'center',
                        mb: 3
                    }}>
                        IV. CONCLUSIÓN: EL LEGADO
                    </Typography>
                    <Typography paragraph sx={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        color: '#fff',
                        fontStyle: 'italic',
                        maxWidth: '800px',
                        mx: 'auto'
                    }}>
                        "El verdadero éxito no se mide por los trofeos en la vitrina, sino por la calidad de las redes neuronales construidas y la nobleza del carácter forjado en el fuego de la competición."
                    </Typography>
                    <Typography paragraph sx={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.2rem', textAlign: 'center', mt: 4 }}>
                        Le invitamos a sumergirse en esta disciplina donde la técnica depurada, la mente afilada y el espíritu indomable se unen en un solo movimiento fluido. Esto no es solo baloncesto; es una escuela de vida. ¡Bienvenido a la evolución!
                    </Typography>
                </motion.div>
            </Paper>
        </Box>
    );
};

export default BasketballAnalysis;
