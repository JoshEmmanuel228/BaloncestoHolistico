import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for the 3D Court
const CourtContainer = styled(Box)(() => ({
    perspective: '1500px', // Increased perspective for better 3D visibility of upright elements
    width: '100%',
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, #050510 0%, #1a1a2e 100%)',
    position: 'relative',
}));

const CourtPlane = styled(Box)(() => ({
    width: '85%',
    maxWidth: '1000px',
    height: '500px',
    position: 'relative',
    transform: 'rotateX(45deg) scale(0.9)',
    transformStyle: 'preserve-3d',
    backgroundColor: '#16213e',
    border: '4px solid #00fff5', // Neon Cyan
    boxShadow: '0 0 50px rgba(0, 255, 245, 0.3)',
    borderRadius: '4px',
    transition: 'transform 0.5s ease',
    '&:hover': {
        transform: 'rotateX(40deg) scale(0.95)', // Subtle zoom/tilt on hover
    }
}));

// Center Circle
const CenterCircle = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '2px solid #00fff5',
    boxShadow: '0 0 15px rgba(0, 255, 245, 0.5)',
}));

const CenterLine = styled(Box)(() => ({
    position: 'absolute',
    top: '0',
    left: '50%',
    height: '100%',
    width: '2px',
    backgroundColor: '#00fff5',
    transform: 'translateX(-50%)',
}));

// Key Area (Paint)
const KeyArea = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    top: '50%',
    [side]: '0',
    transform: 'translateY(-50%)',
    width: '150px',
    height: '190px',
    border: '2px solid #ff00ff', // Neon Magenta
    backgroundColor: 'rgba(255, 0, 255, 0.1)',
}));

// 3 Point Line
const ThreePointArc = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    top: '50%',
    [side]: '-80px', // Adjusted for accurate visual
    transform: `translateY(-50%) ${side === 'left' ? 'rotate(-90deg)' : 'rotate(90deg)'}`,
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    border: '2px solid #00fff5',
    borderBottom: 'none',
    pointerEvents: 'none',
    opacity: 0.7,
}));

// 3D Hoop Structure components
const HoopBase = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    top: '50%',
    [side]: '-20px', // Slightly outside the court
    transform: 'translateY(-50%)',
    width: '10px',
    height: '10px',
    transformStyle: 'preserve-3d',
}));

const Pole = styled(Box)(() => ({
    position: 'absolute',
    bottom: '0',
    left: '50%',
    width: '6px',
    height: '120px', // Height of the pole
    backgroundColor: '#888',
    transform: 'translateX(-50%) rotateX(-90deg)', // Stand up
    transformOrigin: 'bottom',
    boxShadow: '0 0 5px rgba(255,255,255,0.5)',
}));

const Backboard = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    bottom: '120px', // Top of pole
    left: '50%',
    width: '80px',
    height: '55px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid #ff00ff',
    // Rotate to face the court. 
    // Left hoop needs to face Right. Right hoop needs to face Left.
    // Pole is rotated X -90. So we are in that coordinate space? No, independent children.
    // Let's position it relative to the base.
    transform: `translateX(-50%) rotateX(-90deg) rotateY(${side === 'left' ? '90deg' : '-90deg'})`,
    transformOrigin: 'bottom center',
    boxShadow: '0 0 15px #ff00ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    '&::after': { // Inner square
        content: '""',
        width: '30px',
        height: '25px',
        border: '2px solid #ff00ff',
        marginBottom: '5px',
    }
}));



// A container for the rim that handles the height and orientation
const RimContainer = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    bottom: '0', // Base of pole
    left: '50%',
    width: '30px',
    height: '120px', // Up to rim height
    transform: `translateX(-50%) rotateX(-90deg) rotateY(${side === 'left' ? '90deg' : '-90deg'})`,
    transformOrigin: 'bottom',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'flex-start', // Top of this container is 120px up
}));

const ActualRim = styled(Box)(() => ({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '3px solid #ff4400',
    transform: 'rotateX(90deg)', // Lay flat
    boxShadow: '0 0 5px #ff4400',
    position: 'relative',
    zIndex: 2,
}));

const Net = styled(Box)(() => ({
    position: 'absolute',
    top: '0', // Starts at rim
    left: '50%',
    transform: 'translateX(-50%)',
    width: '25px', // Slightly narrower than rim
    height: '25px', // Length of net
    background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 4px)',
    clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)', // Tapered shape
    zIndex: 1,
}));


// Player Marker
const Player = styled(Box)(({ team }: { team: 'A' | 'B' }) => ({
    position: 'absolute',
    width: '16px',
    height: '35px', // Cylinder/Capsule look
    backgroundColor: team === 'A' ? '#00fff5' : '#ff00ff',
    borderRadius: '8px',
    boxShadow: `0 0 15px ${team === 'A' ? '#00fff5' : '#ff00ff'}`,
    transform: 'rotateX(-45deg) translateY(-15px)', // Counter rotate to stand up
    transition: 'all 0.3s ease',
    zIndex: 10,
    '&::after': { // Glow/Shadow on floor
        content: '""',
        position: 'absolute',
        bottom: '-5px',
        left: '2px',
        width: '12px',
        height: '6px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        filter: 'blur(2px)',
    }
}));

// Player positions (2-2-1 Formation)
const players = [
    // Team A (Cyan) - Left Side
    // 2 Guards (Back)
    { id: 'a1', team: 'A', top: '30%', left: '20%' },
    { id: 'a2', team: 'A', top: '70%', left: '20%' },
    // 2 Forwards (Middle)
    { id: 'a3', team: 'A', top: '20%', left: '35%' },
    { id: 'a4', team: 'A', top: '80%', left: '35%' },
    // 1 Center (Front)
    { id: 'a5', team: 'A', top: '50%', left: '42%' },

    // Team B (Magenta) - Right Side (Mirrored 2-2-1)
    // 2 Guards (Back)
    { id: 'b1', team: 'B', top: '30%', left: '80%' },
    { id: 'b2', team: 'B', top: '70%', left: '80%' },
    // 2 Forwards (Middle)
    { id: 'b3', team: 'B', top: '20%', left: '65%' },
    { id: 'b4', team: 'B', top: '80%', left: '65%' },
    // 1 Center (Front)
    { id: 'b5', team: 'B', top: '50%', left: '58%' },
];

const InfoCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    height: '100%',
}));

const BasketballCourt = () => {
    return (
        <Box sx={{ width: '100%', py: 8, bgcolor: '#0a0a1a' }}>
            <Container maxWidth="xl">
                <Typography variant="h3" align="center" gutterBottom sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    textShadow: '0 0 20px rgba(0, 255, 245, 0.5)',
                    mb: 4
                }}>
                    La Arena Digital
                </Typography>

                <Grid container spacing={4}>
                    {/* Court Visualization */}
                    <Grid item xs={12}>
                        <CourtContainer>
                            <CourtPlane>
                                <CenterLine />
                                <CenterCircle />

                                <KeyArea side="left" />
                                <KeyArea side="right" />

                                <ThreePointArc side="left" />
                                <ThreePointArc side="right" />

                                {players.map((p) => (
                                    <Player
                                        key={p.id}
                                        team={p.team as 'A' | 'B'}
                                        style={{ top: p.top, left: p.left }}
                                    />
                                ))}

                                {/* LEFT HOOP (Team B defending) */}
                                <HoopBase side="left">
                                    <Pole />
                                    <Backboard side="left" />
                                    <RimContainer side="left">
                                        <ActualRim />
                                        <Net />
                                    </RimContainer>
                                </HoopBase>

                                {/* RIGHT HOOP (Team A defending) */}
                                <HoopBase side="right">
                                    <Pole />
                                    <Backboard side="right" />
                                    <RimContainer side="right">
                                        <ActualRim />
                                        <Net />
                                    </RimContainer>
                                </HoopBase>

                            </CourtPlane>
                        </CourtContainer>
                    </Grid>

                    {/* Information Section */}
                    <Grid item xs={12} md={6}>
                        <InfoCard elevation={0}>
                            <Typography variant="h5" gutterBottom sx={{ color: '#00fff5' }}>
                                Medidas Oficiales (FIBA)
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1"><strong>Dimensiones:</strong> 28m de largo x 15m de ancho.</Typography>
                                <Typography variant="body1"><strong>Aro:</strong> Altura de 3.05m del suelo.</Typography>
                                <Typography variant="body1"><strong>Línea de 3 puntos:</strong> 6.75m desde el aro (arco).</Typography>
                                <Typography variant="body1"><strong>Tiro Libre:</strong> 4.60m desde el tablero.</Typography>
                                <Typography variant="body1"><strong>Zona Restringida:</strong> Rectángulo de 5.8m x 4.9m.</Typography>
                            </Box>
                        </InfoCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InfoCard elevation={0}>
                            <Typography variant="h5" gutterBottom sx={{ color: '#ff00ff' }}>
                                Estructura del Juego
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1"><strong>Jugadores:</strong> 5 vs 5 en cancha (Formación 2-2-1).</Typography>
                                <Typography variant="body1"><strong>Duración:</strong> 4 cuartos de 10 minutos (FIBA).</Typography>
                                <Typography variant="body1"><strong>Posesión:</strong> 24 segundos para tirar.</Typography>
                                <Typography variant="body1"><strong>Puntuación:</strong> 1 punto (Tiro libre), 2 puntos (Campo), 3 puntos (Triple).</Typography>
                                <Typography variant="body1"><strong>Objetivo:</strong> Introducir el balón en la canasta contraria e impedir que el oponente anote.</Typography>
                            </Box>
                        </InfoCard>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BasketballCourt;
