import React from 'react';
import '../styles/sectionModernBackgrounds.css';
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
  Avatar,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Groups as TeamIcon,
  EmojiEvents as LeadershipIcon,
  Psychology as PsychologyIcon,
  TrendingUp as GrowthIcon,
} from '@mui/icons-material';
import YouTubeVideo from '../components/YouTubeVideo';
import TabPanel from '../components/TabPanel';

const teamVideos = {
  leadership: [
    {
      id: "X7Y0AyfXZ8k",
      title: "Liderazgo en el Baloncesto",
      description: "Cómo ser un líder efectivo en la cancha",
    },
    {
      id: "Yt8KjQzQkqk",
      title: "Comunicación en Equipo",
      description: "Mejora la comunicación con tus compañeros",
    },
  ],
  psychology: [
    {
      id: "Zt8Tb8yqX8Y",
      title: "Psicología de Equipo",
      description: "Desarrollo de la cohesión grupal",
    },
  ],
  growth: [
    {
      id: "VBl0HxrQw1Y",
      title: "Crecimiento del Equipo",
      description: "Estrategias para el desarrollo del equipo",
    },
  ],
};

const Team = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const teamModules = [
    {
      id: "leadership",
      title: "Liderazgo",
      description: "Desarrollo de habilidades de liderazgo",
      icon: <LeadershipIcon sx={{ fontSize: 40 }} />,
      content: [
        "Comunicación efectiva",
        "Toma de decisiones",
        "Motivación del equipo",
      ],
    },
    {
      id: "psychology",
      title: "Psicología de Equipo",
      description: "Desarrollo de la cohesión grupal",
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      content: [
        "Confianza entre compañeros",
        "Resolución de conflictos",
        "Trabajo en equipo",
      ],
    },
    {
      id: "growth",
      title: "Crecimiento",
      description: "Estrategias para el desarrollo del equipo",
      icon: <GrowthIcon sx={{ fontSize: 40 }} />,
      content: [
        "Establecimiento de metas",
        "Retroalimentación constructiva",
        "Celebración de logros",
      ],
    },
  ];

  const teamMembers = [
    {
      name: "Juan Pérez",
      role: "Capitán",
      avatar: "JP",
      skills: ["Liderazgo", "Comunicación", "Tiro"],
    },
    {
      name: "María García",
      role: "Base",
      avatar: "MG",
      skills: ["Visión de juego", "Pase", "Defensa"],
    },
    {
      name: "Carlos López",
      role: "Ala-Pívot",
      avatar: "CL",
      skills: ["Rebote", "Defensa", "Poste"],
    },
  ];

  return (
    <>
      <div className="team-bg"></div>
      <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <h1 className="futuristic-title">Equipo</h1>
      <Tabs value={value} onChange={handleChange} aria-label="team tabs">
        <Tab label="Módulos" />
        <Tab label="Miembros" />
        <Tab label="Videos" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {teamModules.map((module) => (
            <Grid item xs={12} md={4} key={module.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {module.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {module.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {module.description}
                  </Typography>
                  <List>
                    {module.content.map((item, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <TeamIcon />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/team/${module.id}`)}
                  >
                    Ver Contenido Completo
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                      {member.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{member.name}</Typography>
                      <Typography color="text.secondary">
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {member.skills.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h5" gutterBottom>
          Videos de Equipo
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Liderazgo
        </Typography>
        {teamVideos.leadership.map((video, index) => (
          <YouTubeVideo key={index} {...video} />
        ))}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Psicología de Equipo
        </Typography>
        {teamVideos.psychology.map((video, index) => (
          <YouTubeVideo key={index} {...video} />
        ))}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Crecimiento
        </Typography>
        {teamVideos.growth.map((video, index) => (
          <YouTubeVideo key={index} {...video} />
        ))}
      </TabPanel>
      </Box>
    </>
  );
};

export default Team; 