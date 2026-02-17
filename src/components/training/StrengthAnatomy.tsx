
import { useState } from 'react';
import { Box, Typography, Paper, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const StrengthAnatomy = () => {
    const [selectedGroup, setSelectedGroup] = useState<'chest' | 'legs' | 'back'>('chest');

    const handleGroupChange = (_event: React.MouseEvent<HTMLElement>, newGroup: 'chest' | 'legs' | 'back' | null) => {
        if (newGroup !== null) {
            setSelectedGroup(newGroup);
        }
    };

    const muscleInfo = {
        chest: {
            title: 'Pectorales (Push - Bench Press)',
            description: 'El Press de Banca activa el pectoral mayor y deltoides anterior. Clave para generar fuerza de empuje para pases y crear espacio.',
            tips: ['Codos a 45°', 'Retracción escapular', 'Empuje explosivo']
        },
        legs: {
            title: 'Cuádriceps e Isquios (Squat)',
            description: 'La Sentadilla construye la base de potencia vertical. Fundamental para el salto, la postura defensiva y la velocidad de arranque.',
            tips: ['Espalda neutra', 'Rodillas alineadas', 'Profundidad paralela']
        },
        back: {
            title: 'Dorsales (Pull - Pull Up)',
            description: 'Las Dominadas desarrollan la espalda ancha y fuerza de tracción. Vital para proteger el balón y ganar rebotes disputados.',
            tips: ['Rango completo', 'Controlar la bajada', 'Activar dorsales']
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#f5f5f5' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Simulación Biomecánica de Fuerza
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Typography variant="body2" paragraph>
                        Visualiza la biomecánica correcta de los ejercicios fundamentales para el baloncesto.
                    </Typography>
                    <ToggleButtonGroup
                        orientation="vertical"
                        value={selectedGroup}
                        exclusive
                        onChange={handleGroupChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        <ToggleButton value="chest">Press Banca (Pecho)</ToggleButton>
                        <ToggleButton value="legs">Sentadilla (Pierna)</ToggleButton>
                        <ToggleButton value="back">Dominadas (Espalda)</ToggleButton>
                    </ToggleButtonGroup>

                    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, border: '1px solid #ddd' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {muscleInfo[selectedGroup].title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            {muscleInfo[selectedGroup].description}
                        </Typography>
                        <Typography variant="caption" fontWeight="bold">Tips Técnicos:</Typography>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {muscleInfo[selectedGroup].tips.map((tip, i) => (
                                <li key={i}><Typography variant="caption">{tip}</Typography></li>
                            ))}
                        </ul>
                    </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Box sx={{ height: 400, bgcolor: '#222', borderRadius: 4, position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #444', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}>
                        <AnimatePresence mode="wait">
                            {selectedGroup === 'chest' && <BenchPressAnimation key="bench" />}
                            {selectedGroup === 'legs' && <SquatAnimation key="squat" />}
                            {selectedGroup === 'back' && <PullUpAnimation key="pullup" />}
                        </AnimatePresence>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

// --- SUB-COMPONENTS FOR ANIMATIONS ---

const BenchPressAnimation = () => {
    return (
        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
            <defs>
                <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0e0e0" /><stop offset="100%" stopColor="#bdbdbd" /></linearGradient>
            </defs>

            {/* Background Details */}
            <path d="M 0 250 H 400" stroke="#444" strokeWidth="2" /> {/* Floor */}

            {/* Bench Object */}
            <rect x="100" y="160" width="200" height="10" fill="#333" rx="2" /> {/* Pad */}
            <rect x="120" y="170" width="10" height="80" fill="#222" /> {/* Leg L */}
            <rect x="270" y="170" width="10" height="80" fill="#222" /> {/* Leg R */}

            {/* PERSON (Side View) */}
            {/* Head */}
            <circle cx="130" cy="150" r="12" fill="url(#skin)" />

            {/* Torso (Static on bench) */}
            <ellipse cx="200" cy="155" rx="60" ry="15" fill="#333" />

            {/* Pectoral Highlight (Pulse) */}
            <motion.ellipse
                cx="190" cy="150" rx="15" ry="8"
                fill="rgba(255, 0, 0, 0.5)"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Legs (Feet on floor) */}
            <path d="M 260 155 L 290 200 L 320 250" stroke="url(#skin)" strokeWidth="12" fill="none" strokeLinecap="round" />

            {/* ARM ANIMATION GROUP */}
            <motion.g animate={{ y: [0, -40, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                {/* Shoulder Joint at (180, 150) */}

                {/* Arm segments logic mimicking extension */}
                {/* For simplicity in 2D side view, we animate the arm and bar up/down */}
                {/* To look real, elbow must unlock. Using a simple 2-segment arm linkage is complex for SVG states.
                     We will simulate the visual of pressing by moving the foreman and bar vertically relative to shoulder. */}

                {/* Upper Arm (Humerus) - Rotates */}
                {/* Pivot at Shoulder (180, 155) */}
                {/* When bar is DOWN: Elbow is low. When UP: Elbow is high/straight. */}

                {/* Actually, let's just animate the forearm vertical position for visual clarity? No, the user wants realism. */}
                {/* Let's animate a path using SVG morphing or simple translation if acceptable. */}

                {/* Barbell (Linked to motion group) */}
                <rect x="160" y="100" width="5" height="40" fill="#555" /> {/* Plate */}
                <line x1="162" y1="120" x2="200" y2="120" stroke="#777" strokeWidth="4" /> {/* Bar */}

                {/* Hand */}
                <circle cx="190" cy="120" r="6" fill="url(#skin)" />

                {/* Forearm (Hand to Elbow) */}
                {/* Elbow position needs to move out/down. We'll simplify: simple vertical push */}
                <line x1="190" y1="120" x2="190" y2="150" stroke="url(#skin)" strokeWidth="10" strokeLinecap="round" />
            </motion.g>

            <text x="50" y="50" fill="#fff" fontSize="14" fontWeight="bold">Bench Press</text>
        </svg>
    );
};

const SquatAnimation = () => {
    return (
        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
            <defs>
                <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0e0e0" /><stop offset="100%" stopColor="#bdbdbd" /></linearGradient>
            </defs>
            <path d="M 0 280 H 400" stroke="#444" strokeWidth="2" />

            {/* Whole Body Group moving up/down */}
            <motion.g
                animate={{ y: [0, 80, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Torso */}
                <path d="M 200 100 L 200 180" stroke="#333" strokeWidth="25" strokeLinecap="round" />

                {/* Head */}
                <circle cx="200" cy="80" r="15" fill="url(#skin)" />

                {/* Barbell on Back */}
                <rect x="150" y="90" width="100" height="5" fill="#777" />
                <circle cx="150" cy="92" r="10" fill="#444" />
                <circle cx="250" cy="92" r="10" fill="#444" />

                {/* Thigh (Hip to Knee) */}
                {/* Visual trick: We need legs to BEND. A simple Y translation looks like a elevator.
                    Realism requires joint rotation. */}
            </motion.g>

            {/* REALISTIC SQUAT LEGS (Fixed hips X, varying Y) */}
            {/* We reconstruct the legs outside the simple Y group to do the bending logic */}
            {/* Hip Joint: 200, 180 (moving with body Y) */}
            {/* Foot: 200, 280 (Fixed) -> No, standard squat, feet planted. */}
            {/* Knee: Moves forward. Hip: Moves down and back. */}

            <motion.g
                animate={{
                    // Animated props for points would be ideal, but simple way:
                    // We'll use a path that morphs.
                }}
            >
                {/* Using a frame-based animation for the legs would be better. */}
                {/* Let's try to animate the coordinates using a custom component wrapper is complex. */}
                {/* Alternative: Use `motion.path` with `d` value interpolation. */}
                <SquatLegs />
            </motion.g>

            <text x="50" y="50" fill="#fff" fontSize="14" fontWeight="bold">Back Squat</text>
        </svg>
    );
};

// Helper for complex path morphing
const SquatLegs = () => {
    // Standing: Hip(200,180) -> Knee(200,230) -> Ankle(200,280)
    // Deep Squat: Hip(180, 240) -> Knee(230,240) -> Ankle(200,280)

    return (
        <motion.path
            fill="none"
            stroke="url(#skin)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 200 180 L 200 230 L 200 280" // Initial standing
            animate={{
                d: [
                    "M 200 180 L 200 230 L 200 280", // Standing
                    "M 170 240 L 240 240 L 200 280", // Bottom (Hip back, Knees forward)
                    "M 200 180 L 200 230 L 200 280"  // Return
                ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
    );
};

const PullUpAnimation = () => {
    return (
        <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
            <defs>
                <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0e0e0" /><stop offset="100%" stopColor="#bdbdbd" /></linearGradient>
            </defs>

            {/* Bar */}
            <rect x="100" y="50" width="200" height="5" fill="#aaa" />

            {/* BODY GROUP (Moves Up/Down) */}
            <motion.g
                animate={{ y: [100, 0, 100] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Head */}
                <circle cx="200" cy="100" r="15" fill="url(#skin)" />

                {/* Torso (V-Shape Back) */}
                <path d="M 200 115 L 170 160 L 180 220 L 220 220 L 230 160 Z" fill="#333" />

                {/* Back Muscle Highlight */}
                <motion.path
                    d="M 200 120 L 175 160 L 225 160 Z"
                    fill="rgba(255,0,0,0.5)"
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Legs (Hanging) */}
                <path d="M 185 220 L 190 300" stroke="url(#skin)" strokeWidth="12" strokeLinecap="round" />
                <path d="M 215 220 L 210 300" stroke="url(#skin)" strokeWidth="12" strokeLinecap="round" />

                {/* ARMS (Complex articulated) */}
                {/* We bind the hands to the bar (y=50, x=140/260) locally? No, hands are fixed in world space. */}
                {/* If the body moves, the arms must 'reach'. */}
                {/* Actually, it's easier to keep HANDS fixed and simple draw lines to shoulders. */}
            </motion.g>

            {/* DYNAMIC ARMS (Hands Fixed on Bar, Elbows flexible) */}
            {/* Hands at (140, 50) and (260, 50) */}
            {/* Shoulders at Body Group position. We need to calculate this or use a separate motion component synced.
                SYNCING is hard. 
                TRICK: Put the arms INSIDE the motion group, but animate them to 'counteract' the movement?
                EASIER: Just animate the Path 'd' of the arms to match the timing.
            */}
            <PullUpArms />

            <text x="50" y="380" fill="#fff" fontSize="14" fontWeight="bold">Pull Up (Scapular Retraction)</text>
        </svg>
    );
};

// Synced Arm Animation for Pullup
const PullUpArms = () => {
    // Top of movement (Body high): Shoulder close to hand. Elbow OUT.
    // Bottom of movement (Body low): Shoulder far from hand. Elbow STRAIGHT.

    // Hand L: 140, 50. Hand R: 260, 50.
    // Shoulder L (Bottom): 170, 200 (+100 offset). Shoulder R: 230, 200.
    // Shoulder L (Top): 170, 100.

    // Arm Path: M Hand L Elbow Shoulder

    return (
        <g>
            {/* Left Arm */}
            <motion.path
                stroke="url(#skin)" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"
                animate={{
                    d: [
                        "M 140 50 L 140 140 L 170 215", // Bottom (Straight-ish)
                        "M 140 50 L 110 90 L 170 115",  // Top (Bent elbow out)
                        "M 140 50 L 140 140 L 170 215"  // Return
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Right Arm */}
            <motion.path
                stroke="url(#skin)" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"
                animate={{
                    d: [
                        "M 260 50 L 260 140 L 230 215", // Bottom
                        "M 260 50 L 290 90 L 230 115",  // Top
                        "M 260 50 L 260 140 L 230 215"  // Return
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </g>
    )
}

export default StrengthAnatomy;
