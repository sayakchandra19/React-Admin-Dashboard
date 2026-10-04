import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Popper,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  ClickAwayListener,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../../themes";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useData } from "../../../context/DataContext";
import DataManagementModal from "../../../components/DataManagementModal";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { team, contacts, invoices, transactions } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const searchInputRef = useRef(null);

  const trimmed = searchTerm.trim().toLowerCase();

  // Search logic across entities
  const matchingTeam = trimmed
    ? team.filter(
        (m) =>
          m.name?.toLowerCase().includes(trimmed) ||
          m.email?.toLowerCase().includes(trimmed) ||
          m.access?.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingContacts = trimmed
    ? contacts.filter(
        (c) =>
          c.name?.toLowerCase().includes(trimmed) ||
          c.email?.toLowerCase().includes(trimmed) ||
          c.phone?.includes(trimmed) ||
          c.city?.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingInvoices = trimmed
    ? invoices.filter(
        (inv) =>
          inv.name?.toLowerCase().includes(trimmed) ||
          inv.email?.toLowerCase().includes(trimmed) ||
          inv.phone?.includes(trimmed) ||
          inv.cost?.toString().includes(trimmed)
      )
    : [];

  const matchingTransactions = trimmed
    ? transactions.filter(
        (tx) =>
          tx.user?.toLowerCase().includes(trimmed) ||
          tx.txId?.toLowerCase().includes(trimmed) ||
          tx.cost?.toString().includes(trimmed)
      )
    : [];

  const hasResults =
    matchingTeam.length > 0 ||
    matchingContacts.length > 0 ||
    matchingInvoices.length > 0 ||
    matchingTransactions.length > 0;

  const showPopper = trimmed.length > 0;

  const handleSelectResult = (path) => {
    setSearchTerm("");
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* SEARCH BAR */}
      <ClickAwayListener onClickAway={() => setSearchTerm("")}>
        <Box sx={{ position: "relative" }}>
          <Box
            ref={searchInputRef}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: colors.primary[400],
              borderRadius: "3px",
              width: "280px",
              border: `1px solid ${colors.primary[500]}`,
            }}
          >
            <InputBase
              sx={{
                ml: 2,
                flex: 1,
                color: colors.grey[100],
              }}
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm ? (
              <IconButton
                type="button"
                sx={{ p: 1 }}
                onClick={() => setSearchTerm("")}
              >
                <ClearIcon fontSize="small" sx={{ color: colors.grey[300] }} />
              </IconButton>
            ) : (
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon sx={{ color: colors.grey[300] }} />
              </IconButton>
            )}
          </Box>

          {/* SEARCH RESULTS POPPER */}
          <Popper
            open={showPopper}
            anchorEl={searchInputRef.current}
            placement="bottom-start"
            style={{ zIndex: 1300, width: "380px" }}
          >
            <Paper
              sx={{
                mt: 1,
                maxHeight: "400px",
                overflowY: "auto",
                backgroundColor: colors.primary[400],
                backgroundImage: "none",
                border: `1px solid ${colors.primary[500]}`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                borderRadius: "6px",
                p: 1.5,
              }}
            >
              {!hasResults ? (
                <Typography
                  variant="body2"
                  sx={{ color: colors.grey[300], p: 1.5, textAlign: "center" }}
                >
                  No matching records found for "{searchTerm}"
                </Typography>
              ) : (
                <List dense disablePadding>
                  {/* Team Matches */}
                  {matchingTeam.length > 0 && (
                    <Box mb={1}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.greenAccent[500],
                          fontWeight: 700,
                          textTransform: "uppercase",
                          px: 1,
                        }}
                      >
                        Team Members ({matchingTeam.length})
                      </Typography>
                      {matchingTeam.slice(0, 3).map((item) => (
                        <ListItem
                          key={`team-${item.id}`}
                          button
                          onClick={() => handleSelectResult("/team")}
                          sx={{
                            borderRadius: "4px",
                            "&:hover": { backgroundColor: colors.primary[500] },
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography color={colors.grey[100]} variant="body2">
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Typography color={colors.grey[400]} variant="caption">
                                {item.email} • {item.access}
                              </Typography>
                            }
                          />
                          <Chip
                            label="Team"
                            size="small"
                            sx={{
                              fontSize: "10px",
                              height: "20px",
                              backgroundColor: colors.blueAccent[700],
                              color: colors.grey[100],
                            }}
                          />
                        </ListItem>
                      ))}
                    </Box>
                  )}

                  {/* Contacts Matches */}
                  {matchingContacts.length > 0 && (
                    <Box mb={1}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.greenAccent[500],
                          fontWeight: 700,
                          textTransform: "uppercase",
                          px: 1,
                        }}
                      >
                        Contacts ({matchingContacts.length})
                      </Typography>
                      {matchingContacts.slice(0, 3).map((item) => (
                        <ListItem
                          key={`contact-${item.id}`}
                          button
                          onClick={() => handleSelectResult("/contacts")}
                          sx={{
                            borderRadius: "4px",
                            "&:hover": { backgroundColor: colors.primary[500] },
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography color={colors.grey[100]} variant="body2">
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Typography color={colors.grey[400]} variant="caption">
                                {item.email} • {item.phone}
                              </Typography>
                            }
                          />
                          <Chip
                            label="Contact"
                            size="small"
                            sx={{
                              fontSize: "10px",
                              height: "20px",
                              backgroundColor: colors.greenAccent[700],
                              color: colors.grey[100],
                            }}
                          />
                        </ListItem>
                      ))}
                    </Box>
                  )}

                  {/* Invoices Matches */}
                  {matchingInvoices.length > 0 && (
                    <Box mb={1}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.greenAccent[500],
                          fontWeight: 700,
                          textTransform: "uppercase",
                          px: 1,
                        }}
                      >
                        Invoices ({matchingInvoices.length})
                      </Typography>
                      {matchingInvoices.slice(0, 3).map((item) => (
                        <ListItem
                          key={`inv-${item.id}`}
                          button
                          onClick={() => handleSelectResult("/invoices")}
                          sx={{
                            borderRadius: "4px",
                            "&:hover": { backgroundColor: colors.primary[500] },
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography color={colors.grey[100]} variant="body2">
                                {item.name} (${item.cost})
                              </Typography>
                            }
                            secondary={
                              <Typography color={colors.grey[400]} variant="caption">
                                {item.date} • {item.phone}
                              </Typography>
                            }
                          />
                          <Chip
                            label="Invoice"
                            size="small"
                            sx={{
                              fontSize: "10px",
                              height: "20px",
                              backgroundColor: colors.redAccent[700],
                              color: colors.grey[100],
                            }}
                          />
                        </ListItem>
                      ))}
                    </Box>
                  )}

                  {/* Transactions Matches */}
                  {matchingTransactions.length > 0 && (
                    <Box mb={1}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.greenAccent[500],
                          fontWeight: 700,
                          textTransform: "uppercase",
                          px: 1,
                        }}
                      >
                        Transactions ({matchingTransactions.length})
                      </Typography>
                      {matchingTransactions.slice(0, 3).map((item, idx) => (
                        <ListItem
                          key={`tx-${item.txId}-${idx}`}
                          button
                          onClick={() => handleSelectResult("/")}
                          sx={{
                            borderRadius: "4px",
                            "&:hover": { backgroundColor: colors.primary[500] },
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography color={colors.grey[100]} variant="body2">
                                {item.user} (${item.cost})
                              </Typography>
                            }
                            secondary={
                              <Typography color={colors.grey[400]} variant="caption">
                                ID: {item.txId} • {item.date}
                              </Typography>
                            }
                          />
                          <Chip
                            label="Tx"
                            size="small"
                            sx={{
                              fontSize: "10px",
                              height: "20px",
                              backgroundColor: colors.primary[600],
                              color: colors.grey[100],
                            }}
                          />
                        </ListItem>
                      ))}
                    </Box>
                  )}
                </List>
              )}
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>

      {/* ICONS */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "nowrap",
        }}
      >
        <IconButton onClick={colorMode.toggleColorMode} title="Toggle Dark/Light Mode">
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton
          title="Notifications"
          onClick={(e) => setNotificationAnchorEl(e.currentTarget)}
        >
          <NotificationsOutlinedIcon />
        </IconButton>

        <IconButton
          title="Data Management & LocalStorage"
          onClick={() => setDataModalOpen(true)}
        >
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton onClick={() => navigate("/form")} title="User Profile">
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={() => setNotificationAnchorEl(null)}
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[400],
            backgroundImage: "none",
            border: `1px solid ${colors.primary[500]}`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            borderRadius: "6px",
            minWidth: "260px",
            p: 1,
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: colors.grey[100],
            px: 1.5,
            py: 0.5,
          }}
        >
          Notifications
        </Typography>
        <Divider sx={{ my: 0.5, borderColor: colors.primary[500] }} />
        <MenuItem
          onClick={() => {
            setNotificationAnchorEl(null);
            navigate("/invoices");
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ color: colors.grey[100], fontWeight: 600 }}>
              {invoices.length} Active Invoices
            </Typography>
            <Typography variant="caption" sx={{ color: colors.grey[300] }}>
              Local storage synced
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setNotificationAnchorEl(null);
            navigate("/team");
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ color: colors.grey[100], fontWeight: 600 }}>
              {team.length} Team Members
            </Typography>
            <Typography variant="caption" sx={{ color: colors.grey[300] }}>
              All records up to date
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* Data Management Modal */}
      <DataManagementModal
        open={dataModalOpen}
        onClose={() => setDataModalOpen(false)}
      />
    </Box>
  );
};

export default Topbar;