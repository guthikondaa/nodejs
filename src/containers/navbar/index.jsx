import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from '../Stepper/Stepper';
import {
  Drawer,
  List,
  CssBaseline,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import logo from "../../assets/images/logo.png";
import logo_small from "../../assets/images/logo_small.png";
import { Link } from "react-router-dom";
import { GoProject } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { GrLogout } from "react-icons/gr";
import { GroupAdd, Build, PersonAdd, Help } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Setting} from "@material-ui/icons";
import { SiOpenaccess } from "react-icons/si";
import {BsFillPersonCheckFill} from "react-icons/bs"

const drawerWidth = 240;

const sidebarTopList = [
  {
    link: "/projects",
    key: "Projects",
    icon: <GoProject size="1.3rem" />,
    index: 0,
  },
  // {
  //   link: "/settings",
  //   key: "Settings",
  //   icon: <FiSettings size="1.3rem" />,
  //   index: 1,
  // },
  {
    link: "/select-tools",
    key: "Select Tools",
    icon: <Build />,
    index: 2,
  },
  {
    link: "/users",
    key: "Users",
    icon: <PersonAdd />,
    index: 3,
  },
  {
    link: "/tools-roles-permission-mapper",
    key: "Roles Permission",
    icon: < BsFillPersonCheckFill size="1.3rem" />,
    index: 5,
  },
];
// const sidebarBottomList = [
//   {
//     link: "/Logout",
//     key: "logout",
//     icon: <GrLogout size="1.3rem" />,
//     index: 0,
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#F26522",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: "#F26522",
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#F26522",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "#F26522",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    backgroundColor: "#F26522",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  image: {
    width: "212px",
  },
  logo_small: {
    width: "40px",
    height: "40px",
  },
  logo: {
    width: "100px",
    height: "60px",
  },
  listTop: {
    overflow: "hidden",

    paddingTop: "20px",
  },
  listBottom: {
    overflow: "hidden",
    // backgroundColor: "rgb(255,255,255)",
    paddingTop: "0px",
    marginTop: "auto",
    marginBottom: "10px",
  },
  logout: {
    marginLeft: "auto",
    // color: "#ffffff",
  },
  link: {
    textDecoration: "none",
    color: "#000000",
  },
  isSelected: {
    borderRight: "2px solid #fff",
    color: "white",
    // borderColor: "#F26522",
    // "&:hover": {
    //   color: "#000000",
    //   backgroundColor: "#F26522",
    // },
  },
  isSelectedListItem: {
    color: "white",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const drawer = (list, style) => (
    <List className={classes[style]}>
      {list.map((item) => (
        <Link to={item.link} className={classes.link} key={item.key}>
          <ListItem
            button
            key={item.key}
            className={
              history.location.pathname === item.link ? classes.isSelected : ""
            }
          >
            <ListItemIcon
              className={
                history.location.pathname === item.link
                  ? classes.isSelectedListItem
                  : ""
              }
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.key} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <div className={classes.toolbar}>
          <IconButton>
            {open ? (
              <img src={logo} alt="Logo" className={classes.image} />
            ) : (
              <img src={logo_small} alt="Logo" className={classes.logo_small} />
            )}
          </IconButton>
        </div>
        {drawer(sidebarTopList, "listTop")}
        {/* {drawer(sidebarBottomList, "listBottom")} */}
      </Drawer>
    </div>
  );
}
