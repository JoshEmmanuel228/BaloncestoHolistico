import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface HoloCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    delay?: number;
    target?: string;
}

const HoloCard: React.FC<HoloCardProps> = ({ title, description, icon, path, delay = 0, target }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (target) {
            window.open(path, target);
        } else {
            navigate(path);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, z: 50 }}
            whileTap={{ scale: 0.95 }}
            style={{ height: '100%', perspective: 1000 }}
            onClick={handleClick}
        >
            <Paper
                elevation={0}
                sx={{
                    background: 'rgba(10, 20, 35, 0.65)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0, 234, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    borderRadius: 4,
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        border: '1px solid rgba(0, 234, 255, 0.6)',
                        boxShadow: '0 0 20px rgba(0, 234, 255, 0.3), inset 0 0 20px rgba(0, 234, 255, 0.1)',
                        background: 'rgba(10, 20, 35, 0.8)',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, rgba(0, 234, 255, 0.8), transparent)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.5s ease',
                    },
                    '&:hover::before': {
                        transform: 'translateX(100%)',
                    }
                }}
            >
                <Box
                    sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: '50%',
                        background: 'rgba(0, 234, 255, 0.05)',
                        border: '1px solid rgba(0, 234, 255, 0.2)',
                        boxShadow: '0 0 15px rgba(0, 234, 255, 0.1)',
                        color: '#00eaff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        '.MuiSvgIcon-root': { fontSize: 40 },
                        '& img': { filter: 'drop-shadow(0 0 5px rgba(0,234,255,0.5))' }
                    }}
                >
                    {icon}
                </Box>

                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontWeight: 700,
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                        mb: 1,
                        textShadow: '0 0 10px rgba(0, 234, 255, 0.5)'
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: '1.05rem',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.5
                    }}
                >
                    {description}
                </Typography>

                {/* Decoder/Corner accents */}
                <Box sx={{ position: 'absolute', bottom: 10, right: 10, width: 10, height: 10, borderBottom: '2px solid rgba(0,234,255,0.5)', borderRight: '2px solid rgba(0,234,255,0.5)' }} />
                <Box sx={{ position: 'absolute', top: 10, left: 10, width: 10, height: 10, borderTop: '2px solid rgba(0,234,255,0.5)', borderLeft: '2px solid rgba(0,234,255,0.5)' }} />
            </Paper>
        </motion.div>
    );
};

export default HoloCard;
