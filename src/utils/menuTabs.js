import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaidIcon from "@mui/icons-material/Paid";
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import CheckIcon from '@mui/icons-material/Check';

const menuTabs = [
  { name: "Dashboard", url: "/", icon: DashboardIcon },
  { name: "Alunos", url: "/alunos", icon: PeopleAltIcon },
  { name: "Treinos", url: "/treino", icon: SportsKabaddiIcon },
  { name: "Checkin", url: "/checkin", icon: CheckIcon },
  { name: "Financeiro", url: "/financeiro", icon: PaidIcon },

];

export { menuTabs };
