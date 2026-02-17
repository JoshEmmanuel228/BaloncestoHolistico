import { useState } from 'react';
import { Box, Typography, Container, Grid, Paper, Chip, Tooltip, Fade } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
import BarChartIcon from '@mui/icons-material/BarChart';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

// --- Animations ---
const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px currentColor; }
  50% { box-shadow: 0 0 25px currentColor, 0 0 40px currentColor; }
`;

const glow = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;



// --- Styled Components ---
const CourtContainer = styled(Box)(() => ({
    perspective: '1200px',
    width: '100%',
    height: '550px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    background: 'radial-gradient(ellipse at center, #1a1a3e 0%, #050510 100%)',
    position: 'relative',
    borderRadius: '16px',
    border: '1px solid rgba(0, 255, 245, 0.15)',
}));

const CourtPlane = styled(Box)(() => ({
    width: '80%',
    maxWidth: '900px',
    height: '460px',
    position: 'relative',
    transform: 'rotateX(48deg) scale(0.85)',
    transformStyle: 'preserve-3d',
    background: 'linear-gradient(135deg, #1a2744 0%, #0d1b2a 100%)',
    border: '3px solid #00fff5',
    boxShadow: '0 0 60px rgba(0, 255, 245, 0.25), inset 0 0 60px rgba(0,0,0,0.5)',
    borderRadius: '6px',
    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    '&:hover': {
        transform: 'rotateX(42deg) scale(0.9)',
    }
}));

const CenterCircle = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    border: '2px solid #00fff5',
    boxShadow: '0 0 20px rgba(0, 255, 245, 0.4)',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#00fff5',
        boxShadow: '0 0 10px #00fff5',
    }
}));

const CenterLine = styled(Box)(() => ({
    position: 'absolute',
    top: 0,
    left: '50%',
    height: '100%',
    width: '2px',
    background: 'linear-gradient(to bottom, rgba(0,255,245,0.1), #00fff5, rgba(0,255,245,0.1))',
    transform: 'translateX(-50%)',
}));

const KeyArea = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    top: '50%',
    [side]: 0,
    transform: 'translateY(-50%)',
    width: '140px',
    height: '170px',
    border: '2px solid rgba(255, 0, 255, 0.8)',
    backgroundColor: 'rgba(255, 0, 255, 0.08)',
    boxShadow: 'inset 0 0 30px rgba(255, 0, 255, 0.1)',
}));

const FreeThrowCircle = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    top: '50%',
    [side]: '115px',
    transform: 'translateY(-50%)',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '2px dashed rgba(255, 0, 255, 0.5)',
}));

// 3-Point Line as SVG for realistic shape
const ThreePointLine = ({ side }: { side: 'left' | 'right' }) => {
    // The line has straight extensions at the corners and a wide arc in between
    const isLeft = side === 'left';
    return (
        <svg
            style={{
                position: 'absolute',
                top: 0,
                [side]: 0,
                width: '220px',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'visible',
                transform: isLeft ? 'none' : 'scaleX(-1)',
            }}
        >
            <path
                d="M 0,30 L 60,30 Q 210,50 210,230 Q 210,410 60,430 L 0,430"
                fill="none"
                stroke="rgba(0, 255, 245, 0.5)"
                strokeWidth="2"
            />
        </svg>
    );
};

const RestrictedArea = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    top: '50%',
    [side]: '10px',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '80px',
    border: '1px solid rgba(255, 150, 0, 0.5)',
    borderRadius: '0 50% 50% 0',
    backgroundColor: 'rgba(255, 150, 0, 0.05)',
}));

const HoopBase = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    top: '50%',
    [side]: '-20px',
    transform: 'translateY(-50%)',
    width: '10px',
    height: '10px',
    transformStyle: 'preserve-3d',
}));

const Pole = styled(Box)(() => ({
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '6px',
    height: '110px',
    background: 'linear-gradient(to top, #555, #999)',
    transform: 'translateX(-50%) rotateX(-90deg)',
    transformOrigin: 'bottom',
    boxShadow: '0 0 8px rgba(255,255,255,0.3)',
}));

const Backboard = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    bottom: '110px',
    left: '50%',
    width: '75px',
    height: '50px',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    border: '2px solid #ff00ff',
    transform: `translateX(-50%) rotateX(-90deg) rotateY(${side === 'left' ? '90deg' : '-90deg'})`,
    transformOrigin: 'bottom center',
    boxShadow: '0 0 20px rgba(255, 0, 255, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    '&::after': {
        content: '""',
        width: '28px',
        height: '22px',
        border: '2px solid #ff00ff',
        marginBottom: '5px',
    }
}));

const RimContainer = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '28px',
    height: '110px',
    transform: `translateX(-50%) rotateX(-90deg) rotateY(${side === 'left' ? '90deg' : '-90deg'})`,
    transformOrigin: 'bottom',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'flex-start',
}));

const ActualRim = styled(Box)(() => ({
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '3px solid #ff4400',
    transform: 'rotateX(90deg)',
    boxShadow: '0 0 10px #ff4400',
    position: 'relative',
    zIndex: 2,
}));

const Net = styled(Box)(() => ({
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '22px',
    height: '22px',
    background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 4px)',
    clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)',
    zIndex: 1,
}));

// --- Player Data ---
interface PlayerData {
    id: string;
    team: 'A' | 'B';
    top: string;
    left: string;
    pos: string;
    role: string;
    stats: string;
}

const players: PlayerData[] = [
    // Equipo Local (Cyan) — Atacando canasta DERECHA (formación según imagen)
    { id: 'a1', team: 'A', top: '50%', left: '58%', pos: 'PG', role: 'Base — Director de Juego', stats: 'AST 8.2 | STL 1.8' },
    { id: 'a2', team: 'A', top: '20%', left: '66%', pos: 'SG', role: 'Escolta — Tirador', stats: '3PT 42% | PTS 18.5' },
    { id: 'a3', team: 'A', top: '88%', left: '72%', pos: 'SF', role: 'Alero — Versátil', stats: 'PTS 16.3 | REB 5.1' },
    { id: 'a4', team: 'A', top: '35%', left: '86%', pos: 'PF', role: 'Ala-Pívot — Poste Alto', stats: 'REB 8.7 | BLK 1.2' },
    { id: 'a5', team: 'A', top: '70%', left: '90%', pos: 'C', role: 'Pívot — Domina la Pintura', stats: 'REB 11.4 | BLK 2.3' },

    // Equipo Visitante (Magenta) — Atacando canasta IZQUIERDA (espejo)
    { id: 'b1', team: 'B', top: '50%', left: '42%', pos: 'PG', role: 'Base — Director', stats: 'AST 7.5 | TO 2.1' },
    { id: 'b2', team: 'B', top: '20%', left: '34%', pos: 'SG', role: 'Escolta — Tirador', stats: '3PT 38% | PTS 15.2' },
    { id: 'b3', team: 'B', top: '88%', left: '28%', pos: 'SF', role: 'Alero — Versátil', stats: 'PTS 14.8 | STL 1.5' },
    { id: 'b4', team: 'B', top: '35%', left: '14%', pos: 'PF', role: 'Ala-Pívot — Poste Alto', stats: 'REB 7.9 | PTS 12.1' },
    { id: 'b5', team: 'B', top: '70%', left: '10%', pos: 'C', role: 'Pívot — Domina la Pintura', stats: 'REB 10.2 | BLK 1.9' },
];

// --- Zone Labels ---
const zoneLabels = [
    { label: 'PINTURA', top: '50%', left: '70px', color: 'rgba(255,0,255,0.4)', size: '9px' },
    { label: 'PINTURA', top: '50%', left: 'calc(100% - 70px)', color: 'rgba(255,0,255,0.4)', size: '9px' },
    { label: 'MEDIA', top: '15%', left: '30%', color: 'rgba(0,255,245,0.25)', size: '8px' },
    { label: 'MEDIA', top: '15%', left: '70%', color: 'rgba(0,255,245,0.25)', size: '8px' },
    { label: 'ZONA 3PT', top: '8%', left: '25%', color: 'rgba(0,255,245,0.2)', size: '8px' },
    { label: 'ZONA 3PT', top: '8%', left: '75%', color: 'rgba(0,255,245,0.2)', size: '8px' },
];

// --- Info Cards Data ---
const infoSections = [
    {
        icon: <SportsBasketballIcon sx={{ color: '#00fff5' }} />,
        title: 'Medidas Oficiales (FIBA)',
        color: '#00fff5',
        items: [
            { label: 'Dimensiones', value: '28m × 15m (91.9ft × 49.2ft)' },
            { label: 'Altura del Aro', value: '3.05m (10ft) del suelo' },
            { label: 'Línea de 3 Puntos', value: '6.75m (NBA: 7.24m)' },
            { label: 'Tiro Libre', value: '4.60m desde el tablero' },
            { label: 'Zona Restringida', value: 'Semicírculo 1.25m del aro' },
            { label: 'Tablero', value: '1.80m × 1.05m, 15cm de grosor' },
        ]
    },
    {
        icon: <TimerIcon sx={{ color: '#ff00ff' }} />,
        title: 'Reglamento de Tiempo',
        color: '#ff00ff',
        items: [
            { label: 'Cuartos', value: '4 × 10min (FIBA) / 4 × 12min (NBA)' },
            { label: 'Posesión', value: '24 segundos para lanzar' },
            { label: 'Medio Campo', value: '8 segundos para cruzar' },
            { label: 'Zona (Pintura)', value: '3 segundos máximo consecutivos' },
            { label: 'Saque Lateral', value: '5 segundos para pasar el balón' },
            { label: 'Prórroga', value: '5 minutos por cada overtime' },
        ]
    },
    {
        icon: <PersonIcon sx={{ color: '#FFD700' }} />,
        title: 'Posiciones & Roles',
        color: '#FFD700',
        items: [
            { label: 'PG (Base)', value: 'Organiza, distribuye, controla ritmo' },
            { label: 'SG (Escolta)', value: 'Anotador principal, tiro exterior' },
            { label: 'SF (Alero)', value: 'Versátil, anotación y defensa' },
            { label: 'PF (Ala-Pívot)', value: 'Rebote, tiro intermedio, poste' },
            { label: 'C (Pívot)', value: 'Domina la pintura, protege el aro' },
        ]
    },
    {
        icon: <BarChartIcon sx={{ color: '#76ff03' }} />,
        title: 'Estadísticas Clave (Analytics)',
        color: '#76ff03',
        items: [
            { label: 'eFG%', value: 'Eficiencia de tiro ponderada (incluye 3PT)' },
            { label: 'PER', value: 'Player Efficiency Rating (media: 15)' },
            { label: 'TS%', value: 'True Shooting % (tiros + libres)' },
            { label: 'ORTG / DRTG', value: 'Puntos producidos/permitidos × 100 pos.' },
            { label: 'Net Rating', value: 'Diferencia ORTG - DRTG (+mejor)' },
            { label: 'Pace', value: 'Posesiones por 48 minutos (ritmo)' },
        ]
    },
];

const InfoCard = styled(Paper)(() => ({
    padding: '20px',
    backgroundColor: 'rgba(10, 10, 30, 0.7)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#fff',
    height: '100%',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    '&:hover': {
        border: '1px solid rgba(0, 255, 245, 0.2)',
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
    }
}));

// --- Main Component ---
const BasketballCourt = () => {
    const [activePlayer, setActivePlayer] = useState<string | null>(null);

    return (
        <Box sx={{ width: '100%', py: 8 }}>
            <Container maxWidth="xl">
                {/* Section Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Chip
                        icon={<GpsFixedIcon />}
                        label="VISUALIZACIÓN INTERACTIVA"
                        sx={{
                            mb: 2,
                            color: '#00fff5',
                            borderColor: 'rgba(0,255,245,0.3)',
                            bgcolor: 'rgba(0,255,245,0.05)',
                            fontWeight: 'bold',
                            letterSpacing: 2,
                            fontSize: '0.7rem'
                        }}
                        variant="outlined"
                    />
                    <Typography variant="h3" sx={{
                        color: '#fff',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        textShadow: '0 0 30px rgba(0, 255, 245, 0.4)',
                        mb: 1
                    }}>
                        La Arena Digital
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, mx: 'auto' }}>
                        Cancha interactiva FIBA con posiciones tácticas, zonas de tiro y datos analíticos.
                        Pasa el cursor sobre los jugadores para ver su perfil.
                    </Typography>
                </Box>

                {/* Court Visualization */}
                <CourtContainer>
                    {/* Court Floor Texture Lines */}
                    <Box sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,255,245,0.02) 0px, transparent 1px, transparent 30px)',
                        pointerEvents: 'none',
                        zIndex: 0
                    }} />

                    <CourtPlane>
                        {/* Inner clipping container for floor markings */}
                        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                            <CenterLine />
                            <CenterCircle />

                            <KeyArea side="left" />
                            <KeyArea side="right" />

                            <FreeThrowCircle side="left" />
                            <FreeThrowCircle side="right" />

                            <RestrictedArea side="left" />
                            <RestrictedArea side="right" />

                            <ThreePointLine side="left" />
                            <ThreePointLine side="right" />
                        </Box>

                        {/* Zone Labels */}
                        {zoneLabels.map((z, i) => (
                            <Typography
                                key={i}
                                sx={{
                                    position: 'absolute',
                                    top: z.top,
                                    left: z.left,
                                    transform: 'translate(-50%, -50%) rotateX(-48deg)',
                                    fontSize: z.size,
                                    color: z.color,
                                    fontWeight: 'bold',
                                    letterSpacing: 2,
                                    textTransform: 'uppercase',
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                }}
                            >
                                {z.label}
                            </Typography>
                        ))}

                        {/* Player Markers */}
                        {players.map((p) => (
                            <Tooltip
                                key={p.id}
                                title={
                                    <Box sx={{ p: 0.5 }}>
                                        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: p.team === 'A' ? '#00fff5' : '#ff00ff' }}>
                                            {p.pos} — {p.role}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#ccc', fontFamily: 'monospace' }}>
                                            {p.stats}
                                        </Typography>
                                    </Box>
                                }
                                arrow
                                TransitionComponent={Fade}
                                placement="top"
                            >
                                <Box
                                    onMouseEnter={() => setActivePlayer(p.id)}
                                    onMouseLeave={() => setActivePlayer(null)}
                                    sx={{
                                        position: 'absolute',
                                        top: p.top,
                                        left: p.left,
                                        width: '18px',
                                        height: '36px',
                                        backgroundColor: p.team === 'A' ? '#00fff5' : '#ff00ff',
                                        borderRadius: '9px',
                                        boxShadow: `0 0 15px ${p.team === 'A' ? '#00fff5' : '#ff00ff'}`,
                                        transform: 'rotateX(-48deg) translateY(-15px)',
                                        transition: 'all 0.3s ease',
                                        zIndex: 10,
                                        cursor: 'pointer',
                                        animation: activePlayer === p.id ? `${pulse} 1.5s infinite` : 'none',
                                        color: p.team === 'A' ? '#00fff5' : '#ff00ff',
                                        '&::before': {
                                            content: `"${p.pos}"`,
                                            position: 'absolute',
                                            top: '-16px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            fontSize: '7px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            textShadow: `0 0 6px ${p.team === 'A' ? '#00fff5' : '#ff00ff'}`,
                                            whiteSpace: 'nowrap',
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-5px',
                                            left: '3px',
                                            width: '12px',
                                            height: '6px',
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            borderRadius: '50%',
                                            filter: 'blur(2px)',
                                        },
                                        '&:hover': {
                                            transform: 'rotateX(-48deg) translateY(-20px) scale(1.2)',
                                        }
                                    }}
                                />
                            </Tooltip>
                        ))}

                        {/* Ball Indicator at Center */}
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) rotateX(-48deg)',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            bgcolor: '#ff8c00',
                            boxShadow: '0 0 15px #ff8c00, 0 0 30px rgba(255, 140, 0, 0.5)',
                            animation: `${glow} 2s ease-in-out infinite`,
                            zIndex: 15,
                        }} />

                        {/* Hoops - Outside clipping container */}
                        <HoopBase side="left">
                            <Pole />
                            <Backboard side="left" />
                            <RimContainer side="left">
                                <ActualRim />
                                <Net />
                            </RimContainer>
                        </HoopBase>

                        <HoopBase side="right">
                            <Pole />
                            <Backboard side="right" />
                            <RimContainer side="right">
                                <ActualRim />
                                <Net />
                            </RimContainer>
                        </HoopBase>
                    </CourtPlane>

                    {/* Legend */}
                    <Box sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 3,
                        alignItems: 'center',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#00fff5', boxShadow: '0 0 8px #00fff5' }} />
                            <Typography variant="caption" sx={{ color: '#00fff5', fontWeight: 'bold', letterSpacing: 1 }}>EQUIPO LOCAL</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff00ff', boxShadow: '0 0 8px #ff00ff' }} />
                            <Typography variant="caption" sx={{ color: '#ff00ff', fontWeight: 'bold', letterSpacing: 1 }}>EQUIPO VISITANTE</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff8c00', boxShadow: '0 0 8px #ff8c00' }} />
                            <Typography variant="caption" sx={{ color: '#ff8c00', fontWeight: 'bold', letterSpacing: 1 }}>BALÓN EN JUEGO</Typography>
                        </Box>
                    </Box>
                </CourtContainer>

                {/* Information Grid */}
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {infoSections.map((section, idx) => (
                        <Grid item xs={12} sm={6} md={3} key={idx}>
                            <InfoCard elevation={0}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                    {section.icon}
                                    <Typography variant="h6" sx={{ color: section.color, fontWeight: 'bold', fontSize: '1rem' }}>
                                        {section.title}
                                    </Typography>
                                </Box>
                                {section.items.map((item, i) => (
                                    <Box key={i} sx={{ mb: 1.5, borderLeft: `2px solid ${section.color}30`, pl: 1.5 }}>
                                        <Typography variant="caption" sx={{ color: section.color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }}>
                                            {item.label}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                                            {item.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </InfoCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default BasketballCourt;
