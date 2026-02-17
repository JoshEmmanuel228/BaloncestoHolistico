import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Fade, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import LeadershipArchetypes from '../components/team/LeadershipArchetypes';
import TeamCohesionRadar from '../components/team/TeamCohesionRadar';
import CultureCode from '../components/team/CultureCode';

// Tab Panel Component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`team-tabpanel-${index}`}
      aria-labelledby={`team-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in={true} timeout={500}>
          <Box sx={{ py: 3 }}>
            {children}
          </Box>
        </Fade>
      )}
    </div>
  );
}

const Team = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          backgroundImage: 'url("/digital-locker-bg.png")',
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
            pt: { xs: 6, md: 8 },
            pb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            position: 'relative'
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: 'center', zIndex: 2 }}>
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <Typography variant="overline" sx={{ letterSpacing: 8, color: '#00e5ff', fontWeight: 'bold' }}>
                Team DNA
              </Typography>
              <Typography variant="h1" fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: -2, background: '-webkit-linear-gradient(45deg, #fff, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: { xs: '3rem', md: '5rem' } }}>
                The Locker Room
              </Typography>
              <Typography variant="h6" sx={{ color: 'gray', maxWidth: 600, mx: 'auto', mt: 2, fontSize: '1.1rem' }}>
                La táctica gana partidos. La cultura gana campeonatos.
                Bienvenido al centro de operaciones psicológicas del equipo.
              </Typography>
            </motion.div>
          </Container>

          {/* Professional Locker Room Image Showcase */}
          <Container maxWidth="lg" sx={{ mt: 5, zIndex: 2 }}>
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: { xs: 3, md: 5 },
                  overflow: 'hidden',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 8px 32px rgba(0,229,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover .locker-img': {
                    transform: 'scale(1.03)',
                  },
                  '&:hover .locker-overlay': {
                    opacity: 0.3,
                  },
                }}
              >
                {/* The Image */}
                <Box
                  className="locker-img"
                  component="img"
                  src="/balones.JPG"
                  alt="Professional Basketball Locker Room"
                  sx={{
                    width: '100%',
                    height: { xs: 280, sm: 380, md: 480 },
                    objectFit: 'cover',
                    objectPosition: 'center 40%',
                    display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                />

                {/* Cinematic Gradient Overlay */}
                <Box
                  className="locker-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(18,18,18,0.15) 0%, rgba(18,18,18,0.05) 40%, rgba(18,18,18,0.5) 85%, rgba(18,18,18,0.85) 100%)',
                    transition: 'opacity 0.8s ease',
                    opacity: 1,
                  }}
                />

                {/* Vignette Effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 120px rgba(0,0,0,0.5)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Bottom Caption Bar */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    px: { xs: 2, md: 4 },
                    py: { xs: 1.5, md: 2.5 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#00e5ff',
                        fontWeight: 700,
                        letterSpacing: 3,
                        textTransform: 'uppercase',
                        fontSize: '0.65rem',
                      }}
                    >
                      Instalaciones del Equipo
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#fff',
                        fontWeight: 800,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.9rem', md: '1.1rem' },
                        textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                      }}
                    >
                      #TOGETHER — Championship Culture
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: 3,
                      bgcolor: '#00e5ff',
                      borderRadius: 2,
                      display: { xs: 'none', md: 'block' },
                    }}
                  />
                </Box>
              </Box>
            </motion.div>

            {/* Decorative Divider */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
              <Box sx={{ width: 60, height: 2, bgcolor: 'rgba(0,229,255,0.3)', borderRadius: 1 }} />
            </Box>
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
              <Tab icon={<GroupsIcon />} label="Identidad & Liderazgo" iconPosition="start" />
              <Tab icon={<PsychologyIcon />} label="Psicología de Equipo" iconPosition="start" />
              <Tab icon={<EmojiEventsIcon />} label="Código Cultural" iconPosition="start" />
            </Tabs>

            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <TabPanel value={value} index={0}>
                <LeadershipArchetypes />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <TeamCohesionRadar />
              </TabPanel>

              <TabPanel value={value} index={2}>
                <CultureCode />
              </TabPanel>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Team; 