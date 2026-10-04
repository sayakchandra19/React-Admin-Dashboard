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

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { invoices, addInvoice, updateInvoice, deleteInvoice } = useData();

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cost: "",
    phone: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete Confirmation State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return invoices;
    return invoices.filter(
      (inv) =>
        inv.name?.toLowerCase().includes(q) ||
        inv.email?.toLowerCase().includes(q) ||
        inv.phone?.includes(q) ||
        inv.cost?.toString().includes(q) ||
        inv.date?.includes(q) ||
        inv.id?.toString().includes(q)
    );
  }, [invoices, searchQuery]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingInvoice(null);
    setFormData({
      name: "",
      email: "",
      cost: "",
      phone: "",
      date: new Date().toISOString().split("T")[0],
    });
    setFormErrors({});
    setModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      name: invoice.name || "",
      email: invoice.email || "",
      cost: invoice.cost || "",
      phone: invoice.phone || "",
      date: invoice.date || "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Client name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.cost || isNaN(formData.cost) || Number(formData.cost) < 0) {
      errors.cost = "Valid cost is required";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.date.trim()) errors.date = "Date is required";
    return errors;
  };

  const handleSaveInvoice = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      cost: parseFloat(formData.cost).toFixed(2),
      phone: formData.phone.trim(),
      date: formData.date.trim(),
    };

    if (editingInvoice) {
      updateInvoice(editingInvoice.id, payload);
    } else {
      addInvoice(payload);
    }
    setModalOpen(false);
  };

  const handleDeleteClick = (invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (invoiceToDelete) {
      deleteInvoice(invoiceToDelete.id);
      setInvoiceToDelete(null);
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
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]} fontWeight="600">
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
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
            title="Edit Invoice"
            onClick={() => handleOpenEdit(row)}
            sx={{ color: colors.grey[100], "&:hover": { color: colors.greenAccent[400] } }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            title="Delete Invoice"
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
        <Header title="INVOICES" subtitle="List of Invoice balances" />

        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
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
          Add Invoice
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
          placeholder="Search invoices by client, date, cost..."
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
          Showing {filteredInvoices.length} of {invoices.length} invoices
        </Typography>
      </Box>

      {/* Invoices DataGrid Table */}
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
            backgroundColor: colors.blueAccent[700] + " !important",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
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
        {filteredInvoices.length === 0 ? (
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
              No invoices available.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleOpenCreate}
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: colors.greenAccent[700] },
              }}
            >
              Add Invoice
            </Button>
          </Box>
        ) : (
          <DataGrid
            checkboxSelection
            rows={filteredInvoices}
            columns={columns}
            rowHeight={70}
            columnHeaderHeight={70}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
          />
        )}
      </Box>

      {/* Add / Edit Invoice Dialog */}
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
          {editingInvoice ? "Edit Invoice" : "Add New Invoice"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Client Name"
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
              label="Cost ($)"
              variant="outlined"
              type="number"
              sx={{
                width: "140px",
                "& .MuiOutlinedInput-root": {
                  color: colors.grey[100],
                  "& fieldset": { borderColor: colors.primary[500] },
                },
                "& .MuiInputLabel-root": { color: colors.grey[300] },
              }}
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              error={!!formErrors.cost}
              helperText={formErrors.cost}
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
            label="Date"
            variant="outlined"
            type="date"
            fullWidth
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={!!formErrors.date}
            helperText={formErrors.date}
            InputLabelProps={{ shrink: true }}
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
            onClick={handleSaveInvoice}
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              fontWeight: 600,
              "&:hover": { backgroundColor: colors.greenAccent[700] },
            }}
          >
            {editingInvoice ? "Save Changes" : "Add Invoice"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Invoice"
        message={`Are you sure you want to delete invoice for "${invoiceToDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </Box>
  );
};

export default Invoices;
