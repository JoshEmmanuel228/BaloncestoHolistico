import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import '../styles/homeBackground.css';
import '../styles/sectionModernBackgrounds.css';

import {
  FitnessCenter as TrainingIcon,
  Psychology as MentalIcon,
  Group as TeamIcon,
} from '@mui/icons-material';
import BananaIcon from '../components/BananaIcon';
import BasketballAnalysis from '../components/BasketballAnalysis';
import BasketballCourt from '../components/BasketballCourt';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Entrenamiento',
      description: 'Mejora tus habilidades físicas y técnicas con rutinas personalizadas.',
      icon: <TrainingIcon sx={{ fontSize: 40 }} />,
      path: '/training',
    },
    {
      title: 'Preparación Mental',
      description: 'Desarrolla tu fortaleza mental y mejora tu rendimiento en la cancha.',
      icon: <MentalIcon sx={{ fontSize: 40 }} />,
      path: '/mental',
    },
    {
      title: 'Nutrición',
      description: 'Optimiza tu alimentación para un mejor rendimiento deportivo.',
      icon: <BananaIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
      path: '/nutrition',
    },
    {
      title: 'Equipo',
      description: 'Fortalece la dinámica de equipo y el liderazgo.',
      icon: <TeamIcon sx={{ fontSize: 40 }} />,
      path: '/team',
    },
    {
      title: 'AthenaBall',
      description: 'Análisis avanzado de baloncesto con IA.',
      icon: <Box component="img" src="/basketball.svg" alt="AthenaBall Icon" sx={{ width: 40, height: 40 }} />,
      path: 'http://localhost:3001',
      target: '_blank',
    },
  ];

  return (
    <>
      <div className="home-bg-balon"></div>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h2" gutterBottom className="readable-text">
          Bienvenido a Basketball Holístico
        </Typography>

        <Typography variant="h5" color="text.secondary" paragraph className="readable-text">
          Tu plataforma integral para el desarrollo completo como jugador de baloncesto.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {modules.map((module) => (
            <Grid item xs={12} sm={6} md={3} key={module.title}>
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  color: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.2), 0 0 10px rgba(255, 215, 0, 0.1)', // Golden glow
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    background: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {module.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom align="center">
                    {module.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    paragraph
                  >
                    {module.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (module.target) {
                          window.open(module.path, module.target);
                        } else {
                          navigate(module.path);
                        }
                      }}
                      sx={{
                        mt: 1,
                        background: 'linear-gradient(45deg, #FFD700 30%, #FF8C00 90%)',
                        border: 0,
                        borderRadius: '20px',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .1)',
                        color: 'black',
                        fontWeight: 'bold',
                        padding: '10px 30px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF8C00 30%, #FFD700 90%)',
                          boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      Explorar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Nueva sección de texto detallado */}
        <BasketballAnalysis />

        {/* Cancha 3D Futurista */}
        <BasketballCourt />
      </Box >
    </>
  );
};

export default Home; 