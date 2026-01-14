import React from 'react';
import '../styles/trainingBackground.css';

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
import {
  FitnessCenter as StrengthIcon,
  DirectionsRun as CardioIcon,
  SportsBasketball as TechnicalIcon,
  Bolt as PlyometricsIcon,
  Shuffle as AgilityIcon,
  AccessibilityNew as MobilityIcon,
  Psychology as GameIQIcon,
} from '@mui/icons-material';
import { useState } from 'react';
// import YouTubeVideo from "../components/YouTubeVideo"; // Removed unused import to fix build
import LocalVideo from "../components/LocalVideo";
import { useNavigate } from "react-router-dom";
import TabPanel from "../components/TabPanel";
import { trainingModules } from '../data/trainingData';

const trainingVideos = {
  local: [
    {
      src: "/videos/El_Plan_Maestro_del_Atleta_Moderno.mp4",
      title: "El Plan Maestro del Atleta Moderno",
      description: "Guía completa para el desarrollo atlético en el baloncesto moderno.",
    },
  ],
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Strength': return <StrengthIcon sx={{ fontSize: 40 }} />;
    case 'Cardio': return <CardioIcon sx={{ fontSize: 40 }} />;
    case 'Technical': return <TechnicalIcon sx={{ fontSize: 40 }} />;
    case 'Plyometrics': return <PlyometricsIcon sx={{ fontSize: 40 }} />;
    case 'Agility': return <AgilityIcon sx={{ fontSize: 40 }} />;
    case 'Mobility': return <MobilityIcon sx={{ fontSize: 40 }} />;
    case 'GameIQ': return <GameIQIcon sx={{ fontSize: 40 }} />;
    default: return <TechnicalIcon sx={{ fontSize: 40 }} />;
  }
};

const Training = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="training-bg-balones"></div>
      <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Entrenamiento
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="training tabs">
          <Tab label="Módulos" />
          <Tab label="Videos" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {Object.values(trainingModules).map((module) => (
              <Grid item xs={12} md={4} key={module.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {getIcon(module.iconName)}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {module.title}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" paragraph>
                      {module.description}
                    </Typography>
                    <List dense>
                      {module.exercises.slice(0, 3).map((exercise, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <TechnicalIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={exercise.name} />
                        </ListItem>
                      ))}
                      {module.exercises.length > 3 && (
                        <ListItem>
                          <ListItemText secondary={`...y ${module.exercises.length - 3} más`} />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => navigate(`/training/${module.id}`)}
                    >
                      Ver Ejercicios Completos
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="h5" gutterBottom>
            Videos de Entrenamiento
          </Typography>
          {trainingVideos.local.map((video, index) => (
            <LocalVideo key={`local-${index}`} {...video} />
          ))}
        </TabPanel>
      </Box>
    </>
  );
}

export default Training;