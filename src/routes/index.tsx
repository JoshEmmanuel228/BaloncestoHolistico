import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Training from "../pages/Training";
import Mental from "../pages/Mental";
import Nutrition from "../pages/Nutrition";
import Team from "../pages/Team";
import TrainingDetail from "../pages/TrainingDetail";
import NutritionDetail from "../pages/NutritionDetail";
import MentalDetail from "../pages/MentalDetail";
import Assistant from '../pages/Assistant';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/training",
            element: <Training />,
          },
          {
            path: "/training/:moduleId",
            element: <TrainingDetail />,
          },
          {
            path: "/mental",
            element: <Mental />,
          },
          {
            path: "/mental/:moduleId",
            element: <MentalDetail />,
          },
          {
            path: "/nutrition",
            element: <Nutrition />,
          },
          {
            path: "/nutrition/:moduleId",
            element: <NutritionDetail />,
          },
          {
            path: "/team",
            element: <Team />,
          },
          {
            path: "/asistente",
            element: <Assistant />,
          },
        ],
      },
    ],
  },
]);

export default router; 