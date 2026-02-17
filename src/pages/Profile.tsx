import React, { useState, ChangeEvent } from 'react';
import { Box, Typography, TextField, Button, Grid, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Save as SaveIcon, Fingerprint as FingerprintIcon } from '@mui/icons-material';
import '../styles/profileBio.css';
import BioScanner from '../components/BioScanner';
import StatHex from '../components/StatHex';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'Josh Emmanuel',
    age: 24,
    height: '1.98m',
    weight: '95kg',
    position: 'Alero (SF)',
    team: 'Shohoku',
    bio: 'Jugador versátil con enfoque en tiro de media distancia y defensa perimetral. Obsesionado con la mejora continua.',
    avatar: '/static/MJ.JPG', // Using local asset as default
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({ ...userData, avatar: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Datos guardados:', userData);
    // Add toast or feedback here in a real app
    alert("DATA UPLOADED TO MAINFRAME");
  };

  return (
    <div className="bio-interface-container">
      {/* Animated DNA Background Layer */}
      <div className="dna-bg-layer"></div>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pt: 12, pb: 8 }}>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '40px', borderBottom: '1px solid rgba(0,234,255,0.3)', paddingBottom: '20px' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FingerprintIcon sx={{ fontSize: 40, color: '#00eaff' }} />
            <div>
              <Typography variant="h4" sx={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                letterSpacing: 3,
                textShadow: '0 0 10px rgba(0,234,255,0.6)'
              }}>
                BIO-METRIC INTERFACE
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(0,234,255,0.6)', letterSpacing: 1 }}>
                PLAYER IDENTIFICATION SYSTEM // V.2.5
              </Typography>
            </div>
          </Box>
        </motion.div>

        <Grid container spacing={6}>
          {/* Left Column: Identity Scanner */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  bgcolor: 'rgba(5, 15, 25, 0.8)',
                  border: '1px solid rgba(0,234,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  textAlign: 'center'
                }}
              >
                <Box sx={{ mb: 4, position: 'relative' }}>
                  <BioScanner src={userData.avatar} alt="Player Avatar" />

                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="avatar-upload">
                    <Button
                      component="span"
                      className="bio-btn"
                      sx={{ mt: 3, fontSize: '0.8rem' }}
                    >
                      Update Scan
                    </Button>
                  </label>
                </Box>

                {/* Quick Stats Hexagons */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mt: 4 }}>
                  <StatHex value="92" label="OVR" color="#FFD700" />
                  <StatHex value="A+" label="POT" color="#00eaff" />
                </Box>

              </Paper>
            </motion.div>
          </Grid>

          {/* Right Column: Data Terminals */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <form noValidate autoComplete="off">
                {/* Terminal 1: Basic Info */}
                <div className="data-terminal" data-label="IDENTITY_DATA">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="CODENAME (Name)"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        variant="outlined"
                        className="bio-input"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        fullWidth
                        label="AGE_CYCLE"
                        name="age"
                        type="number"
                        value={userData.age}
                        onChange={handleChange}
                        variant="outlined"
                        className="bio-input"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        fullWidth
                        label="ROLE_CLASS (Pos)"
                        name="position"
                        value={userData.position}
                        onChange={handleChange}
                        variant="outlined"
                        className="bio-input"
                      />
                    </Grid>
                  </Grid>
                </div>

                {/* Terminal 2: Physical Stats */}
                <div className="data-terminal" data-label="PHYSICAL_METRICS">
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="VERTICAL_SPAN (Height)"
                        name="height"
                        value={userData.height}
                        onChange={handleChange}
                        variant="outlined"
                        className="bio-input"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="MASS_INDEX (Weight)"
                        name="weight"
                        value={userData.weight}
                        onChange={handleChange}
                        variant="outlined"
                        className="bio-input"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="UNIT_AFFILIATION (Team)"
                        name="team"
                        value={userData.team}
                        onChange={handleChange}
                        variant="outlined"
                        className="bio-input"
                      />
                    </Grid>
                  </Grid>
                </div>

                {/* Terminal 3: Analysis */}
                <div className="data-terminal" data-label="PSYCH_PROFILE">
                  <TextField
                    fullWidth
                    label="TACTICAL_ANALYSIS (Bio)"
                    name="bio"
                    value={userData.bio}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    className="bio-input"
                  />
                </div>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    startIcon={<SaveIcon />}
                    className="bio-btn"
                    onClick={handleSave}
                    sx={{ py: 1.5, px: 4 }}
                  >
                    UPLOAD TO MAINFRAME
                  </Button>
                </Box>

              </form>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;