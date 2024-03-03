import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaidIcon from "@mui/icons-material/Paid";

const menuTabs = [
  { name: "Dashboard", url: "/", icon: DashboardIcon },
  { name: "Alunos", url: "/alunos", icon: PeopleAltIcon },
  { name: "Financeiro", url: "/financeiro", icon: PaidIcon },
];

export { menuTabs };
