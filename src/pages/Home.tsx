import { Box, Container, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import {
  FitnessCenter as TrainingIcon,
  Psychology as MentalIcon,
  Group as TeamIcon,
} from '@mui/icons-material';
import BananaIcon from '../components/BananaIcon';
import BasketballAnalysis from '../components/BasketballAnalysis';
import BasketballCourt from '../components/BasketballCourt';
import HoloCard from '../components/HoloCard';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const modules = [
    {
      title: 'Entrenamiento',
      description: 'Mejora tus habilidades físicas y técnicas con rutinas personalizadas.',
      icon: <TrainingIcon />,
      path: '/training',
    },
    {
      title: 'Preparación Mental',
      description: 'Desarrolla tu fortaleza mental y mejora tu rendimiento en la cancha.',
      icon: <MentalIcon />,
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
      icon: <TeamIcon />,
      path: '/team',
    },
    {
      title: 'AthenaBall',
      description: 'Análisis avanzado de baloncesto con IA.',
      icon: <Box component="img" src="/basketball.svg" alt="AthenaBall Icon" sx={{ width: 40, height: 40 }} />,
      path: '/athenaball',
      target: '_blank',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', pb: 10, position: 'relative', overflowX: 'hidden', fontFamily: "'Orbitron', sans-serif" }}>
      {/* Fixed Background Layer - Fantastic Court Image */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=2000&q=90")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0
        }}
      />

      {/* Cinematic Gradient Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(10,20,40,0.4) 0%, rgba(5,10,20,0.8) 70%, rgba(0,0,0,0.95) 100%)',
          zIndex: 0
        }}
      />

      {/* Grid Overlay for Tech Feel */}
      <Box
        sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(0, 234, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 234, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Content Wrapper */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>

        {/* Cinematic Hero Section */}
        <Box
          sx={{
            height: { xs: '60vh', md: '75vh' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            position: 'relative'
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: 'center', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Typography variant="overline" sx={{ letterSpacing: 12, color: '#00eaff', fontWeight: 'bold', fontSize: { xs: '0.7rem', md: '1rem' }, textShadow: '0 0 10px rgba(0,234,255,0.7)' }}>
                SYSTEM ONLINE // ACCESS GRANTED
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: { xs: 2, md: 5 },
                  color: '#fff',
                  fontSize: { xs: '2.5rem', md: '5.5rem' },
                  lineHeight: 1,
                  mb: 2,
                  textShadow: '0 0 20px rgba(0,234,255,0.5), 2px 2px 0px rgba(255,0,255,0.5)'
                }}
              >
                BASKETBALL<br />
                <span style={{ color: '#FF8C00', textShadow: '0 0 20px rgba(255, 140, 0, 0.6)' }}>HOLÍSTICO</span>
              </Typography>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <Typography variant="h6" sx={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.8)', maxWidth: 700, mx: 'auto', mt: 3, fontSize: { xs: '1.1rem', md: '1.5rem' }, letterSpacing: 1 }}>
                  PLATAFORMA DE DESARROLLO INTEGRAL
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                  <Typography variant="caption" sx={{ color: '#FFD700' }}>● CUERPO</Typography>
                  <Typography variant="caption" sx={{ color: '#00eaff' }}>● MENTE</Typography>
                  <Typography variant="caption" sx={{ color: '#ff00ff' }}>● EQUIPO</Typography>
                </Box>
              </motion.div>
            </motion.div>
          </Container>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ position: 'absolute', bottom: 40, opacity: 0.7 }}
          >
            <Typography variant="caption" sx={{ color: '#00eaff', letterSpacing: 2 }}>SCROLL TO INITIALIZE</Typography>
          </motion.div>
        </Box>

        {/* Command Center Modules */}
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6 }, mb: 10 }}>
          <Box sx={{ mb: 4, borderLeft: '4px solid #00eaff', pl: 2 }}>
            <Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Orbitron', sans-serif", textTransform: 'uppercase' }}>
              Módulos de Entrenamiento
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(0,234,255,0.7)', fontFamily: "'Rajdhani', sans-serif" }}>
              Selecciona una interfaz neuronal
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {modules.map((module, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={module.title}>
                <HoloCard
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  path={module.path}
                  target={module.target}
                  delay={index * 0.1}
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Tactical Analysis Section */}
        <Box sx={{
          position: 'relative',
          py: 8,
          backgroundImage: 'linear-gradient(rgba(0,10,20,0.85), rgba(0,10,20,0.9)), url("/1x1_una_cancha_de_baloncesto_alucina.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          borderTop: '2px solid #00eaff',
          borderBottom: '2px solid #00eaff',
          boxShadow: '0 0 30px rgba(0, 234, 255, 0.2)'
        }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'center' }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#ff00ff', borderRadius: '50%', mr: 2, boxShadow: '0 0 15px #ff00ff' }} />
              <Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Orbitron', sans-serif", letterSpacing: 3, textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                TACTICAL ANALYSIS VIEW
              </Typography>
              <Box sx={{ width: 12, height: 12, bgcolor: '#ff00ff', borderRadius: '50%', ml: 2, boxShadow: '0 0 15px #ff00ff' }} />
            </Box>
            <BasketballAnalysis />
            <BasketballCourt />
          </Container>
        </Box>

      </Box>
    </Box>
  );
};

export default Home;