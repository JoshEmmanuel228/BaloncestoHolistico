
import { useState } from 'react';
import { Box, Typography, Button, Paper, MobileStepper, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
    title: string;
    description: string;
    content: string[];
}

const InteractiveGuide = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const steps: Section[] = [
        {
            title: "La Noche Anterior",
            description: "Preparación Mental y Física",
            content: [
                "Visualiza tus metas para el partido.",
                "Prepara tu equipo y uniforme para evitar estrés matutino.",
                "Duerme al menos 8 horas para una recuperación óptima.",
            ],
        },
        {
            title: "La Mañana del Partido",
            description: "Nutrición y Activación",
            content: [
                "Desayuna carbohidratos complejos y proteínas.",
                "Hidrátate bien desde que te levantas.",
                "Realiza una sesión breve de estiramientos o yoga.",
            ],
        },
        {
            title: "Llegada al Estadio",
            description: "Enfoque y Rutina",
            content: [
                "Llega con tiempo de sobra.",
                "Escucha tu playlist de motivación.",
                "Visualiza el entorno y la cancha.",
            ],
        },
        {
            title: "Calentamiento",
            description: "Activación Física y Mental",
            content: [
                "Sigue tu rutina de calentamiento físico.",
                "Realiza tiros cerca del aro para ganar confianza.",
                "Practica tu respiración para controlar los nervios.",
            ],
        },
    ];

    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ maxWidth: 800, flexGrow: 1, margin: '0 auto' }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 100,
                    pl: 2,
                    bgcolor: 'background.default',
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}
            >
                <Box>
                    <Typography variant="h6">{steps[activeStep].title}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">{steps[activeStep].description}</Typography>
                </Box>
            </Paper>

            <Box sx={{ height: 300, maxWidth: 800, width: '100%', p: 2, overflow: 'hidden' }}>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        style={{ height: '100%' }}
                    >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2 }}>
                            <CardContent>
                                {steps[activeStep].content.map((item, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{
                                            minWidth: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2,
                                            fontSize: 12
                                        }}>
                                            {index + 1}
                                        </Box>
                                        <Typography variant="body1">{item}</Typography>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </Box>

            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Siguiente
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Anterior
                    </Button>
                }
            />
        </Box>
    );
}

export default InteractiveGuide;
