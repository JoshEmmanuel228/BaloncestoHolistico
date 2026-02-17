
import { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';

const ConfidenceBuilder = () => {
    const [affirmation, setAffirmation] = useState('');
    const [confidenceBank, setConfidenceBank] = useState<string[]>([
        "Soy un jugador disciplinado",
        "Confío en mi entrenamiento",
    ]);

    const handleAddAffirmation = () => {
        if (affirmation.trim()) {
            setConfidenceBank([...confidenceBank, affirmation]);
            setAffirmation('');
        }
    };

    const handleRemoveAffirmation = (index: number) => {
        const newBank = [...confidenceBank];
        newBank.splice(index, 1);
        setConfidenceBank(newBank);
    };

    const calculateLevel = () => {
        return Math.min(confidenceBank.length * 10, 100);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, height: '100%', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#333' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Banco de Confianza
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
                Añade tus logros y afirmaciones diarias para llenar tu tanque de confianza.
            </Typography>

            {/* Tank Meter */}
            <Box sx={{ position: 'relative', height: 200, width: 60, margin: '0 auto 20px', border: '4px solid #333', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
                <motion.div
                    animate={{ height: `${calculateLevel()}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: '#4CAF50',
                    }}
                />
                {/* Markers */}
                {[25, 50, 75].map(level => (
                    <Box key={level} sx={{ position: 'absolute', bottom: `${level}%`, width: '100%', height: 2, background: 'rgba(0,0,0,0.2)' }} />
                ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Ej: Hoy entrené duro..."
                    value={affirmation}
                    onChange={(e) => setAffirmation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAffirmation()}
                    sx={{ background: 'white', borderRadius: 1 }}
                />
                <Button variant="contained" color="secondary" onClick={handleAddAffirmation}>
                    Añadir
                </Button>
            </Box>

            <List dense sx={{ maxHeight: 200, overflow: 'auto', background: 'rgba(255,255,255,0.8)', borderRadius: 2 }}>
                <AnimatePresence>
                    {confidenceBank.map((item, index) => (
                        <motion.div
                            key={`${item}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveAffirmation(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={item} />
                            </ListItem>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </List>
        </Paper>
    );
};

export default ConfidenceBuilder;
