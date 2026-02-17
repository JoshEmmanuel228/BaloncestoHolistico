
import { useState } from 'react';
import { Box, Typography, Paper, Slider, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const ShootingTechnique = () => {
    const [angle, setAngle] = useState<number>(45);
    const [force, setForce] = useState<number>(50);
    const [showArc, setShowArc] = useState(false);

    const [isShooting, setIsShooting] = useState(false);

    // Physics constants
    const g = 9.81;
    // const releaseHeight = 2.0; // Unused
    // const hoopHeight = 3.05; // Unused
    // const distanceToHoop = 4.60; // Unused
    const PIXELS_PER_METER = 55; // Calibrated for visual distance

    // Calculate trajectory points (for both Path and Ball Animation)
    const calculateTrajectory = () => {
        // Calculate dynamic release point based on arm rotation (-angle + 45)
        // Center of rotation (Shoulder): (50, 220)
        // Hand position relative to shoulder (before rotation): (100, 180)
        // Vector (shoulder -> hand): (50, -40)
        const cx = 50, cy = 220;
        const px = 100, py = 180;
        const theta_deg = -angle + 45;
        const theta = theta_deg * (Math.PI / 180);

        // Rotate hand point around shoulder
        const startX = cx + (px - cx) * Math.cos(theta) - (py - cy) * Math.sin(theta);
        const startY = cy + (px - cx) * Math.sin(theta) + (py - cy) * Math.cos(theta);

        // Physics Simulation
        // Force (slider 30-80) maps to Velocity (m/s)
        // Optimal Free Throw velocity is approx 7-8 m/s
        // Adjusted slightly to 0.128 for perfect swish at 60 force / 48 angle
        const v0 = force * 0.128;

        const angleRad = angle * (Math.PI / 180);

        const points = [];
        let t = 0;

        // Predict trajectory points
        while (t <= 1.5) { // Shorter time step for smoother curve
            const x = v0 * Math.cos(angleRad) * t;
            const y = v0 * Math.sin(angleRad) * t - 0.5 * g * t * t;

            // Map to SVG coordinates
            const mapX = startX + x * PIXELS_PER_METER;
            const mapY = startY - y * PIXELS_PER_METER;

            // Interaction with constraints
            if (mapY > 300) break; // Floor

            points.push({ x: mapX, y: mapY });

            // Check approximate hoop collision (very simple distance check)
            // Hoop center approx (330, 100)
            const distToHoop = Math.sqrt(Math.pow(mapX - 330, 2) + Math.pow(mapY - 100, 2));
            if (distToHoop < 15 && y < 0) { // Coming down near hoop
                // Allow pass through if very close
            }

            t += 0.02;
        }
        return { pathD: points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' '), points };
    };

    const handleShoot = () => {
        setShowArc(true);
        setIsShooting(true);
        setTimeout(() => setIsShooting(false), 2000); // Reset animation state
    };

    // Calculate initial ball position for static display
    const getBallPosition = () => {
        const cx = 50, cy = 220;
        const px = 100, py = 180;
        const theta_deg = -angle + 45;
        const theta = theta_deg * (Math.PI / 180);

        const x = cx + (px - cx) * Math.cos(theta) - (py - cy) * Math.sin(theta);
        const y = cy + (px - cx) * Math.sin(theta) + (py - cy) * Math.cos(theta);
        return { x, y };
    };

    const trajectory = calculateTrajectory();

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#fff' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Biomecánica de Tiro (Simulación)
            </Typography>
            <Typography variant="body2" paragraph>
                Optimiza el ángulo de salida y la aplicación de fuerza. El ángulo ideal suele estar entre 45° y 52°.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ height: 350, bgcolor: '#f0f0f0', borderRadius: 4, position: 'relative', overflow: 'hidden', border: '1px solid #ddd' }}>
                        <svg viewBox="0 0 400 350" style={{ width: '100%', height: '100%' }}>

                            {/* Grid Background for Precision Feel */}
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e0e0" strokeWidth="1" />
                            </pattern>
                            <rect width="400" height="350" fill="url(#grid)" />

                            {/* Floor */}
                            <rect x="0" y="290" width="400" height="60" fill="#ddd" />
                            <text x="360" y="340" fill="#aaa" fontSize="10" textAnchor="end">Distance: 4.60m</text>

                            {/* Hoop */}
                            <line x1="330" y1="100" x2="330" y2="250" stroke="#555" strokeWidth="4" />
                            <line x1="330" y1="100" x2="350" y2="100" stroke="orange" strokeWidth="4" /> {/* Rim */}
                            <path d="M 330 100 L 335 120 L 340 100 L 345 120 L 350 100" stroke="white" fill="none" /> {/* Net */}

                            {/* Hoop Target Zone (Ghost Box) */}
                            <rect x="325" y="90" width="30" height="20" fill="rgba(0, 255, 0, 0.1)" stroke="green" strokeDasharray="2,2" />

                            {/* Player Stick Figure (Refined) */}
                            <circle cx="50" cy="200" r="10" fill="#333" /> {/* Head */}
                            <line x1="50" y1="210" x2="50" y2="250" stroke="#333" strokeWidth="4" /> {/* Body */}
                            <line x1="50" y1="250" x2="35" y2="290" stroke="#333" strokeWidth="4" /> {/* Leg L */}
                            <line x1="50" y1="250" x2="65" y2="290" stroke="#333" strokeWidth="4" /> {/* Leg R */}

                            {/* Arms (Dynamic based on angle) */}
                            <g transform={`rotate(${-angle + 45}, 50, 220)`}> {/* Pivot around shoulder */}
                                <line x1="50" y1="220" x2="80" y2="190" stroke="#333" strokeWidth="4" /> {/* Upper Arm */}
                                <line x1="80" y1="190" x2="100" y2="180" stroke="#333" strokeWidth="4" /> {/* Forearm */}

                                {/* Angle Indicator (Biomechanical Data) */}
                                <path d="M 80 190 L 100 190" stroke="blue" strokeWidth="1" strokeDasharray="3,3" />
                                <path d="M 60 190 A 20 20 0 0 1 75 175" stroke="blue" fill="none" />
                                <text x="90" y="210" fontSize="10" fill="blue">{angle}° Release</text>
                            </g>

                            {/* Optimal Arc "Ghost" Guide */}
                            <path d="M 100 180 Q 220 -50 340 100" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                            <text x="220" y="50" fill="rgba(0,0,0,0.3)" fontSize="10">Optimal Arc (48°)</text>

                            {/* Trajectory Guide Line (Dotted) */}
                            {showArc && (
                                <motion.path
                                    d={trajectory.pathD}
                                    stroke={angle > 43 && angle < 54 ? "rgba(0,128,0,0.3)" : "rgba(255,0,0,0.3)"}
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}

                            {/* THE BALL ITSELF (Animated along trajectory) */}
                            {isShooting ? (
                                <motion.circle
                                    r="8"
                                    fill="orange"
                                    initial={{ cx: trajectory.points[0].x, cy: trajectory.points[0].y }}
                                    animate={{
                                        cx: trajectory.points.map(p => p.x),
                                        cy: trajectory.points.map(p => p.y)
                                    }}
                                    transition={{ duration: 1.5, ease: "linear" }}
                                />
                            ) : (
                                <circle cx={getBallPosition().x} cy={getBallPosition().y} r="8" fill="orange" />
                            )}

                            {/* Physics Info Overlay */}
                            <rect x="10" y="10" width="120" height="50" fill="rgba(255,255,255,0.8)" rx="4" />
                            <text x="20" y="30" fontSize="10" fontWeight="bold">Release Velocity: {(force * 0.15).toFixed(1)} m/s</text>
                            <text x="20" y="45" fontSize="10" fontWeight="bold">Entry Angle: {(angle * 0.9).toFixed(1)}°</text>

                        </svg>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>Ángulo de Salida (Optimal: 45°-52°)</Typography>
                        <Slider
                            value={angle}
                            onChange={(_, val) => { setAngle(val as number); setShowArc(false); }}
                            min={30}
                            max={70}
                            valueLabelDisplay="auto"
                            marks={[{ value: 48, label: '48°' }]}
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>Fuerza Aplicada (Newton)</Typography>
                        <Slider
                            value={force}
                            onChange={(_, val) => { setForce(val as number); setShowArc(false); }}
                            min={30}
                            max={80}
                            valueLabelDisplay="auto"
                        />
                    </Box>

                    {/* Probability Meter */}
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="caption" gutterBottom>Probabilidad de Éxito</Typography>
                        <Box sx={{ position: 'relative', height: 10, bgcolor: '#eee', borderRadius: 5, mt: 1, overflow: 'hidden' }}>
                            <Box
                                sx={{
                                    width: `${Math.max(0, 100 - Math.abs(48 - angle) * 5 - Math.abs(60 - force) * 2)}%`,
                                    height: '100%',
                                    bgcolor: angle > 43 && angle < 54 ? 'success.main' : 'warning.main',
                                    transition: 'width 0.3s'
                                }}
                            />
                        </Box>
                        <Typography variant="h4" color={angle > 43 && angle < 54 ? 'success.main' : 'text.secondary'} sx={{ mt: 1 }}>
                            {Math.round(Math.max(0, 100 - Math.abs(48 - angle) * 5 - Math.abs(60 - force) * 2))}%
                        </Typography>
                    </Box>

                    <Box
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShoot}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            p: 2,
                            borderRadius: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
                        }}
                    >
                        <Typography fontWeight="bold">EJECUTAR TIRO</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ShootingTechnique;
