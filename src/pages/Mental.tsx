import React from 'react';
import '../styles/sectionBackgrounds.css';
import '../styles/profileBio.css';

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
  Container,
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
    <div className="bio-interface-container" style={{ minHeight: '100vh', width: '100%' }}>
      {/* Animated DNA Background Layer */}
      <div className="dna-bg-layer"></div>

      <Box sx={{ p: 0, position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Box sx={{
          width: '100%',
          borderBottom: '1px solid rgba(0,234,255,0.2)',
          bgcolor: 'rgba(5, 15, 25, 0.4)',
          backdropFilter: 'blur(10px)',
          pt: 10,
          pb: 2,
          mb: 4
        }}>
          <Container maxWidth="xl">
            <Typography variant="h4" gutterBottom sx={{ 
              fontFamily: "'Orbitron', sans-serif", 
              fontWeight: 700,
              color: '#00eaff',
              textShadow: '0 0 10px rgba(0,234,255,0.4)',
              letterSpacing: 2
            }}>
              PREPARACIÓN MENTAL // NEURAL_INTERFACE
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(0,234,255,0.6)', letterSpacing: 1 }}>
              PSYCHOLOGICAL TRAINING MODULE // V.1.0
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="xl">
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="mental tabs"
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#00eaff' },
              '& .MuiTab-root': { color: 'rgba(0,234,255,0.5)', fontFamily: "'Orbitron', sans-serif" },
              '& .Mui-selected': { color: '#00eaff !important' },
              mb: 4
            }}
          >
            <Tab label="Ejercicios" />
            <Tab label="Videos" />
            <Tab label="Podcast" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Grid container spacing={3}>
              {mentalModules.map((module) => (
                <Grid item xs={12} md={4} key={module.id}>
                  <Card sx={{ 
                    bgcolor: 'rgba(5, 15, 25, 0.8)', 
                    border: '1px solid rgba(0,234,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      borderColor: '#00eaff',
                      boxShadow: '0 0 20px rgba(0,234,255,0.2)',
                      transform: 'translateY(-5px)'
                    }
                  }}>
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        {React.cloneElement(module.icon as React.ReactElement, { sx: { fontSize: 40, color: '#00eaff' } })}
                        <Typography variant="h6" sx={{ ml: 1, color: '#00eaff', fontFamily: "'Orbitron', sans-serif" }}>
                          {module.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'rgba(0, 234, 255, 0.7)', mb: 2, height: '3em', overflow: 'hidden' }}>
                        {module.description}
                      </Typography>
                      <List dense sx={{ mb: 2 }}>
                        {module.exercises.map((exercise, idx) => (
                          <ListItem key={idx} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 35, color: '#00eaff' }}>
                              <PsychologyIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={exercise} 
                              primaryTypographyProps={{ variant: 'body2', sx: { color: 'rgba(255,255,255,0.8)' } }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        variant="outlined"
                        className="bio-btn"
                        fullWidth
                        sx={{ mt: 'auto' }}
                        onClick={() => navigate(`/mental/${module.id}`)}
                      >
                        ACCEDER AL MÓDULO
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Typography variant="h5" gutterBottom sx={{ color: '#00eaff', fontFamily: "'Orbitron', sans-serif", mb: 3 }}>
              ARCHIVOS DE VIDEO // REPRODUCCIÓN
            </Typography>
            <Grid container spacing={4}>
              {mentalVideos.local.map((video, index) => (
                <Grid item xs={12} key={`local-video-${index}`}>
                   <LocalVideo {...video} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Typography variant="h5" gutterBottom sx={{ color: '#00eaff', fontFamily: "'Orbitron', sans-serif", mb: 3 }}>
              PODCAST BALONCESTISTA // ARCHIVOS DE AUDIO
            </Typography>
            <Grid container spacing={4}>
              {mentalPodcasts.local.map((podcast, index) => (
                <Grid item xs={12} key={`local-${index}`}>
                   <LocalVideo {...podcast} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Container>
      </Box>
    </div>
  );
};

export default Mental;