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
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import { useData } from "../../context/DataContext";
import Header from "../../components/Header";
import ConfirmDialog from "../../components/ConfirmDialog";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { contacts, addContact, updateContact, deleteContact } = useData();

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    registrarId: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete Confirmation State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.includes(q) ||
        c.city?.toLowerCase().includes(q) ||
        c.address?.toLowerCase().includes(q) ||
        c.zipCode?.toString().includes(q) ||
        c.registrarId?.toString().includes(q)
    );
  }, [contacts, searchQuery]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingContact(null);
    setFormData({
      name: "",
      email: "",
      age: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      registrarId: "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name || "",
      email: contact.email || "",
      age: contact.age || "",
      phone: contact.phone || "",
      address: contact.address || "",
      city: contact.city || "",
      zipCode: contact.zipCode || "",
      registrarId: contact.registrarId || "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.age || isNaN(formData.age) || Number(formData.age) <= 0) {
      errors.age = "Valid age is required";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.zipCode.trim()) errors.zipCode = "Zip code is required";
    return errors;
  };

  const handleSaveContact = () => {
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
      address: formData.address.trim(),
      city: formData.city.trim(),
      zipCode: formData.zipCode.trim(),
      registrarId: formData.registrarId
        ? Number(formData.registrarId)
        : Math.floor(100000 + Math.random() * 900000),
    };

    if (editingContact) {
      updateContact(editingContact.id, payload);
    } else {
      addContact(payload);
    }
    setModalOpen(false);
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete.id);
      setContactToDelete(null);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID", width: 120 },
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
      width: 80,
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
      field: "address",
      headerName: "Address",
      flex: 1.2,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.8,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 0.6,
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
            title="Edit Contact"
            onClick={() => handleOpenEdit(row)}
            sx={{ color: colors.grey[100], "&:hover": { color: colors.greenAccent[400] } }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            title="Delete Contact"
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
      sx={{
        margin: { xs: "12px", sm: "20px" },
        padding: { xs: "0", sm: "10px" },
      }}
    >
      {/* Top Header & Action */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: "12px",
          width: "100%",
        }}
      >
        <Header
          title="CONTACTS"
          subtitle="List of Contacts for future reference"
        />

        <Button
          variant="contained"
          startIcon={<PersonAddOutlinedIcon />}
          onClick={handleOpenCreate}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "13px",
            fontWeight: "bold",
            padding: "9px 18px",
            textTransform: "none",
            alignSelf: { xs: "stretch", sm: "auto" },
            "&:hover": {
              backgroundColor: colors.blueAccent[800],
            },
          }}
        >
          Add Contact
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
          placeholder="Search contacts by name, city, email..."
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
            width: { xs: "100%", sm: "320px" },
            backgroundColor: colors.primary[400],
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              color: colors.grey[100],
              "& fieldset": { borderColor: colors.primary[500] },
            },
          }}
        />

        <Typography variant="body2" sx={{ color: colors.grey[300], ml: "auto" }}>
          Showing {filteredContacts.length} of {contacts.length} contacts
        </Typography>
      </Box>

      {/* DataGrid Table */}
      <Box
        sx={{
          margin: "15px 0 0 0",
          height: { xs: "65vh", sm: "70vh" },
          width: "100%",
          overflowX: "auto",
          "& .MuiDataGrid-root": {
            border: "none",
            minWidth: "700px",
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
            backgroundColor: colors.primary[500] + " !important",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700] + " !important",
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
        {filteredContacts.length === 0 ? (
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
              No contacts available.
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
              Add Contact
            </Button>
          </Box>
        ) : (
          <DataGrid
            checkboxSelection
            rows={filteredContacts}
            columns={columns}
            rowHeight={70}
            columnHeaderHeight={70}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
          />
        )}
      </Box>

      {/* Add / Edit Contact Dialog */}
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
          {editingContact ? "Edit Contact" : "Add New Contact"}
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

          <Box display="flex" gap={2}>
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

            <TextField
              label="Age"
              variant="outlined"
              type="number"
              sx={{
                width: "120px",
                "& .MuiOutlinedInput-root": {
                  color: colors.grey[100],
                  "& fieldset": { borderColor: colors.primary[500] },
                },
                "& .MuiInputLabel-root": { color: colors.grey[300] },
              }}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              error={!!formErrors.age}
              helperText={formErrors.age}
            />
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

          <TextField
            label="Street Address"
            variant="outlined"
            fullWidth
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            error={!!formErrors.address}
            helperText={formErrors.address}
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
              label="City"
              variant="outlined"
              fullWidth
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              error={!!formErrors.city}
              helperText={formErrors.city}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: colors.grey[100],
                  "& fieldset": { borderColor: colors.primary[500] },
                },
                "& .MuiInputLabel-root": { color: colors.grey[300] },
              }}
            />

            <TextField
              label="Zip Code"
              variant="outlined"
              fullWidth
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              error={!!formErrors.zipCode}
              helperText={formErrors.zipCode}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: colors.grey[100],
                  "& fieldset": { borderColor: colors.primary[500] },
                },
                "& .MuiInputLabel-root": { color: colors.grey[300] },
              }}
            />
          </Box>
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
            onClick={handleSaveContact}
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              fontWeight: 600,
              "&:hover": { backgroundColor: colors.greenAccent[700] },
            }}
          >
            {editingContact ? "Save Changes" : "Add Contact"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Contact"
        message={`Are you sure you want to delete contact "${contactToDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </Box>
  );
};

export default Contacts;
