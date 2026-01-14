import React from 'react';
import '../styles/sectionBackgrounds.css';

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import {
  Psychology as PsychologyIcon,
  SelfImprovement as MeditationIcon,
  Visibility as VisualizationIcon,
  EmojiEvents as MotivationIcon,
  Favorite as ConfidenceIcon,
} from '@mui/icons-material';

import LocalVideo from "../components/LocalVideo";
import TabPanel from "../components/TabPanel";

const mentalVideos = {
  local: [
    {
      src: "/videos/Más_Allá_de_la_Canasta.mp4",
      title: "Más Allá de la Canasta",
      description: "Explorando el impacto del baloncesto más allá del juego.",
    },
    {
      src: "/videos/Más_Allá_del_juego.mp4",
      title: "Más Allá del Juego",
      description: "Profundizando en la psicología y cultura del baloncesto.",
    },
  ],
};

const mentalPodcasts = {
  local: [
    {
      src: "/podcasts/El_básquet_cambia_tu_cerebro_y_vida.m4a",
      title: "El Básquet cambia tu cerebro y vida",
      description: "Impacto del baloncesto en el desarrollo cerebral y personal.",
    },
    {
      src: "/podcasts/Fuerza_moderna_en_básquetbol_prevenir_y_rendir.m4a",
      title: "Fuerza moderna en básquetbol: prevenir y rendir",
      description: "Estrategias modernas de fuerza para prevención de lesiones y rendimiento.",
    },
    {
      src: "/podcasts/El_desarrollo_integral_del_jugador_de_baloncesto.m4a",
      title: "El desarrollo integral del jugador de baloncesto",
      description: "Visión holística para el crecimiento del atleta.",
    },
  ],
};

const Mental = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const mentalModules = [
    {
      id: "visualization",
      title: "Visualización",
      description: "Técnicas de visualización para mejorar el rendimiento",
      icon: <VisualizationIcon sx={{ fontSize: 40 }} />,
      exercises: [
        "Visualización de tiros libres",
        "Visualización de jugadas ofensivas",
        "Visualización de defensa",
      ],
    },
    {
      id: "guide",
      title: "Guía: Preparación Mental",
      description: "Guía completa con técnicas y plan de acción para desarrollar la mentalidad de élite",
      icon: <MotivationIcon sx={{ fontSize: 40 }} />,
      exercises: [
        "Visualización: Gana el partido antes de jugarlo",
        "Establecimiento de metas SMART",
        "Control de la presión y técnicas de respiración",
        "Enfoque: Mentalidad 'Siguiente Jugada'",
        "Diálogo interno positivo y confianza",
      ],
    },
    {
      id: "meditation",
      title: "Meditación",
      description: "Ejercicios de meditación para mejorar el enfoque",
      icon: <MeditationIcon sx={{ fontSize: 40 }} />,
      exercises: [
        "Meditación guiada pre-partido",
        "Respiración consciente",
        "Mindfulness en el juego",
      ],
    },
    {
      id: "confidence",
      title: "Confianza",
      description: "Desarrollo de la confianza y mentalidad ganadora",
      icon: <ConfidenceIcon sx={{ fontSize: 40 }} />,
      exercises: [
        "Afirmaciones positivas",
        "Establecimiento de metas",
        "Visualización del éxito",
      ],
    },
  ];

  return (
    <>
      {/* Fondo KB.JPG para la sección de preparación mental */}
      <div className="mental-bg-kb"></div>
      <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Preparación Mental
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="mental tabs">
          <Tab label="Ejercicios" />
          <Tab label="Videos" />
          <Tab label="Podcast" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {mentalModules.map((module) => (
              <Grid item xs={12} md={4} key={module.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {module.icon}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {module.title}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" paragraph>
                      {module.description}
                    </Typography>
                    <List>
                      {module.exercises.map((exercise, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <PsychologyIcon />
                          </ListItemIcon>
                          <ListItemText primary={exercise} />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/mental/${module.id}`)}
                    >
                      Ver Ejercicios Completos
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="h5" gutterBottom>
            Videos de Preparación Mental
          </Typography>
          {mentalVideos.local.map((video, index) => (
            <LocalVideo key={`local-video-${index}`} {...video} />
          ))}
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography variant="h5" gutterBottom>
            Podcast Baloncestista
          </Typography>
          {mentalPodcasts.local.map((podcast, index) => (
            <LocalVideo key={`local-${index}`} {...podcast} />
          ))}
        </TabPanel>
      </Box>
    </>
  );
};

export default Mental;