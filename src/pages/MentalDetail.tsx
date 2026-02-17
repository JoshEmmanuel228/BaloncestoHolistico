import { Box, Typography, Button, List, ListItem, ListItemText, Card, CardContent, Grid, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { mentalModules } from "../data/mentalData";
import BreathingExercise from "../components/mental/BreathingExercise";
import ShotVisualizer from "../components/mental/ShotVisualizer";
import ConfidenceBuilder from "../components/mental/ConfidenceBuilder";
import InteractiveGuide from "../components/mental/InteractiveGuide";
import { motion } from "framer-motion";

const MentalDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  // @ts-ignore
  const module = moduleId ? mentalModules[moduleId as keyof typeof mentalModules] : null;

  if (!module) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Módulo no encontrado
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/mental")}
        >
          Volver a Preparación Mental
        </Button>
      </Box>
    );
  }

  // Render specific interactive component based on ID
  const renderInteractiveComponent = () => {
    switch (moduleId) {
      case 'meditation':
        return <BreathingExercise />;
      case 'visualization':
        return <ShotVisualizer />;
      case 'confidence':
        return <ConfidenceBuilder />;
      case 'guide':
        return <InteractiveGuide />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/mental")}
        sx={{ mb: 3 }}
      >
        Volver a Preparación Mental
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          {module.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph align="center" sx={{ mb: 6 }}>
          {module.description}
        </Typography>

        {/* Interactive Feature Section */}
        <Box sx={{ mb: 8 }}>
          {renderInteractiveComponent()}
        </Box>

        {/* Existing Content */}
        {('exercises' in module) ? (
          <>
            <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 3 }}>
              Ejercicios Detallados
            </Typography>
            <Grid container spacing={3}>
              {module.exercises.map((exercise: any, index: number) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card elevation={2} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        {exercise.name}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                        Duración: {exercise.duration}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>Pasos:</Typography>
                      <List dense>
                        {exercise.steps.map((step: string, idx: number) => (
                          <ListItem key={`step-${idx}`}>
                            <ListItemText primary={`${idx + 1}. ${step}`} />
                          </ListItem>
                        ))}
                      </List>

                      <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>Beneficios:</Typography>
                      <List dense>
                        {exercise.benefits.map((benefit: string, idx: number) => (
                          <ListItem key={`benefit-${idx}`}>
                            <ListItemText primary={`• ${benefit}`} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>


          </>
        ) : (
          /* Guide/Text content */
          <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
            {module.sections?.map((section: any, sIndex: number) => (
              <Box key={sIndex} sx={{ mt: 5, mb: 5 }}>
                <Typography variant="h4" gutterBottom color="primary" sx={{ borderBottom: '2px solid #eee', pb: 1 }}>
                  {section.title}
                </Typography>
                {section.paragraphs && section.paragraphs.map((p: string, pIdx: number) => (
                  <Typography key={pIdx} color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                    {p}
                  </Typography>
                ))}

                {section.list && (
                  <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                    {section.list.map((item: string, idx: number) => (
                      <ListItem key={idx}>
                        <ListItemText
                          primary={<Typography variant="body1" sx={{ fontWeight: 500 }}>{item}</Typography>}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}

                {section.subTitle && (
                  <Box sx={{ mt: 3, pl: 2, borderLeft: '4px solid #primary.main' }}>
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                      {section.subTitle}
                    </Typography>
                    <List>
                      {section.subList && section.subList.map((item: string, idx: number) => (
                        <ListItem key={idx}><ListItemText primary={item} /></ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {section.table && (
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {section.table.map((row: any, idx: number) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle2" color="secondary" gutterBottom>
                              {row.moment}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{row.action}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            ))}
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default MentalDetail; 