
import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const ShotVisualizer = () => {
    const [selectedZone, setSelectedZone] = useState<string | null>(null);

    // Scaled for SVG: 1 meter = 20 units.
    // Full Court: 28m x 15m -> 560 x 300 units
    // Rim Centers: Left (x=31.5, y=150), Right (x=528.5, y=150)

    const zones = [
        // Left Court
        { id: 'l_paint', label: 'Pintura', x: 80, y: 150, targetX: 31.5, targetY: 150, color: 'rgba(229, 115, 115, 0.6)' },
        { id: 'l_mid_top', label: 'Media', x: 120, y: 100, targetX: 31.5, targetY: 150, color: 'rgba(100, 181, 246, 0.6)' },
        { id: 'l_mid_bot', label: 'Media', x: 120, y: 200, targetX: 31.5, targetY: 150, color: 'rgba(100, 181, 246, 0.6)' },
        { id: 'l_three', label: 'Triple', x: 180, y: 150, targetX: 31.5, targetY: 150, color: 'rgba(129, 199, 132, 0.6)' },
        { id: 'l_corner_top', label: 'Esq.', x: 40, y: 30, targetX: 31.5, targetY: 150, color: 'rgba(255, 183, 77, 0.6)' },
        { id: 'l_freethrow', label: 'Tiro Libre', x: 116, y: 150, targetX: 31.5, targetY: 150, color: 'rgba(171, 71, 188, 0.6)' },

        // Right Court
        { id: 'r_paint', label: 'Pintura', x: 480, y: 150, targetX: 528.5, targetY: 150, color: 'rgba(229, 115, 115, 0.6)' },
        { id: 'r_mid_top', label: 'Media', x: 440, y: 100, targetX: 528.5, targetY: 150, color: 'rgba(100, 181, 246, 0.6)' },
        { id: 'r_mid_bot', label: 'Media', x: 440, y: 200, targetX: 528.5, targetY: 150, color: 'rgba(100, 181, 246, 0.6)' },
        { id: 'r_three', label: 'Triple', x: 380, y: 150, targetX: 528.5, targetY: 150, color: 'rgba(129, 199, 132, 0.6)' },
        { id: 'r_corner_bot', label: 'Esq.', x: 520, y: 270, targetX: 528.5, targetY: 150, color: 'rgba(255, 183, 77, 0.6)' },
        { id: 'r_freethrow', label: 'Tiro Libre', x: 444, y: 150, targetX: 528.5, targetY: 150, color: 'rgba(171, 71, 188, 0.6)' },
    ];

    const getSelectedZoneData = () => zones.find(z => z.id === selectedZone);

    const handleZoneClick = (id: string) => {
        setSelectedZone(id);
        setTimeout(() => setSelectedZone(null), 2000);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', background: '#e0e0e0', color: '#333', overflow: 'hidden' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Cancha Profesional Completa
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: '#555' }}>
                Visualización táctica de campo completo (28m x 15m) con zonas interactivas en ambos aros.
            </Typography>

            <Box sx={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
                <Box sx={{ minWidth: 600, margin: '0 auto', aspectRatio: '28/15' }}>
                    <svg viewBox="0 0 560 300" style={{ width: '100%', height: '100%', background: '#d8a36d', border: '5px solid #fff' }}>
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#fff" />
                            </marker>
                        </defs>
                        {/* --- Floor Markings (White) --- */}

                        {/* Center Line & Circle */}
                        <line x1="280" y1="0" x2="280" y2="300" stroke="white" strokeWidth="2" />
                        <circle cx="280" cy="150" r="36" stroke="white" strokeWidth="2" fill="transparent" />

                        {/* --- Left Half --- */}

                        {/* Key Area (Rect: 5.8m x 4.9m) -> (116 x 98) */}
                        {/* Baseline at x=0. Center y=150. Top y=150-49=101. Bottom y=150+49=199 */}
                        <rect x="0" y="101" width="116" height="98" fill="transparent" stroke="white" strokeWidth="2" />

                        {/* Free Throw Circle (Left) */}
                        <path d="M 116 101 A 49 49 0 0 1 116 199" stroke="white" strokeWidth="2" fill="transparent" />
                        <path d="M 116 101 A 49 49 0 0 0 116 199" stroke="white" strokeWidth="2" fill="transparent" strokeDasharray="5,5" />

                        {/* 3-Point Line (Left) - Radius 6.75m (135 units) from Rim (31.5, 150) */}
                        <path d="M 0 16 L 31.5 16 A 135 135 0 0 1 31.5 284 L 0 284" stroke="white" strokeWidth="2" fill="transparent" />

                        {/* Hoop (Left) */}
                        <line x1="24" y1="132" x2="24" y2="168" stroke="black" strokeWidth="3" /> {/* Backboard */}
                        <circle cx="31.5" cy="150" r="4.5" stroke="#f44336" strokeWidth="2" fill="none" /> {/* Rim */}
                        <line x1="0" y1="150" x2="24" y2="150" stroke="#333" strokeWidth="2" /> {/* Support */}


                        {/* --- Right Half (Mirrored) --- */}

                        {/* Key Area */}
                        <rect x="444" y="101" width="116" height="98" fill="transparent" stroke="white" strokeWidth="2" />

                        {/* Free Throw Circle (Right) */}
                        <path d="M 444 101 A 49 49 0 0 0 444 199" stroke="white" strokeWidth="2" fill="transparent" />
                        <path d="M 444 101 A 49 49 0 0 1 444 199" stroke="white" strokeWidth="2" fill="transparent" strokeDasharray="5,5" />

                        {/* 3-Point Line (Right) - Center (528.5, 150) */}
                        <path d="M 560 16 L 528.5 16 A 135 135 0 0 0 528.5 284 L 560 284" stroke="white" strokeWidth="2" fill="transparent" />

                        {/* Hoop (Right) */}
                        <line x1="536" y1="132" x2="536" y2="168" stroke="black" strokeWidth="3" /> {/* Backboard */}
                        <circle cx="528.5" cy="150" r="4.5" stroke="#f44336" strokeWidth="2" fill="none" /> {/* Rim */}
                        <line x1="560" y1="150" x2="536" y2="150" stroke="#333" strokeWidth="2" /> {/* Support */}


                        {/* --- Dimensions Labels --- */}
                        <text x="280" y="290" fontSize="12" fill="rgba(255,255,255,0.8)" textAnchor="middle">28 m</text>
                        <text x="10" y="150" fontSize="12" fill="rgba(255,255,255,0.8)" style={{ writingMode: 'vertical-rl' }}>15 m</text>

                        <line x1="-10" y1="16" x2="-10" y2="284" stroke="white" markerEnd="url(#arrow)" /> {/* Just decorative logic */}


                        {/* --- Ball Animation --- */}
                        {selectedZone && getSelectedZoneData() && (
                            <motion.circle
                                cx={getSelectedZoneData()!.x}
                                cy={getSelectedZoneData()!.y}
                                r="8"
                                fill="orange"
                                stroke="black"
                                strokeWidth="1"
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{
                                    cx: getSelectedZoneData()!.targetX,
                                    cy: getSelectedZoneData()!.targetY,
                                    r: 4.5, // Shrink to rim size
                                    opacity: [1, 1, 0]
                                }}
                                transition={{ duration: 1.2, ease: "circOut" }}
                            />
                        )}

                        {/* --- Interactive Zones --- */}
                        {zones.map((zone) => (
                            <g key={zone.id} onClick={() => handleZoneClick(zone.id)} style={{ cursor: 'pointer' }}>
                                <circle cx={zone.x} cy={zone.y} r="15" fill="rgba(255,255,255,0.1)" stroke={zone.color} strokeWidth="2" strokeDasharray="3,3" />
                                <circle cx={zone.x} cy={zone.y} r="3" fill={zone.color} />
                                <text x={zone.x} y={zone.y + 25} fontSize="8" textAnchor="middle" fill="#333" fontWeight="bold">{zone.label}</text>
                            </g>
                        ))}

                    </svg>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: 'rgba(229, 115, 115, 0.6)', borderRadius: '50%' }} />
                    <Typography variant="caption">Zona Pintura</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: 'rgba(100, 181, 246, 0.6)', borderRadius: '50%' }} />
                    <Typography variant="caption">Media Distancia</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: 'rgba(129, 199, 132, 0.6)', borderRadius: '50%' }} />
                    <Typography variant="caption">Línea de 3</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: 'rgba(171, 71, 188, 0.6)', borderRadius: '50%' }} />
                    <Typography variant="caption">Tiro Libre</Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default ShotVisualizer;
