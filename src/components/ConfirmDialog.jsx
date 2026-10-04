import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import { tokens } from "../themes";

const ConfirmDialog = ({
  open,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this record?",
  onConfirm,
  onClose,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: colors.primary[400],
          backgroundImage: "none",
          color: colors.grey[100],
          borderRadius: "8px",
          border: `1px solid ${colors.primary[500]}`,
          minWidth: { xs: "90%", sm: "400px" },
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: "18px", color: colors.grey[100] }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: colors.grey[200], fontSize: "14px" }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: colors.grey[100],
            borderColor: colors.grey[400],
            "&:hover": { borderColor: colors.grey[200] },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="contained"
          sx={{
            backgroundColor: colors.redAccent[500],
            color: "#ffffff",
            fontWeight: 600,
            "&:hover": { backgroundColor: colors.redAccent[600] },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
