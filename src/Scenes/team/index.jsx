import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import { useData } from "../../context/DataContext";
import Header from "../../components/Header";
import ConfirmDialog from "../../components/ConfirmDialog";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useData();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [accessFilter, setAccessFilter] = useState("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    access: "user",
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete Confirmation State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  // Filtered and searched data
  const filteredTeam = useMemo(() => {
    return team.filter((member) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        member.name?.toLowerCase().includes(q) ||
        member.email?.toLowerCase().includes(q) ||
        member.phone?.includes(q) ||
        member.id?.toString().includes(q);

      const matchesAccess =
        accessFilter === "all" || member.access === accessFilter;

      return matchesSearch && matchesAccess;
    });
  }, [team, searchQuery, accessFilter]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      email: "",
      age: "",
      phone: "",
      access: "user",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || "",
      email: member.email || "",
      age: member.age || "",
      phone: member.phone || "",
      access: member.access || "user",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.age || isNaN(formData.age) || Number(formData.age) <= 0) {
      errors.age = "Valid age is required";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    return errors;
  };

  const handleSaveMember = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
      phone: formData.phone.trim(),
      access: formData.access,
    };

    if (editingMember) {
      updateTeamMember(editingMember.id, payload);
    } else {
      addTeamMember(payload);
    }
    setModalOpen(false);
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (memberToDelete) {
      deleteTeamMember(memberToDelete.id);
      setMemberToDelete(null);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 90,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            sx={{
              width: "120px",
              height: "30px",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              boxSizing: "border-box",
              backgroundColor:
                access === "admin"
                  ? colors.greenAccent[600]
                  : access === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[800],
              borderRadius: "4px",
            }}
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon fontSize="small" />}
            {access === "manager" && <SecurityOutlinedIcon fontSize="small" />}
            {access === "user" && <LockOpenOutlinedIcon fontSize="small" />}

            <Typography
              sx={{
                color: colors.grey[100],
                fontSize: "11px",
                fontWeight: 500,
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      renderCell: ({ row }) => (
        <Box display="flex" gap="4px">
          <IconButton
            size="small"
            title="Edit Member"
            onClick={() => handleOpenEdit(row)}
            sx={{ color: colors.grey[100], "&:hover": { color: colors.greenAccent[400] } }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            title="Delete Member"
            onClick={() => handleDeleteClick(row)}
            sx={{ color: colors.grey[100], "&:hover": { color: colors.redAccent[400] } }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      m="20px"
      sx={{
        padding: "10px 20px !important",
      }}
    >
      {/* Top Header & Action */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap="15px"
      >
        <Header title="TEAM" subtitle="Managing the Team Members" />

        <Button
          variant="contained"
          startIcon={<PersonAddOutlinedIcon />}
          onClick={handleOpenCreate}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: colors.blueAccent[800],
            },
          }}
        >
          Add Team Member
        </Button>
      </Box>

      {/* Filter and Search Controls */}
      <Box
        display="flex"
        gap="15px"
        alignItems="center"
        flexWrap="wrap"
        mt="15px"
        mb="10px"
      >
        <TextField
          size="small"
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.grey[300] }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "280px" },
            backgroundColor: colors.primary[400],
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              color: colors.grey[100],
              "& fieldset": { borderColor: colors.primary[500] },
            },
          }}
        />

        <FormControl
          size="small"
          sx={{
            width: { xs: "100%", sm: "180px" },
            backgroundColor: colors.primary[400],
            borderRadius: "4px",
          }}
        >
          <InputLabel sx={{ color: colors.grey[300] }}>Access Level</InputLabel>
          <Select
            value={accessFilter}
            label="Access Level"
            onChange={(e) => setAccessFilter(e.target.value)}
            sx={{
              color: colors.grey[100],
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.primary[500],
              },
            }}
          >
            <MenuItem value="all">All Roles</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" sx={{ color: colors.grey[300], ml: "auto" }}>
          Showing {filteredTeam.length} of {team.length} members
        </Typography>
      </Box>

      {/* Team DataGrid Table */}
      <Box
        m="20px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #3a4558",
            padding: "10px !important",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            padding: "10px !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "5px solid #3a4558 !important",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: `${colors.blueAccent[700]} !important`,
            padding: "0 10px !important",
            boxSizing: "border-box !important",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-cell[data-field="id"]': {
            paddingLeft: "20px !important",
          },
          '& .MuiDataGrid-columnHeader[data-field="id"]': {
            paddingLeft: "20px !important",
          },
          '& .MuiDataGrid-cell[data-field="name"]': {
            paddingLeft: "18px !important",
            paddingRight: "18px !important",
          },
          '& .MuiDataGrid-columnHeader[data-field="name"]': {
            padding: "12px 18px !important",
            boxSizing: "border-box !important",
          },
        }}
      >
        {filteredTeam.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            backgroundColor={colors.primary[400]}
            borderRadius="4px"
            p={4}
          >
            <Typography variant="h5" color={colors.grey[200]} mb={2}>
              No team members found.
            </Typography>
            <Button
              variant="contained"
              startIcon={<PersonAddOutlinedIcon />}
              onClick={handleOpenCreate}
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: colors.greenAccent[700] },
              }}
            >
              Add Team Member
            </Button>
          </Box>
        ) : (
          <DataGrid
            checkboxSelection
            rows={filteredTeam}
            columns={columns}
            rowHeight={70}
            columnHeaderHeight={70}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
          />
        )}
      </Box>

      {/* Add / Edit Member Dialog */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[400],
            backgroundImage: "none",
            color: colors.grey[100],
            borderRadius: "8px",
            border: `1px solid ${colors.primary[500]}`,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "18px", color: colors.grey[100] }}>
          {editingMember ? "Edit Team Member" : "Add New Team Member"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!formErrors.name}
            helperText={formErrors.name}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: colors.grey[100],
                "& fieldset": { borderColor: colors.primary[500] },
              },
              "& .MuiInputLabel-root": { color: colors.grey[300] },
            }}
          />

          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!formErrors.email}
            helperText={formErrors.email}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: colors.grey[100],
                "& fieldset": { borderColor: colors.primary[500] },
              },
              "& .MuiInputLabel-root": { color: colors.grey[300] },
            }}
          />

          <Box display="flex" gap={2}>
            <TextField
              label="Age"
              variant="outlined"
              type="number"
              fullWidth
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              error={!!formErrors.age}
              helperText={formErrors.age}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: colors.grey[100],
                  "& fieldset": { borderColor: colors.primary[500] },
                },
                "& .MuiInputLabel-root": { color: colors.grey[300] },
              }}
            />

            <FormControl fullWidth>
              <InputLabel sx={{ color: colors.grey[300] }}>Access Level</InputLabel>
              <Select
                value={formData.access}
                label="Access Level"
                onChange={(e) => setFormData({ ...formData, access: e.target.value })}
                sx={{
                  color: colors.grey[100],
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.primary[500],
                  },
                }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: colors.grey[100],
                "& fieldset": { borderColor: colors.primary[500] },
              },
              "& .MuiInputLabel-root": { color: colors.grey[300] },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setModalOpen(false)}
            variant="outlined"
            sx={{ color: colors.grey[100], borderColor: colors.grey[400] }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveMember}
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              fontWeight: 600,
              "&:hover": { backgroundColor: colors.greenAccent[700] },
            }}
          >
            {editingMember ? "Save Changes" : "Add Member"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Team Member"
        message={`Are you sure you want to delete team member "${memberToDelete?.name}"? This action will immediately update Local Storage.`}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </Box>
  );
};

export default Team;
