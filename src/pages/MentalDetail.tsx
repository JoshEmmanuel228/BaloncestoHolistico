import { Box, Typography, Button, List, ListItem, ListItemText, Card, CardContent, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import YouTubeVideo from "../components/YouTubeVideo";


const mentalModules = {
  visualization: {
    title: "Visualización",
    description: "Técnicas de visualización para mejorar el rendimiento",
    exercises: [
      {
        name: "Visualización de Tiros Libres",
        duration: "10-15 minutos",
        steps: [
          "Encuentra un lugar tranquilo y cómodo",
          "Cierra los ojos y respira profundamente",
          "Visualiza el movimiento completo del tiro",
          "Siente la sensación del balón en tus manos",
          "Imagina el balón entrando en la canasta",
        ],
        benefits: [
          "Mejora la precisión del tiro",
          "Aumenta la confianza",
          "Reduce la ansiedad en situaciones de presión",
        ],
      },
      {
        name: "Visualización de Jugadas Ofensivas",
        duration: "15-20 minutos",
        steps: [
          "Repasa las jugadas en tu mente",
          "Visualiza cada movimiento y pase",
          "Imagina las diferentes opciones de ataque",
          "Practica la toma de decisiones",
          "Visualiza el éxito de la jugada",
        ],
        benefits: [
          "Mejora la comprensión táctica",
          "Desarrolla la visión de juego",
          "Aumenta la confianza en las jugadas",
        ],
      },
      {
        name: "Visualización de Defensa",
        duration: "10-15 minutos",
        steps: [
          "Visualiza la posición defensiva correcta",
          "Imagina los movimientos defensivos",
          "Practica la anticipación",
          "Visualiza la comunicación con compañeros",
          "Imagina el éxito defensivo",
        ],
        benefits: [
          "Mejora la posición defensiva",
          "Desarrolla la anticipación",
          "Fortalece la comunicación en equipo",
        ],
      },
    ],
    videos: [
      {
        id: "X7Y0AyfXZ8k",
        title: "Visualización para Jugadores de Baloncesto",
        description: "Técnicas de visualización para mejorar el rendimiento",
      },
      {
        id: "Yt8KjQzQkqk",
        title: "Visualización de Tiros Libres",
        description: "Cómo visualizar tiros libres para mejorar el porcentaje",
      },
    ],
  },
  meditation: {
    title: "Meditación",
    description: "Ejercicios de meditación para mejorar el enfoque",
    exercises: [
      {
        name: "Meditación Guiada Pre-Partido",
        duration: "10 minutos",
        steps: [
          "Encuentra una posición cómoda",
          "Enfoca tu atención en la respiración",
          "Libera la tensión muscular",
          "Visualiza el éxito en el partido",
          "Mantén una actitud positiva",
        ],
        benefits: [
          "Reduce la ansiedad pre-partido",
          "Mejora el enfoque",
          "Aumenta la concentración",
        ],
      },
      {
        name: "Respiración Consciente",
        duration: "5-10 minutos",
        steps: [
          "Siéntate con la espalda recta",
          "Respira profundamente por la nariz",
          "Mantén el aire por 4 segundos",
          "Exhala lentamente por la boca",
          "Repite el ciclo",
        ],
        benefits: [
          "Reduce el estrés",
          "Mejora el control emocional",
          "Aumenta la claridad mental",
        ],
      },
      {
        name: "Mindfulness en el Juego",
        duration: "15 minutos",
        steps: [
          "Enfoca tu atención en el presente",
          "Observa tus pensamientos sin juzgarlos",
          "Mantén la concentración en el juego",
          "Acepta las situaciones como son",
          "Responde en lugar de reaccionar",
        ],
        benefits: [
          "Mejora la toma de decisiones",
          "Reduce la distracción",
          "Aumenta la presencia mental",
        ],
      },
    ],
    videos: [
      {
        id: "Zt8Tb8yqX8Y",
        title: "Meditación para Atletas",
        description: "Técnicas de meditación para mejorar el enfoque",
      },
    ],
  },
  confidence: {
    title: "Confianza",
    description: "Desarrollo de la confianza y mentalidad ganadora",
    exercises: [
      {
        name: "Afirmaciones Positivas",
        duration: "5-10 minutos",
        steps: [
          "Identifica tus fortalezas",
          "Crea afirmaciones positivas",
          "Repite las afirmaciones diariamente",
          "Visualiza el éxito",
          "Celebra tus logros",
        ],
        benefits: [
          "Aumenta la autoestima",
          "Desarrolla una mentalidad positiva",
          "Mejora la confianza en uno mismo",
        ],
      },
      {
        name: "Establecimiento de Metas",
        duration: "15-20 minutos",
        steps: [
          "Define objetivos claros y realistas",
          "Establece plazos específicos",
          "Crea un plan de acción",
          "Monitorea el progreso",
          "Ajusta las metas según sea necesario",
        ],
        benefits: [
          "Proporciona dirección clara",
          "Aumenta la motivación",
          "Mejora el rendimiento",
        ],
      },
      {
        name: "Visualización del Éxito",
        duration: "10-15 minutos",
        steps: [
          "Imagina situaciones de éxito",
          "Visualiza el logro de metas",
          "Siente la emoción del éxito",
          "Practica la mentalidad ganadora",
          "Celebra los logros en tu mente",
        ],
        benefits: [
          "Fortalece la confianza",
          "Desarrolla resiliencia",
          "Mejora el rendimiento bajo presión",
        ],
      },
    ],
    videos: [
      {
        id: "VBl0HxrQw1Y",
        title: "Desarrollo de la Confianza",
        description: "Estrategias para construir confianza en el juego",
      },
    ],
  },
  guide: {
    title: "Guía de Preparación Mental para el Jugador de Baloncesto",
    description:
      "Herramientas y técnicas para desarrollar una mentalidad de élite en la cancha.",
    sections: [
      {
        title: "Introducción",
        paragraphs: [
          "La fortaleza mental es tan importante como la habilidad física en el baloncesto. Un jugador puede tener todo el talento del mundo, pero sin una mente preparada, no alcanzará su máximo potencial en los momentos clave.",
          "Esta guía te proporcionará las herramientas y técnicas para desarrollar una mentalidad de élite.",
        ],
      },
      {
        title: "Guía de Nutrición para el Jugador de Baloncesto de Alto Rendimiento",
        paragraphs: [
          "En el baloncesto de élite, la nutrición es un factor diferenciador: maximiza energía, potencia la velocidad, acelera la recuperación y ayuda a prevenir lesiones.",
        ],
        subTitle: "1. Los Pilares: Macronutrientes",
        list: [
          "Carbohidratos (60-65%): Fuente principal de energía. Prefiere complejos (avena, arroz integral, quinoa, pasta integral, patata, batata, legumbres) y simples justo antes/durante el ejercicio (fruta, miel).",
          "Proteínas (15-20%): Reparación y construcción muscular. Fuentes: pechuga de pollo, pavo, pescado (salmón), huevos, yogur griego, legumbres, tofu, whey protein.",
          "Grasas Saludables (20-25%): Soporte antiinflamatorio y salud hormonal. Fuentes: aguacate, frutos secos, semillas, aceite de oliva, pescado graso.",
        ],
      },
      {
        title: "2. Hidratación: La Estrategia Decisiva",
        paragraphs: [
          "La deshidratación reduce reacción, velocidad y concentración. Una pérdida del 2% de peso corporal afecta el rendimiento.",
        ],
        list: [
          "Todo el día: 3-4 litros de líquidos (ajustar según calor e intensidad).",
          "Antes: 500 ml 2 horas antes del partido/entrenamiento.",
          "Durante: 150-200 ml cada 15-20 minutos; isotónica si el esfuerzo es intenso y prolongado.",
          "Después: reponer 1.5 litros por cada kg perdido (pesaje pre/post).",
          "Monitorización: orina color amarillo pálido (tipo limonada).",
        ],
      },
      {
        title: "3. El Plan de Juego: Timing Nutricional del Día de Partido",
        paragraphs: [],
        table: [
          { moment: "Comida Pre-Partido (3-4h antes)", action: "Pechuga de pollo + pasta integral o batata + brócoli" },
          { moment: "Snack Pre-Partido (1h antes)", action: "Plátano o barrita baja en fibra" },
          { moment: "Durante el Partido", action: "Agua o bebida isotónica; gel o medio plátano en descansos largos" },
          { moment: "Ventana de Recuperación (0-60min)", action: "Batido de proteína con plátano o leche con chocolate" },
          { moment: "Cena Post-Partido (2-3h)", action: "Salmón + quinoa + ensalada con aguacate" },
        ],
      },
      {
        title: "4. Suplementación Inteligente",
        paragraphs: [
          "Los suplementos no sustituyen una dieta adecuada; consulta con un profesional. Algunos con evidencia científica pueden ayudar.",
        ],
        list: [
          "Whey Protein: rápida absorción para la recuperación.",
          "Creatina Monohidratada: mejora la potencia en esfuerzos cortos y repetidos.",
          "Cafeína: mejora alerta y reduce percepción del esfuerzo (45-60 min antes).",
          "Considerar Vitamina D y Omega-3 si la dieta o exposición solar es insuficiente.",
        ],
      },
      {
        title: "Cierre",
        paragraphs: [
          "La nutrición es una disciplina que requiere la misma seriedad que el entrenamiento. Tratada correctamente, se convierte en un arma estratégica para una carrera larga y exitosa.",
        ],
      },
      {
        title: "1. Visualización: Gana el Partido Antes de Jugarlo",
        paragraphs: [
          "La visualización es la práctica de crear imágenes mentales vívidas de ti mismo jugando y teniendo éxito. No se trata solo de soñar despierto; es un ensayo mental.",
        ],
        list: [
          "Sé Específico: Visualiza el arco perfecto del tiro libre, siente el balón, escucha la red.",
          "Usa Todos los Sentidos: Vista, oído, tacto e incluso el olfato.",
          "Visualiza el Éxito y la Respuesta a la Adversidad: Imagina fallar y recuperarte con intensidad.",
          "Rutina: Dedica 5-10 minutos diarios, antes de dormir o antes del partido.",
        ],
      },
      {
        title: "2. Establecimiento de Metas Claras y Realistas",
        paragraphs: [
          "Las metas te dan dirección y motivación. Utiliza el método SMART para que sean efectivas.",
        ],
        list: [
          "S - Específicas: Ej. 'Mejorar mi porcentaje de tiros libres al 80%'.",
          "M - Medibles: Usa estadísticas para seguir el progreso.",
          "A - Alcanzables: Deben ser desafiantes pero realistas.",
          "R - Relevantes: Alineadas con objetivos del equipo y tu rol.",
          "T - Con Plazo: Fija una fecha límite para cada meta.",
        ],
        subTitle: "Tipos de Metas",
        subList: [
          "Metas de Resultado: Ganar un campeonato (no dependen 100% de ti).",
          "Metas de Rendimiento: Ej. promediar 10 puntos por partido.",
          "Metas de Proceso: Ej. hacer 100 tiros libres después de cada entrenamiento.",
        ],
      },
      {
        title: "3. Control de la Presión y la Ansiedad",
        paragraphs: [
          "La presión es inevitable, pero la forma en que respondes a ella define tu rendimiento.",
        ],
        list: [
          "Técnicas de Respiración: Inhala 4s, mantiene 4s, exhala 6s para calmar el sistema nervioso.",
          "Rutinas Pre-Partido: Crea un ritual consistente (música, estiramientos, visualización).",
          "Enfócate en lo que Puedes Controlar: Esfuerzo, actitud y comunicación.",
        ],
      },
      {
        title: "4. Enfoque y Concentración: La Mentalidad de 'Siguiente Jugada'",
        paragraphs: [
          "El baloncesto es un juego rápido; perder la concentración por un segundo puede costar una canasta.",
        ],
        list: [
          "Palabras Clave (Cue Words): Ten una palabra para recentrarte después de un error ('Ahora', 'Siguiente jugada').",
          "Atención Plena (Mindfulness): Practica estar presente en sensaciones del juego.",
          "Divide el Juego: Enfócate en la siguiente posesión, no en los 4 cuartos.",
        ],
      },
      {
        title: "5. Autoconfianza y Diálogo Interno Positivo",
        paragraphs: [
          "Tu crítico más duro eres tú mismo. Aprende a ser tu mejor aliado.",
        ],
        list: [
          "Reemplaza pensamientos negativos por afirmaciones basadas en el entrenamiento.",
          "Lenguaje Corporal: Mantén la cabeza alta y el pecho fuera.",
          "Recuerda tus Éxitos: Ten un 'banco de confianza' mental con tus mejores jugadas.",
        ],
      },
      {
        title: "Plan de Acción Práctico",
        paragraphs: [],
        table: [
          { moment: "La Noche Anterior", action: "Visualización (10 min): repasa tus metas" },
          { moment: "Antes del Partido", action: "Rutina de calentamiento + respiración" },
          { moment: "Durante el Partido", action: "Mentalidad 'Siguiente Jugada' y foco en el proceso" },
          { moment: "En el Banquillo", action: "Mantente atento y apoya al equipo" },
          { moment: "Después del Partido", action: "Reflexión: 3 cosas bien y 1-2 a mejorar" },
        ],
      },
      {
        title: "Cierre",
        paragraphs: [
          "La fortaleza mental no se construye de la noche a la mañana. Requiere práctica diaria y disciplina, igual que tu técnica física. Integra estas técnicas en tu rutina y verás cómo tu juego alcanza un nuevo nivel.",
        ],
      },
    ],
  },
};

const MentalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const module = id ? mentalModules[id as keyof typeof mentalModules] : null;

  if (!module) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Módulo no encontrado
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/mental")}
        >
          Volver a Preparación Mental
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/mental")}
        sx={{ mb: 3 }}
      >
        Volver a Preparación Mental
      </Button>

      <Typography variant="h4" gutterBottom>
        {module.title}
      </Typography>
      <Typography color="text.secondary" paragraph>
        {module.description}
      </Typography>

      {/* Si el módulo tiene 'exercises' lo renderizamos como antes */}
      {('exercises' in module) ? (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Ejercicios
          </Typography>
          <Grid container spacing={3}>
            {module.exercises.map((exercise: any, index: number) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {exercise.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Duración: {exercise.duration}
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Pasos"
                          secondary={
                            <List dense>
                              {exercise.steps.map((step: string, idx: number) => (
                                <ListItem key={idx}>
                                  <ListItemText primary={`${idx + 1}. ${step}`} />
                                </ListItem>
                              ))}
                            </List>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Beneficios"
                          secondary={
                            <List dense>
                              {exercise.benefits.map((benefit: string, idx: number) => (
                                <ListItem key={idx}>
                                  <ListItemText primary={`• ${benefit}`} />
                                </ListItem>
                              ))}
                            </List>
                          }
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Videos Relacionados
          </Typography>
          {module.videos.map((video: any, index: number) => (
            <YouTubeVideo key={index} {...video} />
          ))}
        </>
      ) : (
        /* Si el módulo tiene 'sections' (como la guía completa), renderizamos las secciones */
        <>
          {module.sections.map((section: any, sIndex: number) => (
            <Box key={sIndex} sx={{ mt: 3 }}>
              <Typography variant="h5" gutterBottom>
                {section.title}
              </Typography>
              {section.paragraphs && section.paragraphs.map((p: string, pIdx: number) => (
                <Typography key={pIdx} color="text.secondary" paragraph>
                  {p}
                </Typography>
              ))}

              {section.list && (
                <List>
                  {section.list.map((item: string, idx: number) => (
                    <ListItem key={idx}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              )}

              {section.subTitle && (
                <>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {section.subTitle}
                  </Typography>
                  <List>
                    {section.subList && section.subList.map((item: string, idx: number) => (
                      <ListItem key={idx}><ListItemText primary={item} /></ListItem>
                    ))}
                  </List>
                </>
              )}

              {section.table && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {section.table.map((row: any, idx: number) => (
                    <Grid item xs={12} md={6} key={idx}>
                      <Card>
                        <CardContent>
                          <Typography variant="subtitle2" color="text.secondary">
                            {row.moment}
                          </Typography>
                          <Typography>{row.action}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default MentalDetail; 