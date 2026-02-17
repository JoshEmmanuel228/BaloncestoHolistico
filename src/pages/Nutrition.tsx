import React from 'react';
import '../styles/sectionModernBackgrounds.css';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Container,
  Paper,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import BananaIcon from '../components/BananaIcon';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import OpacityIcon from '@mui/icons-material/Opacity';
import ArticleIcon from '@mui/icons-material/Article';
import YouTubeVideo from "../components/YouTubeVideo";
import TabPanel from "../components/TabPanel";

const nutritionVideos = {
  mealPlan: [
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
  preGame: [
    {
      id: "Zt8Tb8yqX8Y",
      title: "Nutrición Pre-Partido",
      description: "Qué comer antes de un partido de baloncesto",
    },
  ],
  hydration: [
    {
      id: "VBl0HxrQw1Y",
      title: "Hidratación para Atletas",
      description: "Importancia de la hidratación en el rendimiento deportivo",
    },
  ],
};

const Nutrition = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const getAreaIcon = (id: string, size: number = 24) => {
    const sx = { fontSize: size, color: 'text.secondary' } as any;
    switch (id) {
      case 'mealPlan':
        return <LocalDiningIcon sx={sx} />;
      case 'preGame':
        return <SportsScoreIcon sx={sx} />;
      case 'hydration':
        return <OpacityIcon sx={sx} />;
      case 'holisticReport':
      default:
        return <ArticleIcon sx={sx} />;
    }
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const nutritionModules = [
    {
      id: "mealPlan",
      title: "Plan de Alimentación Diario",
      description: "Plan nutricional completo para jugadores de baloncesto",
      icon: <BananaIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
      badge: { label: 'Planes', color: 'primary', icon: <LocalDiningIcon sx={{ fontSize: 18 }} /> },
      meals: [
        "Desayuno: Avena con frutas y proteína",
        "Almuerzo: Pollo a la parrilla con arroz integral",
        "Cena: Salmón con verduras al vapor",
      ],
    },
    {
      id: "preGame",
      title: "Nutrición Pre-Partido",
      description: "Qué comer antes de jugar",
      icon: <BananaIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
      badge: { label: 'Pre-Partido', color: 'warning', icon: <SportsScoreIcon sx={{ fontSize: 18 }} /> },
      meals: [
        "Carbohidratos complejos 3-4 horas antes",
        "Proteína magra 2-3 horas antes",
        "Snack ligero 1 hora antes",
      ],
    },
    {
      id: "hydration",
      title: "Hidratación",
      description: "Plan de hidratación para jugadores",
      icon: <BananaIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
      badge: { label: 'Hidratación', color: 'info', icon: <OpacityIcon sx={{ fontSize: 18 }} /> },
      meals: [
        "2-3 litros de agua diarios",
        "Bebidas deportivas durante el ejercicio",
        "Monitoreo del color de la orina",
      ],
    },
    {
      id: "holisticReport",
      title: "Informe: Nutrición Holística",
      description: "Informe completo sobre nutrición holística para jugadores de alto rendimiento",
      icon: <BananaIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
      badge: { label: 'Informe', color: 'success', icon: <ArticleIcon sx={{ fontSize: 18 }} /> },
      meals: [
        "Introducción y fundamentos",
        "Pilares nutricionales y timing del día",
        "Hidratación, suplementación y recuperación",
        "Prevención de lesiones y bienestar mental",
      ],
    },
    {
      id: "metabolicRecovery",
      title: "Cura Metabólica & Lesiones",
      description: "Recuperación acelerada y protocolos anti-inflamatorios",
      icon: <BananaIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
      badge: { label: 'Salud', color: 'error', icon: <LocalDiningIcon sx={{ fontSize: 18 }} /> },
      meals: [
        "Protocolos para lesiones (Músculo vs Hueso)",
        "Alimentos anti-inflamatorios (Cúrcuma, Omega-3)",
        "Salud intestinal y absorción",
      ],
    },
    {
      id: "travelNutrition",
      title: "Nutrición de Viaje & Torneos",
      description: "Mantén el rendimiento fuera de casa",
      icon: <BananaIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
      badge: { label: 'Viaje', color: 'info', icon: <SportsScoreIcon sx={{ fontSize: 18 }} /> },
      meals: [
        "Estrategias para Aeropuertos y Hoteles",
        "Guía de supervivencia Fast Food",
        "Manejo del Jet Lag e hidratación en vuelo",
      ],
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', pb: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Fixed Background Layer - Covers Entire Viewport */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0
        }}
      />

      {/* Fixed Dark Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(18,18,18,0.85) 0%, rgba(18,18,18,0.95) 100%)',
          zIndex: 0
        }}
      />

      {/* Content Wrapper */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>

        {/* Hero Section */}
        <Box
          sx={{
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            position: 'relative'
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: 'center', zIndex: 2 }}>
            <Typography variant="overline" sx={{ letterSpacing: 8, color: '#00e5ff', fontWeight: 'bold' }}>
              Elite Fueling
            </Typography>
            <Typography variant="h1" fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: -2, background: '-webkit-linear-gradient(45deg, #fff, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: { xs: '3rem', md: '5rem' } }}>
              Performance Nutrition
            </Typography>
            <Typography variant="h6" sx={{ color: 'gray', maxWidth: 600, mx: 'auto', mt: 2, fontSize: '1.1rem' }}>
              Combustible de precisión para atletas de alto rendimiento.
              Recuperación, energía y optimización metabólica.
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              bgcolor: 'rgba(20, 20, 20, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              textColor="inherit"
              indicatorColor="secondary"
              sx={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                '& .MuiTab-root': { py: 3, fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }
              }}
            >
              <Tab label="Módulos & Planes" />
              <Tab label="Biblioteca de Video" />
            </Tabs>

            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                  {nutritionModules.map((module) => (
                    <Grid item xs={12} md={4} key={module.id}>
                      <Card
                        sx={{
                          height: '100%',
                          bgcolor: 'rgba(30, 30, 30, 0.6)',
                          backdropFilter: 'blur(10px)',
                          color: 'white',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 4,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            bgcolor: 'rgba(40, 40, 40, 0.8)',
                            border: '1px solid rgba(0, 229, 255, 0.3)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getAreaIcon(module.id, 40)}
                              <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                                {module.title}
                              </Typography>
                            </Box>
                            {module.badge && (
                              <Chip
                                label={module.badge.label}
                                color={module.badge.color as any}
                                size="small"
                                icon={module.badge.icon}
                                sx={{ fontWeight: 'bold' }}
                              />
                            )}
                          </Box>
                          <Typography color="#bdbdbd" paragraph sx={{ minHeight: 48, fontSize: '0.9rem' }}>
                            {module.description}
                          </Typography>
                          <List sx={{ mb: 2 }}>
                            {module.meals.map((meal, idx) => (
                              <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  {getAreaIcon(module.id, 18)}
                                </ListItemIcon>
                                <ListItemText
                                  primary={meal}
                                  primaryTypographyProps={{ fontSize: '0.85rem', color: '#e0e0e0' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                          <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                              mt: 'auto',
                              textTransform: 'none',
                              borderColor: 'rgba(255,255,255,0.2)',
                              color: 'white',
                              '&:hover': {
                                borderColor: '#00e5ff',
                                color: '#00e5ff',
                                bgcolor: 'rgba(0, 229, 255, 0.05)'
                              }
                            }}
                            onClick={() => navigate(`/nutrition/${module.id}`)}
                          >
                            Acceder al Plan
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 3 }}>
                  Biblioteca de Rendimiento
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#00e5ff' }}>
                  Planes de Alimentación
                </Typography>
                <Grid container spacing={3}>
                  {nutritionVideos.mealPlan.map((video, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <YouTubeVideo {...video} />
                    </Grid>
                  ))}
                </Grid>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, color: '#76ff03' }}>
                  Nutrición Pre-Partido
                </Typography>
                <Grid container spacing={3}>
                  {nutritionVideos.preGame.map((video, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <YouTubeVideo {...video} />
                    </Grid>
                  ))}
                </Grid>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, color: '#00e5ff' }}>
                  Hidratación
                </Typography>
                <Grid container spacing={3}>
                  {nutritionVideos.hydration.map((video, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <YouTubeVideo {...video} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Nutrition; 