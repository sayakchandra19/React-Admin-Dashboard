import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../themes";
import { useData } from "../../../context/DataContext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Item = ({ title, to, icon, selected, setSelected, isMobile, setIsSidebarToggled }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        if (isMobile && setIsSidebarToggled) {
          setIsSidebarToggled(false);
        }
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const pathToTitle = {
  "/": "Dashboard",
  "/team": "Manage Team",
  "/contacts": "Contacts Information",
  "/invoices": "Invoices Balances",
  "/form": "Profile Form",
  "/calendar": "Calendar",
  "/faq": "FAQ Page",
  "/bar": "Bar Chart",
  "/pie": "Pie Chart",
  "/line": "Line Chart",
  "/geography": "Geography Chart",
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isSidebarToggled, setIsSidebarToggled } = useData();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [selected, setSelected] = useState(
    pathToTitle[location.pathname] || "Dashboard",
  );

  useEffect(() => {
    if (pathToTitle[location.pathname]) {
      setSelected(pathToTitle[location.pathname]);
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar
        collapsed={!isMobile && isCollapsed}
        toggled={isSidebarToggled}
        breakPoint="md"
        onToggle={(value) => setIsSidebarToggled(value)}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU / CLOSE ICON */}
          <MenuItem
            onClick={() => {
              if (isMobile) {
                setIsSidebarToggled(false);
              } else {
                setIsCollapsed(!isCollapsed);
              }
            }}
            icon={!isMobile && isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {(isMobile || !isCollapsed) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingRight: "10px",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    margin: 0,
                    padding: 0,
                    whiteSpace: "nowrap",
                    color: colors.grey[100],
                    fontWeight: 700,
                    fontSize: "20px",
                  }}
                >
                  ADMINIS
                </Typography>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isMobile) {
                      setIsSidebarToggled(false);
                    } else {
                      setIsCollapsed(!isCollapsed);
                    }
                  }}
                  sx={{
                    margin: 0,
                    padding: "6px",
                    color: colors.grey[100],
                  }}
                  title={isMobile ? "Close Sidebar" : "Collapse Sidebar"}
                >
                  {isMobile ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Profile Details (hidden when collapsed on desktop) */}
          {(isMobile || !isCollapsed) && (
            <Box
              mb="25px"
              sx={{
                px: { xs: "20px", sm: "40px", md: "50px" },
              }}
            >
              {/* Profile Image */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  mb: "12px",
                  mt: "15px",
                }}
              >
                <img
                  alt="profile-user"
                  width="80px"
                  height="80px"
                  src="/assets/user.png"
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${colors.greenAccent[500]}`,
                  }}
                />
              </Box>

              {/* Profile Details */}
              <Box textAlign="center" sx={{ mb: "15px" }}>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: "28px",
                    color: colors.grey[100],
                    margin: 0,
                  }}
                >
                  Sayak
                </Typography>

                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    lineHeight: "18px",
                    color: colors.greenAccent[500],
                    marginTop: "2px",
                  }}
                >
                  VIP TRADER
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={!isMobile && isCollapsed ? undefined : "6%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px", fontSize: "12px", letterSpacing: "1px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px", fontSize: "12px", letterSpacing: "1px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px", fontSize: "12px", letterSpacing: "1px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isMobile={isMobile}
              setIsSidebarToggled={setIsSidebarToggled}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
