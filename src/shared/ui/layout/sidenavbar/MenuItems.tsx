import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import type { IMenuItem } from '../../../interfaces/IMenuItem';
import BarChartIcon from '@mui/icons-material/BarChart';

export const menuItems: IMenuItem[] = [
  {
    role: "all",
    name: "Dashboard",
    path: "/dashboard",
    icon: <SpaceDashboardIcon />
  },
  {
    role: "manager",
    name: "Statistiche",
    path: "/stats",
    icon: <BarChartIcon />    
  }
]