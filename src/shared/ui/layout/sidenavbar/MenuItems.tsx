import type { IMenuItem } from '../../../interfaces/IMenuItem';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export const menuItems: IMenuItem[] = [
  {
    role: "all",
    name: "Statistiche",
    path: "/dashboard",
    icon: <BarChartIcon />    
  },
  {
    role: "all",
    name: "Clienti",
    path: "/customers",
    icon: <PeopleIcon />
  },
  {
    role: "all",
    name: "Consegne",
    path: "/deliveries",
    icon: <LocalShippingIcon />
  }
]