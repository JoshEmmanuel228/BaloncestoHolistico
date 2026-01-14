import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider,
  Tooltip,
  Avatar,
  Typography,
} from '@mui/material';
import '../styles/topbarGlass.css';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  FitnessCenter as TrainingIcon,
  Psychology as MentalIcon,
  Group as TeamIcon,
} from '@mui/icons-material';
import { useState, useRef } from 'react';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import sidebarBackground from '../assets/IMG_0227.JPG';

const drawerWidth = 240;

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/' },
  { text: 'Perfil', icon: <PersonIcon />, path: '/profile' },
  { text: 'Entrenamiento', icon: <TrainingIcon />, path: '/training' },
  { text: 'Preparación Mental', icon: <MentalIcon />, path: '/mental' },
  {
    text: 'Nutrición',
    icon: (
      <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', fontSize: 22 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M16.5 3.5c-.7.2-1.6.6-2 1.2-.6.8-.8 1.9-.6 2.9.2.8.9 1.5 1.8 1.7.9.2 1.9-.1 2.6-.7.6-.5 1-1.2 1.1-2 .1-.9-.3-1.8-1-2.5-.5-.5-1.1-.8-1.9-.6z" fill="currentColor" />
          <path d="M12 2c-1.1 0-2 .9-2 2 0 .6.3 1.1.7 1.5C8.9 6 7.6 7 7 8.4 5.9 10.7 7 13.6 9.3 14.7c1.5.7 3.2.5 4.5-.5 1.6-1.3 2.2-3.5 1.5-5.4-.5-1.4-1.9-2.4-3.3-2.6C12.6 7.8 12 7.2 12 6.5V4c0-1.1-.9-2-2-2z" fill="currentColor" />
          <path d="M6 18c0 2.2 1.8 4 4 4s4-1.8 4-4-4-6-4-6-4 3.8-4 6z" fill="currentColor" opacity="0.9" />
          <path d="M19 12.5c0 1.7-1 3.2-2.5 3.9-.6.3-1.3-.2-1.2-.9.2-1.2.8-2.4 1.6-3.3.8-.9 2.1-1.5 2.1-.6z" fill="currentColor" />
        </svg>
      </Box>
    ),
    path: '/nutrition',
  },
  { text: 'Equipo', icon: <TeamIcon />, path: '/team' },
  { text: 'Asistente', icon: <span style={{ fontWeight: 'bold', color: '#00eaff', fontSize: 22 }}>🤖</span>, path: '/asistente' },
  { text: 'AthenaBall', icon: <img src="/basketball.svg" alt="AthenaBall Icon" style={{ width: 24, height: 24 }} />, path: '/athenaball', target: '_blank' },
];

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const sidebarHideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div style={{ height: 56 }} />
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Tooltip title={collapsed ? 'Expandir' : 'Colapsar'}>
          <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              if (item.target) {
                window.open(item.path, item.target);
              } else {
                navigate(item.path);
                if (isMobile) {
                  setMobileOpen(false);
                }
              }
            }}
            selected={!item.target && location.pathname === item.path}
            sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              margin: '10px',
              padding: '10px',
            }}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: 'white',
                textShadow: '1px 1px 2px black',
                display: collapsed ? 'none' : 'block',
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Botón de bienvenida */}
      <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 1301 }}>
        <Avatar className="user-avatar" onClick={() => setWelcomeOpen(true)} src="/basketball.svg" />
      </div>

      {/* Modal de bienvenida */}
      {welcomeOpen && (
        <div className="welcome-modal-backdrop" onClick={() => setWelcomeOpen(false)}>
          <div className="welcome-modal" onClick={e => e.stopPropagation()}>
            <div className="welcome-modal-bg"></div>
            <div className="welcome-modal-content">
              <button className="close-btn" onClick={() => setWelcomeOpen(false)}>&times;</button>
              <h2>¡Bienvenido a tu cancha digital!<br />El Punto de Encuentro de la Élite del Baloncesto.</h2>
              <p>
                Es un honor darles la más cordial bienvenida a <b>Basketbal Holistico</b>, el nuevo hub digital diseñado exclusivamente para la comunidad del baloncesto profesional.<br /><br />
                Este espacio ha sido creado pensando en ustedes: jugadores, entrenadores, agentes, scouts, analistas y directivos que definen el presente y el futuro de este deporte.<br /><br />
                Nuestra misión es simple: proveer una plataforma segura, avanzada y eficiente donde puedan conectar, colaborar, analizar tendencias y descubrir nuevas oportunidades. Aquí, la profesionalidad se encuentra con la pasión por el juego.<br /><br />
                Les invitamos a explorar las herramientas, completar su perfil profesional y comenzar a interactuar con colegas de la industria.<br /><br />
                <b>Bienvenidos al siguiente nivel.</b><br /><br />
                <i>Atentamente,<br />El equipo de Joshua Meza.</i>
              </p>
              <button className="profile-btn" onClick={() => { setWelcomeOpen(false); navigate('/profile'); }}>
                Ir a mi perfil
              </button>
              <div style={{ marginTop: '1.5em', display: 'flex', flexDirection: 'column', gap: '0.7em' }}>
                <button className="profile-btn" onClick={() => { setWelcomeOpen(false); navigate('/training'); }}>
                  Ir a Entrenamiento
                </button>
                <button className="profile-btn" onClick={() => { setWelcomeOpen(false); navigate('/nutrition'); }}>
                  Ir a Nutrición
                </button>
                <button className="profile-btn" onClick={() => { setWelcomeOpen(false); navigate('/team'); }}>
                  Ir a Equipo
                </button>
                <button className="profile-btn" onClick={() => { setWelcomeOpen(false); navigate('/mental'); }}>
                  Ir a Preparación Mental
                </button>
                <button className="profile-btn" onClick={() => { setWelcomeOpen(false); navigate('/asistente'); }}>
                  Ir a Asistente deportivo
                </button>
                <button className="profile-btn" onClick={() => { setWelcomeOpen(false); window.open('http://localhost:5000', '_blank'); }}>
                  Ir a AthenaBall
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Área invisible para hover del sidebar */}
      <div
        className="sidebar-hover-area"
        style={{ width: 60 }}
        onMouseEnter={() => {
          if (sidebarHideTimeout.current) clearTimeout(sidebarHideTimeout.current);
          setSidebarOpen(true);
        }}
        onMouseLeave={() => {
          sidebarHideTimeout.current = setTimeout(() => setSidebarOpen(false), 400);
        }}
      />
      <Box
        component="nav"
        sx={{ width: sidebarOpen ? drawerWidth : 0, flexShrink: { sm: 0 } }}
        onMouseEnter={() => {
          if (sidebarHideTimeout.current) clearTimeout(sidebarHideTimeout.current);
          setSidebarOpen(true);
        }}
        onMouseLeave={() => {
          sidebarHideTimeout.current = setTimeout(() => setSidebarOpen(false), 400);
        }}
      >
        {!isMobile && (
          <Drawer
            variant="permanent"
            open={sidebarOpen}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: sidebarOpen ? drawerWidth : 0,
                transition: 'width 200ms',
                backgroundImage: `url(${sidebarBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                overflowX: 'hidden',
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: sidebarOpen ? drawerWidth : 0,
                transition: 'width 200ms',
                backgroundImage: `url(${sidebarBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                overflowX: 'hidden',
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: '56px',
        }}
      >
        <Outlet />
        <Box sx={{ mt: 4, textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
          <Typography variant="caption">
            Todos los derechos reservados Joshua Emmanuel Meza Rodriguez Mexaion 2025
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 