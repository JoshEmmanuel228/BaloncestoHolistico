import { Box, Typography, Button, List, ListItem, ListItemText, Card, CardContent, Grid, Chip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import YouTubeVideo from "../components/YouTubeVideo";
import { trainingModules } from "../data/trainingData";
import { AutoGraph as MetricsIcon } from '@mui/icons-material';

const TrainingDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const module = moduleId ? trainingModules[moduleId] : null;

  if (!module) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Módulo no encontrado
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/training")}
        >
          Volver a Entrenamiento
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/training")}
        sx={{ mb: 3 }}
      >
        Volver a Entrenamiento
      </Button>

      <Typography variant="h4" gutterBottom>
        {module.title}
      </Typography>
      {
        module.fullDescription ? (
          <Typography color="text.secondary" paragraph sx={{ whiteSpace: 'pre-line' }}>
            {module.fullDescription}
          </Typography>
        ) : (
          <Typography color="text.secondary" paragraph>
            {module.description}
          </Typography>
        )
      }

      {/* AI Metrics Section */}
      {
        module.metrics && module.metrics.length > 0 && (
          <Box sx={{ mb: 4, mt: 2, p: 2, bgcolor: 'rgba(0, 255, 255, 0.05)', borderRadius: 2, border: '1px solid rgba(0, 255, 255, 0.2)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MetricsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">
                Métricas de IA Sugeridas
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {module.metrics.map((metric, index) => (
                <Grid item key={index}>
                  <Chip
                    label={metric}
                    variant="outlined"
                    color="primary"
                    sx={{ borderColor: 'rgba(0, 255, 255, 0.5)', color: '#fff' }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      }

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Ejercicios
      </Typography>
      <Grid container spacing={3}>
        {module.exercises.map((exercise, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {exercise.name}
                </Typography>
                <List dense>
                  {exercise.sets && (
                    <ListItem>
                      <ListItemText
                        primary="Series"
                        secondary={exercise.sets}
                      />
                    </ListItem>
                  )}
                  {exercise.reps && (
                    <ListItem>
                      <ListItemText
                        primary="Repeticiones"
                        secondary={exercise.reps}
                      />
                    </ListItem>
                  )}
                  {exercise.rest && (
                    <ListItem>
                      <ListItemText
                        primary="Descanso"
                        secondary={exercise.rest}
                      />
                    </ListItem>
                  )}
                  <ListItem>
                    <ListItemText
                      primary="Descripción"
                      secondary={exercise.description}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {
        module.videos && module.videos.length > 0 && (
          <>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Videos Relacionados
            </Typography>
            {module.videos.map((video, index) => (
              <YouTubeVideo key={index} {...video} />
            ))}
          </>
        )
      }
    </Box >
  );
};

export default TrainingDetail; 