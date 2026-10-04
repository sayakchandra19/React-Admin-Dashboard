import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useData } from "../context/DataContext";

const NotificationSnackbar = () => {
  const { notification, closeNotification } = useData();

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={4000}
      onClose={closeNotification}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={closeNotification}
        severity={notification.severity || "success"}
        variant="filled"
        sx={{
          width: "100%",
          fontWeight: 600,
          borderRadius: "8px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
        }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
