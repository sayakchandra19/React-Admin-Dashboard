import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { tokens } from "../themes";
import { useData } from "../context/DataContext";
import ConfirmDialog from "./ConfirmDialog";

const DataManagementModal = ({ open, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { exportData, importData, resetToDemo, clearAll } = useData();

  const fileInputRef = useRef(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [importStatus, setImportStatus] = useState({ error: "", success: "" });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const success = importData(content);
        if (success) {
          setImportStatus({
            success: "Data successfully imported into Local Storage!",
            error: "",
          });
        }
      } catch (err) {
        setImportStatus({
          error: "Failed to parse imported file: " + err.message,
          success: "",
        });
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[400],
            backgroundImage: "none",
            color: colors.grey[100],
            borderRadius: "10px",
            border: `1px solid ${colors.primary[500]}`,
            p: { xs: 0.5, sm: 1 },
            m: { xs: 1.5, sm: 3 },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: { xs: "17px", sm: "20px" },
            color: colors.grey[100],
            borderBottom: `1px solid ${colors.primary[500]}`,
            pb: 1.5,
          }}
        >
          Data & Local Storage Management
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: colors.grey[200], mb: 3 }}>
            Manage your dashboard application data stored directly in browser
            Local Storage. You can export a JSON backup, import existing records,
            or restore the default mock data.
          </Typography>

          {importStatus.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {importStatus.error}
            </Alert>
          )}

          {importStatus.success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {importStatus.success}
            </Alert>
          )}

          <Box display="flex" flexDirection="column" gap={2}>
            {/* Export JSON */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              gap={1.5}
              p={2}
              sx={{
                backgroundColor: colors.primary[500],
                borderRadius: "6px",
              }}
            >
              <Box>
                <Typography fontWeight="600" color={colors.grey[100]}>
                  Export Application Data
                </Typography>
                <Typography variant="caption" color={colors.grey[300]}>
                  Download all dashboard records as a JSON file backup.
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<DownloadOutlinedIcon />}
                onClick={exportData}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontWeight: 600,
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  width: { xs: "100%", sm: "auto" },
                  textTransform: "none",
                  "&:hover": { backgroundColor: colors.blueAccent[800] },
                }}
              >
                Export JSON
              </Button>
            </Box>

            {/* Import JSON */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              gap={1.5}
              p={2}
              sx={{
                backgroundColor: colors.primary[500],
                borderRadius: "6px",
              }}
            >
              <Box>
                <Typography fontWeight="600" color={colors.grey[100]}>
                  Import Application Data
                </Typography>
                <Typography variant="caption" color={colors.grey[300]}>
                  Restore records from a previously exported JSON backup.
                </Typography>
              </Box>
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                startIcon={<UploadFileOutlinedIcon />}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  backgroundColor: colors.greenAccent[600],
                  color: colors.grey[100],
                  fontWeight: 600,
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  width: { xs: "100%", sm: "auto" },
                  textTransform: "none",
                  "&:hover": { backgroundColor: colors.greenAccent[700] },
                }}
              >
                Import JSON
              </Button>
            </Box>

            {/* Reset Demo Data */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              gap={1.5}
              p={2}
              sx={{
                backgroundColor: colors.primary[500],
                borderRadius: "6px",
              }}
            >
              <Box>
                <Typography fontWeight="600" color={colors.grey[100]}>
                  Reset Demo Data
                </Typography>
                <Typography variant="caption" color={colors.grey[300]}>
                  Restore default team, contacts, invoices and transactions.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<RestartAltOutlinedIcon />}
                onClick={() => setConfirmResetOpen(true)}
                sx={{
                  color: colors.greenAccent[400],
                  borderColor: colors.greenAccent[400],
                  fontWeight: 600,
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  width: { xs: "100%", sm: "auto" },
                  textTransform: "none",
                  "&:hover": {
                    borderColor: colors.greenAccent[300],
                    backgroundColor: "rgba(76, 206, 172, 0.08)",
                  },
                }}
              >
                Reset Defaults
              </Button>
            </Box>

            {/* Clear All Storage */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              gap={1.5}
              p={2}
              sx={{
                backgroundColor: colors.primary[500],
                borderRadius: "6px",
              }}
            >
              <Box>
                <Typography fontWeight="600" color={colors.grey[100]}>
                  Clear All Data
                </Typography>
                <Typography variant="caption" color={colors.grey[300]}>
                  Erase all application records from Local Storage.
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<DeleteForeverOutlinedIcon />}
                onClick={() => setConfirmClearOpen(true)}
                sx={{
                  backgroundColor: colors.redAccent[600],
                  color: colors.grey[100],
                  fontWeight: 600,
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  width: { xs: "100%", sm: "auto" },
                  textTransform: "none",
                  "&:hover": { backgroundColor: colors.redAccent[700] },
                }}
              >
                Clear All
              </Button>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        open={confirmResetOpen}
        title="Reset Demo Data"
        message="Are you sure you want to reset all data back to the default demo values? Any customized records in local storage will be replaced."
        confirmText="Reset"
        confirmColor="warning"
        onConfirm={() => {
          resetToDemo();
          setConfirmResetOpen(false);
          setImportStatus({
            success: "Demo data restored successfully!",
            error: "",
          });
        }}
        onClose={() => setConfirmResetOpen(false)}
      />

      <ConfirmDialog
        open={confirmClearOpen}
        title="Clear All Application Data"
        message="Are you sure you want to completely erase all data in Local Storage? This action cannot be undone."
        confirmText="Clear Everything"
        confirmColor="error"
        onConfirm={() => {
          clearAll();
          setConfirmClearOpen(false);
          setImportStatus({
            success: "All Local Storage data cleared.",
            error: "",
          });
        }}
        onClose={() => setConfirmClearOpen(false)}
      />
    </>
  );
};

export default DataManagementModal;
