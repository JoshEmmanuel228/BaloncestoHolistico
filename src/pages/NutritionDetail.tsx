import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails, Chip } from "@mui/material";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import OpacityIcon from '@mui/icons-material/Opacity';
import ArticleIcon from '@mui/icons-material/Article';
import { useParams, useNavigate } from "react-router-dom";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import BananaIcon from '../components/BananaIcon';
import YouTubeVideo from "../components/YouTubeVideo";
import DownloadPdf from "../components/DownloadPdf";

const nutritionModules = {
  mealPlan: {
    title: "Plan de Alimentación Diario",
    description: "Plan nutricional completo para jugadores de baloncesto",
    meals: [
      {
        name: "Desayuno",
        time: "7:00 AM",
        foods: [
          "Avena con frutas y proteína",
          "Huevos revueltos",
          "Pan integral con aguacate",
          "Batido de proteína",
        ],
        calories: "600-700 kcal",
        macros: "40% carbohidratos, 30% proteína, 30% grasas",
      },
      {
        name: "Almuerzo",
        time: "12:00 PM",
        foods: [
          "Pollo a la parrilla",
          "Arroz integral",
          "Ensalada de vegetales",
          "Aguacate",
        ],
        calories: "700-800 kcal",
        macros: "45% carbohidratos, 35% proteína, 20% grasas",
      },
      {
        name: "Cena",
        time: "7:00 PM",
        foods: [
          "Salmón al horno",
          "Quinoa",
          "Verduras al vapor",
          "Aceite de oliva",
        ],
        calories: "600-700 kcal",
        macros: "35% carbohidratos, 40% proteína, 25% grasas",
      },
      {
        name: "Snacks",
        time: "Entre comidas",
        foods: [
          "Frutos secos",
          "Yogur griego",
          "Fruta",
          "Barra de proteína",
        ],
        calories: "200-300 kcal por snack",
        macros: "Varía según el snack",
      },
    ],
    videos: [
      {
        id: "X7Y0AyfXZ8k",
        title: "Plan de Alimentación para Jugadores de Baloncesto",
        description: "Guía completa de nutrición para jugadores de baloncesto",
      },
      {
        id: "Yt8KjQzQkqk",
        title: "Recetas Saludables para Atletas",
        description: "Recetas nutritivas y deliciosas para mejorar el rendimiento",
      },
    ],
  },
  preGame: {
    title: "Nutrición Pre-Partido",
    description: "Qué comer antes de jugar para optimizar el rendimiento",
    meals: [
      {
        name: "3-4 horas antes",
        time: "3-4 horas antes del partido",
        foods: [
          "Pasta integral con pollo",
          "Arroz con vegetales",
          "Pan integral con pavo",
        ],
        calories: "500-600 kcal",
        macros: "60% carbohidratos, 25% proteína, 15% grasas",
      },
      {
        name: "2-3 horas antes",
        time: "2-3 horas antes del partido",
        foods: [
          "Yogur con granola",
          "Batido de frutas",
          "Barra de energía",
        ],
        calories: "300-400 kcal",
        macros: "70% carbohidratos, 20% proteína, 10% grasas",
      },
      {
        name: "1 hora antes",
        time: "1 hora antes del partido",
        foods: [
          "Plátano",
          "Manzana",
          "Bebida deportiva",
        ],
        calories: "150-200 kcal",
        macros: "90% carbohidratos, 5% proteína, 5% grasas",
      },
    ],
    videos: [
      {
        id: "Zt8Tb8yqX8Y",
        title: "Nutrición Pre-Partido",
        description: "Qué comer antes de un partido de baloncesto",
      },
    ],
  },
  hydration: {
    title: "Plan de Hidratación",
    description: "Guía completa de hidratación para jugadores",
    meals: [
      {
        name: "Durante el día",
        time: "Todo el día",
        foods: [
          "2-3 litros de agua",
          "Agua con limón",
          "Té verde",
        ],
        amount: "250-300 ml cada hora",
        notes: "Mantener una hidratación constante",
      },
      {
        name: "Durante el entrenamiento",
        time: "Durante el ejercicio",
        foods: [
          "Bebida deportiva",
          "Agua",
        ],
        amount: "500-750 ml por hora",
        notes: "Beber cada 15-20 minutos",
      },
      {
        name: "Post-entrenamiento",
        time: "Después del ejercicio",
        foods: [
          "Bebida deportiva",
          "Agua de coco",
          "Agua con electrolitos",
        ],
        amount: "500-750 ml",
        notes: "Reponer electrolitos perdidos",
      },
    ],
    videos: [
      {
        id: "VBl0HxrQw1Y",
        title: "Hidratación para Atletas",
        description: "Importancia de la hidratación en el rendimiento deportivo",
      },
    ],
  },
  highPerformance: {
    title: "Nutrición de Alto Rendimiento",
    description: "Guía de nutrición para jugadores de baloncesto de élite",
    sections: [
      {
        title: "Introducción",
        paragraphs: [
          "En el baloncesto de élite, la nutrición es un factor diferenciador: maximiza energía, potencia la velocidad, acelera la recuperación y ayuda a prevenir lesiones.",
        ],
      },
      {
        title: "Informe Completo: Nutrición Holística para el Jugador de Baloncesto de Alto Rendimiento",
        paragraphs: [
          "La nutrición es una disciplina estratégica que potencia la energía física, la recuperación, la salud mental y emocional, la prevención de lesiones y la longevidad deportiva. Debe adaptarse a la posición, calendario y objetivos individuales.",
        ],
      },
      {
        title: "1. Los Pilares: Macronutrientes",
        paragraphs: [
          "Los macronutrientes forman la base de la estrategia nutricional: carbohidratos para energía, proteínas para reparación y grasas saludables para soporte antiinflamatorio y hormonal.",
        ],
        list: [
          "Carbohidratos (60-65%): complejos como avena, arroz integral, quinoa, pasta integral, patata, batata y legumbres; simples (fruta, miel) antes/durante ejercicio.",
          "Proteínas (15-20%): pechuga de pollo, pavo, pescado, huevos, yogur griego, legumbres, tofu, whey protein.",
          "Grasas Saludables (20-25%): aguacate, frutos secos, semillas, aceite de oliva, pescado graso.",
        ],
        subTitle: "Micronutrientes y Personalización",
        subList: [
          "Micronutrientes: vitaminas y minerales esenciales (frutas, verduras, smoothies).",
          "Individualización: adaptar según la posición, metabolismo y carga de entrenamiento.",
        ],
      },
      {
        title: "2. Hidratación",
        paragraphs: [
          "La deshidratación disminuye rendimiento y aumenta riesgo de lesión; gestionar líquidos y electrolitos es crítico.",
        ],
        list: [
          "Todo el día: 3-4 litros (ajustar según calor e intensidad).",
          "Antes: 500 ml 2 horas antes.",
          "Durante: 150-200 ml cada 15-20 min; isotónica si es necesario.",
          "Después: reponer 1.5 L por kg perdido.",
        ],
        notes: [
          "Limitar bebidas azucaradas, alcohol y cafeína excesiva.",
          "Protocolos adaptados para calor, viajes y fases de alta exigencia.",
        ],
      },
      {
        title: "3. Timing Nutricional del Día de Partido",
        paragraphs: [
          "Organiza el día en sectores: comida pre-partido, snack, durante, recuperación y cena post-partido. El 'cuándo' es tan importante como el 'qué'.",
        ],
        table: [
          { moment: "Comida Pre-Partido (3-4h)", action: "Pechuga de pollo + pasta integral o batata + brócoli" },
          { moment: "Snack (1h)", action: "Plátano o barrita baja en fibra" },
          { moment: "Durante", action: "Agua/isotónica; gel o medio plátano en descansos largos" },
          { moment: "Ventana 0-60min", action: "Batido de proteína con plátano o leche con chocolate" },
          { moment: "Cena 2-3h", action: "Salmón + quinoa + ensalada con aguacate" },
        ],
      },
      {
        title: "3.2 Menú Semanal Modelo (Incluye Opciones Vegetarianas/Veganas)",
        paragraphs: [],
        table: [
          { moment: "Lunes", action: "Desayuno: Tortilla + pan integral; Comida: Quinoa con pollo; Cena: Trucha y boniato" },
          { moment: "Martes", action: "Desayuno: Avena; Comida: Ensalada de garbanzos; Cena: Bacalao y puré" },
          { moment: "Miércoles", action: "Desayuno: Yogur griego; Comida: Pasta integral con salmón; Cena: Pollo curry" },
          { moment: "Jueves", action: "Desayuno: Pan+aguacate+huevo; Comida: Lentejas; Cena: Omelette" },
          { moment: "Viernes", action: "Desayuno: Pan integral y jamón; Comida: Merluza con couscous; Cena: Chili de ternera" },
          { moment: "Sábado", action: "Desayuno: Tortitas avena; Comida: Pizza integral con pavo; Cena: Sopa de verduras" },
          { moment: "Domingo", action: "Desayuno: Smoothie; Comida: Paella mixta; Cena: Sushi variado" },
        ],
      },
      {
        title: "4. Suplementación Inteligente",
        paragraphs: [
          "Utiliza suplementos solo bajo supervisión: basados en análisis y necesidades individuales.",
        ],
        list: [
          "Whey Protein: recuperación rápida post-entreno.",
          "Creatina Monohidrato: potencia en esfuerzos cortos y repetidos.",
          "Beta Alanina: mejora resistencia anaeróbica.",
          "Cafeína: mejora alerta y percepción del esfuerzo (usar con cautela).",
          "Omega-3: antiinflamatorio y apoyo cardiovascular.",
          "Vitamina D, Probióticos, Colágeno: según necesidades y contexto.",
        ],
        notes: [
          "Monitoriza con pruebas bioquímicas y chequeos físicos periódicos.",
        ],
      },
      {
        title: "5. Prevención de Lesiones y Recuperación",
        paragraphs: [
          "Aporta colágeno + vitamina C antes de ejercicio intenso; integra antioxidantes naturales (cereza ácida, frutos rojos, cúrcuma) y combina proteína+carbohidratos en la recuperación.",
        ],
      },
      {
        title: "6. Bienestar Mental, Sueño y Armonía Cuerpo-Mente",
        paragraphs: [
          "Prioriza sueño regular (7-9 h/día). Cena con carbohidratos complejos y proteína magra para mejorar sueño. Integra mindfulness y técnicas de respiración pre-partido.",
        ],
      },
      {
        title: "7. FAQs y Consejos Prácticos",
        paragraphs: [],
        list: [
          "Vegano/Vegetariano: reforzar proteína vegetal, monitorizar B12, hierro y omega-3.",
          "Viajes largos: snacks portables (frutos secos, barritas, batidos en polvo).",
          "Evitar molestias digestivas: probar alimentos solo en entrenamientos, reducir fibra/grasas antes de partidos.",
        ],
      },
      {
        title: "8. Integración Holística y Equipo Multidisciplinario",
        paragraphs: [
          "Promueve educación, colaboración entre nutriólogos, psicólogos, fisioterapeutas, chefs y preparadores para planes personalizados y seguimiento.",
        ],
      },
      {
        title: "Cierre",
        paragraphs: [
          "La nutrición es una disciplina: trata con la misma seriedad que el entrenamiento para convertirla en un arma estratégica.",
        ],
      },
    ],
  },
};

const NutritionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const module = id ? nutritionModules[id as keyof typeof nutritionModules] : null;
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(0);

  const openSection = (index: number) => {
    setExpandedIndex(index);
    const el = document.getElementById(`section-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!module) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Módulo no encontrado
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/nutrition")}
        >
          Volver a Nutrición
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Botón de descarga cuando sea un módulo de secciones */}
      {('sections' in module) && (
        <Box sx={{ mb: 2 }}>
          <DownloadPdf beforeCapture={() => { setExpandedIndex(null); }} afterCapture={() => setExpandedIndex(0)} targetId="nutrition-report" fileName={`informe-nutricion-${module.title.replace(/\s+/g, '-')}.pdf`} />

          {/* TOC */}
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="subtitle1">Contenido</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {module.sections.map((section: any, idx: number) => (
                <Button key={idx} size="small" variant="outlined" onClick={() => openSection(idx)}>
                  {section.title}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      )}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/nutrition")}
        sx={{ mb: 3 }}
      >
        Volver a Nutrición
      </Button>

      <Typography variant="h4" gutterBottom>
        {module.title}
      </Typography>
      {/* Badge distintivo por área */}
      <Box sx={{ mb: 2 }}>
        {(() => {
          const idKey = id;
          if (idKey === 'mealPlan') return <Chip label="Planes" color="primary" size="small" icon={<LocalDiningIcon sx={{ fontSize: 18 }} />} />;
          if (idKey === 'preGame') return <Chip label="Pre-Partido" color="warning" size="small" icon={<SportsScoreIcon sx={{ fontSize: 18 }} />} />;
          if (idKey === 'hydration') return <Chip label="Hidratación" color="info" size="small" icon={<OpacityIcon sx={{ fontSize: 18 }} />} />;
          return <Chip label="Informe" color="success" size="small" icon={<ArticleIcon sx={{ fontSize: 18 }} />} />;
        })()}
      </Box>
      <Typography color="text.secondary" paragraph>
        {module.description}
      </Typography>

  {('meals' in module) ? (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Plan de Alimentación
          </Typography>
          <Grid container spacing={3}>
            {module.meals.map((meal: any, index: number) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {meal.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {meal.time}
                    </Typography>
                    <List dense>
                      {meal.foods.map((food: string, idx: number) => (
                        <ListItem key={idx}>
              <ListItemIcon>
                              <BananaIcon />
              </ListItemIcon>
                          <ListItemText primary={food} />
                        </ListItem>
                      ))}
                      {"calories" in meal && (
                        <ListItem>
                          <ListItemText
                            primary="Calorías"
                            secondary={meal.calories}
                          />
                        </ListItem>
                      )}
                      {"macros" in meal && (
                        <ListItem>
                          <ListItemText
                            primary="Macronutrientes"
                            secondary={meal.macros}
                          />
                        </ListItem>
                      )}
                      {"amount" in meal && (
                        <ListItem>
                          <ListItemText
                            primary="Cantidad"
                            secondary={meal.amount}
                          />
                        </ListItem>
                      )}
                      {"notes" in meal && (
                        <ListItem>
                          <ListItemText
                            primary="Notas"
                            secondary={meal.notes}
                          />
                        </ListItem>
                      )}
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
        /* Renderizar módulos que contienen 'sections' (ej. highPerformance) */
        <>
          <Box id="nutrition-report">
            {module.sections.map((section: any, sIndex: number) => (
              <Accordion key={sIndex} expanded={expandedIndex === null ? true : expandedIndex === sIndex} onChange={() => setExpandedIndex(expandedIndex === sIndex ? null : sIndex)} id={`section-${sIndex}`} sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`section-${sIndex}-content`} id={`section-${sIndex}-header`}>
                  <Typography variant="h6">{section.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default NutritionDetail; 