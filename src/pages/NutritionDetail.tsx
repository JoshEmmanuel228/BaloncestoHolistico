
import { Box, Typography, Button, Chip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import OpacityIcon from '@mui/icons-material/Opacity';
import ArticleIcon from '@mui/icons-material/Article';

// Import New Interactive Modules
import DailyMealPlan from '../components/nutrition/DailyMealPlan';
import PreGameFuel from '../components/nutrition/PreGameFuel';
import HydrationStrategy from '../components/nutrition/HydrationStrategy';
import HolisticNutritionReport from '../components/nutrition/HolisticNutritionReport';
import MetabolicRecovery from '../components/nutrition/MetabolicRecovery';
import EliteTravelNutrition from '../components/nutrition/EliteTravelNutrition';


const nutritionModules = {
  mealPlan: {
    title: "Plan de Alimentación Diario",
    description: "Plan nutricional completo y personalizable.",
    component: <DailyMealPlan />,
    videos: [
      { id: "X7Y0AyfXZ8k", title: "Plan de Alimentación", description: "Guía completa" },
      { id: "Yt8KjQzQkqk", title: "Recetas Saludables", description: "Ideas para cocinar" },
    ]
  },
  preGame: {
    title: "Nutrición Pre-Partido",
    description: "Estrategia de carga de combustible minuto a minuto.",
    component: <PreGameFuel />,
    videos: [
      { id: "Zt8Tb8yqX8Y", title: "Qué comer antes de jugar", description: "Optimiza tu energía" }
    ]
  },
  hydration: {
    title: "Estrategia de Hidratación",
    description: "Laboratorio personal de hidratación y reposición.",
    component: <HydrationStrategy />,
    videos: [
      { id: "VBl0HxrQw1Y", title: "Ciencia de la Hidratación", description: "Por qué es vital" }
    ]
  },
  holisticReport: {
    title: "Informe Holístico",
    description: "Visión profunda de la nutrición de alto rendimiento.",
    component: <HolisticNutritionReport />,
    videos: []
  },
  metabolicRecovery: {
    title: "Cura Metabólica & Lesiones",
    description: "Protocolos anti-inflamatorios y nutrición para recuperación de tejidos.",
    component: <MetabolicRecovery />,
    videos: []
  },
  travelNutrition: {
    title: "Nutrición de Viaje & Torneos",
    description: "Estrategias para aeropuertos, hoteles y fast food. Mantén el nivel fuera de casa.",
    component: <EliteTravelNutrition />,
    videos: []
  },
};

const NutritionDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  // Logic to handle both old ID structure (highPerformance) and new if any
  const effectiveModuleId = moduleId === 'highPerformance' ? 'holisticReport' : moduleId;
  const module = effectiveModuleId ? nutritionModules[effectiveModuleId as keyof typeof nutritionModules] : null;

  if (!module) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Módulo no encontrado</Typography>
        <Button variant="contained" onClick={() => navigate("/nutrition")}>Volver</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Button
        variant="text"
        onClick={() => navigate("/nutrition")}
        sx={{ mb: 2 }}
      >
        &larr; Volver a Nutrición
      </Button>
      <Typography variant="h4" gutterBottom>
        {module.title}
      </Typography>
      <Box sx={{ mb: 2 }}>
        {(() => {
          const idKey = moduleId;
          if (idKey === 'mealPlan') return <Chip label="Planes" color="primary" size="small" icon={<LocalDiningIcon sx={{ fontSize: 18 }} />} />;
          if (idKey === 'preGame') return <Chip label="Pre-Partido" color="warning" size="small" icon={<SportsScoreIcon sx={{ fontSize: 18 }} />} />;
          if (idKey === 'hydration') return <Chip label="Hidratación" color="info" size="small" icon={<OpacityIcon sx={{ fontSize: 18 }} />} />;
          return <Chip label="Informe" color="success" size="small" icon={<ArticleIcon sx={{ fontSize: 18 }} />} />;
        })()}
      </Box>
      <Typography color="text.secondary" paragraph>
        {module.description}
      </Typography>

      {/* Render the Interactive Component directly */}
      <Box sx={{ mb: 4, mt: 4 }}>
        {module.component}
      </Box>


    </Box>
  );
};

export default NutritionDetail; 