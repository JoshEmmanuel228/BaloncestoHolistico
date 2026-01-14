import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { useState } from 'react';
import '../styles/sectionBackgrounds.css';


const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    position: '',
    skillLevel: '',
    height: '',
    weight: '',
    experience: '',
  });

  const handleChange = (field: string) => (event: any) => {
    setProfileData({
      ...profileData,
      [field]: event.target.value,
    });
  };

  return (
    <>
      {/* Fondo MJ.JPG para la sección de perfil */}
      <div className="profile-bg-mj"></div>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Perfil del Jugador
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                  }}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCameraIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Cambiar foto de perfil
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información Personal
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={profileData.name}
                    onChange={handleChange('name')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Edad"
                    type="number"
                    value={profileData.age}
                    onChange={handleChange('age')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Posición</InputLabel>
                    <Select
                      value={profileData.position}
                      label="Posición"
                      onChange={handleChange('position')}
                    >
                      <MenuItem value="base">Base</MenuItem>
                      <MenuItem value="escolta">Escolta</MenuItem>
                      <MenuItem value="alero">Alero</MenuItem>
                      <MenuItem value="ala-pivot">Ala-Pívot</MenuItem>
                      <MenuItem value="pivot">Pívot</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Nivel de Habilidad</InputLabel>
                    <Select
                      value={profileData.skillLevel}
                      label="Nivel de Habilidad"
                      onChange={handleChange('skillLevel')}
                    >
                      <MenuItem value="principiante">Principiante</MenuItem>
                      <MenuItem value="intermedio">Intermedio</MenuItem>
                      <MenuItem value="avanzado">Avanzado</MenuItem>
                      <MenuItem value="elite">Élite</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Altura (cm)"
                    type="number"
                    value={profileData.height}
                    onChange={handleChange('height')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Peso (kg)"
                    type="number"
                    value={profileData.weight}
                    onChange={handleChange('weight')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Años de Experiencia"
                    type="number"
                    value={profileData.experience}
                    onChange={handleChange('experience')}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary">
                  Guardar Cambios
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Box>
    </>
  );
};

export default Profile; 