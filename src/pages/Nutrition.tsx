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
  ];

  return (
    <>
      <div className="nutrition-bg"></div>
      <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <h1 className="futuristic-title">Nutrición</h1>
      <Tabs value={value} onChange={handleChange} aria-label="nutrition tabs">
        <Tab label="Planes" />
        <Tab label="Videos" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {nutritionModules.map((module) => (
            <Grid item xs={12} md={4} key={module.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getAreaIcon(module.id, 40)}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {module.title}
                      </Typography>
                    </Box>
                    {module.badge && (
                      <Chip
                        label={module.badge.label}
                        color={module.badge.color as any}
                        size="small"
                        icon={module.badge.icon}
                      />
                    )}
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {module.description}
                  </Typography>
                  <List>
                    {module.meals.map((meal, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          {getAreaIcon(module.id, 20)}
                        </ListItemIcon>
                        <ListItemText primary={meal} />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/nutrition/${module.id}`)}
                  >
                    Ver Plan Completo
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h5" gutterBottom>
          Videos de Nutrición
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Planes de Alimentación
        </Typography>
        {nutritionVideos.mealPlan.map((video, index) => (
          <YouTubeVideo key={index} {...video} />
        ))}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Nutrición Pre-Partido
        </Typography>
        {nutritionVideos.preGame.map((video, index) => (
          <YouTubeVideo key={index} {...video} />
        ))}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Hidratación
        </Typography>
        {nutritionVideos.hydration.map((video, index) => (
          <YouTubeVideo key={index} {...video} />
        ))}
      </TabPanel>
      </Box>
    </>
  );
};

export default Nutrition; 