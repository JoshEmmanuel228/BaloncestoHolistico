import React, { useState, ChangeEvent, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Container, Paper, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Save as SaveIcon, 
  Fingerprint as FingerprintIcon, 
  Logout as LogoutIcon,
  Refresh as SwitchIcon
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser, logout } from '../store/slices/userSlice';
import '../styles/profileBio.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
import BioScanner from '../components/BioScanner';
import StatHex from '../components/StatHex';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [authData, setAuthData] = useState({ 
    name: '', email: '', password: '', 
    age: '', height: '', weight: '', 
    position: '', team: '', phone: '', bio: '' 
  });
  const [error, setError] = useState('');
  
  const [userData, setUserData] = useState({
    name: '',
    age: 0,
    height: '',
    weight: '',
    position: '',
    team: '',
    email: '',
    phone: '',
    bio: '',
    avatar: '/MJ.JPG',
  });

  // Load profile data when authenticated user changes
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/get_profile?email=${user.email}`);
          if (response.ok) {
            const data = await response.json();
            if (data && Object.keys(data).length > 0) {
              setUserData(prev => ({ ...prev, ...data }));
            } else {
              // Initialize with user info from login if no profile exists yet
              setUserData(prev => ({ 
                ...prev, 
                name: user.name || '', 
                email: user.email 
              }));
            }
          }
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      };
      fetchProfile();
    } else {
      // Clear data when logged out
      setUserData({
        name: '', age: 0, height: '', weight: '', position: '', team: '',
        email: '', phone: '', bio: '', avatar: '/MJ.JPG',
      });
    }
  }, [isAuthenticated, user]);

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegistering ? 'register' : 'login';
    try {
      const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setUser(data.user));
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection error with mainframe');
    }
  };

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

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/save_profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert("DATOS BIO-METRICOS SINCRONIZADOS CON EL MAINFRAME");
      }
    } catch (error) {
      alert("ERROR DE CONEXIÓN: DATOS NO GUARDADOS");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    const authInputStyle = { 
      mb: 2, 
      '& .MuiOutlinedInput-root': { 
        '& fieldset': { borderColor: '#00eaff' }, 
        '&:hover fieldset': { borderColor: '#00f2fe' }, 
        '&.Mui-focused fieldset': { borderColor: '#00f2fe' } 
      }, 
      '& .MuiInputLabel-root': { color: '#00eaff' }, 
      '& .MuiInputBase-input': { color: '#fff' } 
    };

    return (
      <div className="bio-interface-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="dna-bg-layer"></div>
        <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Paper sx={{ 
              p: 4, 
              bgcolor: 'rgba(5, 15, 25, 0.9)', 
              border: '1px solid #00eaff', 
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 30px rgba(0,234,255,0.2)'
            }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <FingerprintIcon sx={{ fontSize: 60, color: '#00eaff', mb: 2 }} />
                <Typography variant="h5" sx={{ fontFamily: "'Orbitron', sans-serif", color: '#00eaff', mb: 1 }}>
                  {isRegistering ? 'NEW_REGISTRATION' : 'SECURE_ACCESS'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(0,234,255,0.6)' }}>
                  AUTHENTICATION REQUIRED // SYSTEM V.2.5
                </Typography>
              </Box>

              <Typography variant="h5" sx={{ color: '#00f2fe', mb: 3, fontWeight: 'bold', textShadow: '0 0 10px rgba(0,242,254,0.5)' }}>
                {isRegistering ? 'INITIALIZE_NEW_OPERATOR' : 'SECURE_ACCESS_REQUIRED'}
              </Typography>
              
              {error && <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#ff5252' }}>{error}</Alert>}

              <Box component="form" onSubmit={handleAuthSubmit} sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                  {isRegistering && (
                    <Grid item xs={12}>
                      <TextField fullWidth label="FULL_NAME" name="name" value={authData.name} onChange={handleAuthChange} required sx={authInputStyle} />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={isRegistering ? 6 : 12}>
                    <TextField fullWidth label="CYBER_EMAIL" name="email" type="email" value={authData.email} onChange={handleAuthChange} required sx={authInputStyle} />
                  </Grid>
                  <Grid item xs={12} sm={isRegistering ? 6 : 12}>
                    <TextField fullWidth label="SECURITY_KEY" name="password" type="password" value={authData.password} onChange={handleAuthChange} required sx={authInputStyle} />
                  </Grid>
                  
                  {isRegistering && (
                    <>
                      <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="AGE" name="age" type="number" value={authData.age} onChange={handleAuthChange} sx={authInputStyle} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="HEIGHT" name="height" value={authData.height} onChange={handleAuthChange} sx={authInputStyle} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="WEIGHT" name="weight" value={authData.weight} onChange={handleAuthChange} sx={authInputStyle} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="POSITION" name="position" value={authData.position} onChange={handleAuthChange} sx={authInputStyle} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="TEAM" name="team" value={authData.team} onChange={handleAuthChange} sx={authInputStyle} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="COMMS_LINK (PHONE)" name="phone" value={authData.phone} onChange={handleAuthChange} sx={authInputStyle} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="BIOGRAPHICAL_DATA" name="bio" multiline rows={2} value={authData.bio} onChange={handleAuthChange} sx={authInputStyle} />
                      </Grid>
                    </>
                  )}
                </Grid>

                <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, py: 1.5, background: 'linear-gradient(45deg, #00f2fe, #4facfe)', color: '#000', fontWeight: 'bold', '&:hover': { background: 'linear-gradient(45deg, #4facfe, #00f2fe)' } }}>
                  {isRegistering ? 'INITIALIZE_ACCOUNT' : 'AUTHORIZE_ACCESS'}
                </Button>
              </Box>
                <Button 
                  fullWidth sx={{ color: 'rgba(0,234,255,0.6)', textTransform: 'none' }}
                  onClick={() => setIsRegistering(!isRegistering)}
                >
                  {isRegistering ? 'Already registered? Login here' : 'New operator? Register here'}
                </Button>
            </Paper>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bio-interface-container">
      <div className="dna-bg-layer"></div>

      <Box sx={{
        width: '100%',
        borderBottom: '1px solid rgba(0,234,255,0.2)',
        bgcolor: 'rgba(5, 15, 25, 0.4)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        zIndex: 10,
        pt: 12,
        pb: 4
      }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  AUTHENTICATED_OPERATOR: {user?.email}
                </Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                startIcon={<SwitchIcon />} 
                onClick={handleLogout}
                sx={{ color: 'rgba(0,234,255,0.6)', borderColor: 'rgba(0,234,255,0.2)' }}
                variant="outlined"
              >
                CAMBIAR PERFIL
              </Button>
              <Button 
                startIcon={<LogoutIcon />} 
                onClick={handleLogout}
                className="bio-btn"
                variant="outlined"
              >
                CERRAR SESIÓN
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pt: 4, pb: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
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
                  <Button component="span" className="bio-btn" sx={{ mt: 3, fontSize: '0.8rem' }}>
                    UPDATE SCAN
                  </Button>
                </label>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mt: 4 }}>
                <StatHex value="--" label="OVR" color="#FFD700" />
                <StatHex value="--" label="POT" color="#00eaff" />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <div className="data-terminal" data-label="IDENTITY_DATA">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CODENAME" name="name" value={userData.name} onChange={handleChange} variant="outlined" className="bio-input" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField fullWidth label="AGE_CYCLE" name="age" type="number" value={userData.age} onChange={handleChange} variant="outlined" className="bio-input" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField fullWidth label="ROLE_CLASS" name="position" value={userData.position} onChange={handleChange} variant="outlined" className="bio-input" />
                </Grid>
              </Grid>
            </div>

            <div className="data-terminal" data-label="PHYSICAL_METRICS & COMMS">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField fullWidth label="VERTICAL_SPAN" name="height" value={userData.height} onChange={handleChange} variant="outlined" className="bio-input" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="MASS_INDEX" name="weight" value={userData.weight} onChange={handleChange} variant="outlined" className="bio-input" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="CONTACT_LINK" name="email" value={userData.email} onChange={handleChange} variant="outlined" className="bio-input" disabled />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="COMMS_ID" name="phone" value={userData.phone} onChange={handleChange} variant="outlined" className="bio-input" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="UNIT_AFFILIATION" name="team" value={userData.team} onChange={handleChange} variant="outlined" className="bio-input" />
                </Grid>
              </Grid>
            </div>

            <div className="data-terminal" data-label="PSYCH_PROFILE">
              <TextField fullWidth label="TACTICAL_ANALYSIS" name="bio" value={userData.bio} onChange={handleChange} multiline rows={4} variant="outlined" className="bio-input" />
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button startIcon={<SaveIcon />} className="bio-btn" onClick={handleSave} sx={{ py: 1.5, px: 4 }}>
                UPLOAD TO MAINFRAME
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;