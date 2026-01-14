import { Box, Typography } from '@mui/material';
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

    const textStyle = {
        color: '#fff',
        textShadow: '0px 2px 4px rgba(0,0,0,0.8), 0px 4px 8px rgba(0,0,0,0.5)', // Strong drop shadow for readability
        marginBottom: '1.5rem',
    };

    const sectionTitleStyle = {
        ...textStyle,
        fontWeight: 'bold',
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#fcb034', // Basketball orange/gold accent
        textShadow: '0px 2px 4px rgba(0,0,0,0.9)',
    };

    const subSectionTitleStyle = {
        ...textStyle,
        fontWeight: '600',
        marginTop: '1rem',
        marginBottom: '0.5rem',
        color: '#ffd54f', // Lighter gold
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
                padding: { xs: 2, md: 6 },
                position: 'relative',
                zIndex: 2,
            }}
        >
            <motion.div variants={itemVariants}>
                <Typography variant="h3" component="h1" sx={{ ...textStyle, textAlign: 'center', mb: 4, fontWeight: '800' }}>
                    Bienvenida a nuestra Comunidad de Baloncesto Holístico: Forjando Seres Humanos, No Solo Atletas
                </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography variant="body1" sx={{ ...textStyle, fontSize: '1.1rem' }}>
                    Estimado miembro de nuestra comunidad, le damos la más sincera bienvenida a un espacio donde el baloncesto trasciende la mera competición para convertirse en una disciplina formativa y una poderosa herramienta de crecimiento humano. Nuestra visión se alinea con el enfoque del posdesarrollo, priorizando su evolución como persona sobre los resultados y logros técnicos.
                </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography variant="h4" component="h2" sx={sectionTitleStyle}>
                    I. La Filosofía del Crecimiento Humano y la Construcción Social
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    En este entorno, entendemos el baloncesto como un catalizador para la construcción de tejido social y la promoción de la sana convivencia. La práctica colectiva fomenta de manera natural valores esenciales como el respeto, la cooperación, la empatía y la responsabilidad. Este deporte es una estrategia educativa que posiciona a los jóvenes con principios y valores, haciéndolos conscientes de su rol dentro de la sociedad.
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    Aquí cultivamos activamente las habilidades sociales, generando espacios de diálogo, empatía y toma de decisiones en equipo, lo cual fortalece los lazos de amistad y la convivencia. A través del juego, se desarrollan destrezas fundamentales de socialización, promoviendo la construcción de empatía y la resolución de conflictos desde una mirada crítica y constructiva. De hecho, encuestas realizadas a deportistas demuestran que el baloncesto contribuye significativamente a la comunicación efectiva, al fortalecimiento del respeto mutuo hacia compañeros, entrenadores y oponentes (el 100% de los encuestados así lo reconoce en casi todas o todas las ocasiones), y a la búsqueda de soluciones pacíficas en lugar de enfrentamientos.
                </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography variant="h4" component="h2" sx={sectionTitleStyle}>
                    II. Maestría Mental, Cognitiva y Emocional
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    El baloncesto es una compleja interacción entre el cuerpo y la mente, ofreciendo un terreno fértil para moldear nuestras capacidades cognitivas y neurológicas.
                </Typography>

                <Typography variant="h5" component="h3" sx={subSectionTitleStyle}>
                    A. Neuroplasticidad y Agilidad Mental
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    Esta disciplina es un catalizador de la neuroplasticidad, la capacidad del cerebro para reorganizarse y formar nuevas conexiones neuronales en respuesta al aprendizaje. La constante necesidad de tomar decisiones rápidas y precisas estimula áreas cerebrales relacionadas con la anticipación, la flexibilidad cognitiva y el procesamiento de la sorpresa. Se ha demostrado que la práctica regular mejora funciones ejecutivas como la memoria de trabajo, la inhibición y la integración sensoriomotora, llevando a una mayor eficiencia neural donde el cerebro requiere menos recursos para procesar la información.
                </Typography>

                <Typography variant="h5" component="h3" sx={subSectionTitleStyle}>
                    B. Fortaleza Mental y Composición
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    El entorno deportivo entrena capacidades emocionales complejas. La exposición continua a la presión y el error fortalecen los circuitos cerebrales encargados de la regulación emocional, mejorando la resiliencia y la capacidad de adaptarse positivamente frente a la adversidad. La psicología deportiva confirma que variables como la motivación, la activación, la confianza y la atención son cruciales para la fortaleza mental. Para la posición de Base —el director del equipo en la cancha— la compostura o calma es la cualidad intangible más importante; sin una cabeza fría, un jugador se estanca, y el equipo pierde la fe si el líder pierde la calma.
                </Typography>

                <Typography variant="h5" component="h3" sx={subSectionTitleStyle}>
                    C. La Visión como Herramienta Táctica
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    La visión es determinante en el rendimiento, especialmente en un deporte dinámico como el baloncesto que requiere un amplio rango de habilidades visuales. No solo se trata de la agudeza visual estática, sino crucialmente de la agudeza visual dinámica (la capacidad de discriminar objetos en movimiento) y la visión periférica. Los jugadores expertos realizan menos fijaciones oculares y buscan sistemáticamente el espacio libre, adoptando estrategias de exploración visual que se traducen en una respuesta táctica más rápida. El uso de la visión periférica es imprescindible para el engaño y la ejecución de pases precisos, permitiendo percibir al compañero sin necesidad de mirarlo directamente.
                </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography variant="h4" component="h2" sx={sectionTitleStyle}>
                    III. Excelencia Física y Técnica Holística
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    El baloncesto es un deporte acíclico e intermitente con una alta demanda energética, requiriendo altos niveles de fuerza, agilidad y capacidad anaeróbica.
                </Typography>

                <Typography variant="h5" component="h3" sx={subSectionTitleStyle}>
                    A. Fundamentos Físicos y Preparación
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    La preparación física es un pilar, enfocándose en la resistencia, la capacidad cardiovascular y, fundamentalmente, en el entrenamiento de fuerza y potencia para mejorar la explosividad en los movimientos, lo cual es crucial para tirar, saltar y resistir el contacto. Además, se promueve el entrenamiento en 3D (físico, cognitivo y coordinativo) y la implementación del Complex Training, que combina fuerza con movimientos explosivos para maximizar el rendimiento.
                </Typography>

                <Typography variant="h5" component="h3" sx={subSectionTitleStyle}>
                    B. Habilidades Técnicas Esenciales
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    El desarrollo técnico es un proceso continuo que se enfoca en las habilidades motrices específicas. El dominio del dribble (bote) y el pase son las mayores armas del jugador Base, siendo el manejo del balón la base literal de todo el juego, ya que si es sólido, permite una buena visión de cancha bajo presión. Los fundamentos básicos incluyen el lanzamiento, el manejo del balón, el desplazamiento, el pase, el drible y el rebote. El lanzamiento (tiro) es crítico, ya que si un jugador no puede tirar, todo el equipo sufre, abriendo la cancha y obligando a la defensa a ser "honesta".
                </Typography>

                <Typography variant="h5" component="h3" sx={subSectionTitleStyle}>
                    C. El Rol Estratégico del Base
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    El Base (conocido como "1") es el director del equipo, encargado de manejar el juego, marcar las jugadas y distribuir el balón. Sus características recomendables incluyen visión de juego, capacidad de dar buenos pases y un acertado tiro exterior. La inteligencia y agilidad mental son cruciales para elegir la jugada correcta y controlar los tempos del partido, previniendo la desorganización del equipo.
                </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography variant="h4" component="h2" sx={sectionTitleStyle}>
                    IV. Conclusión
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                    Nuestra comunidad le ofrece una experiencia integral donde el éxito no se mide solo por los puntos anotados, sino por las redes neuronales que se construyen mientras se juega, y por el impacto positivo que generamos en la convivencia social. Le invitamos a sumergirse en esta disciplina donde la técnica, la mente y el espíritu se unen para forjar atletas completos y ciudadanos conscientes. ¡Bienvenido al baloncesto que transforma!
                </Typography>
            </motion.div>
        </Box>
    );
};

export default BasketballAnalysis;
