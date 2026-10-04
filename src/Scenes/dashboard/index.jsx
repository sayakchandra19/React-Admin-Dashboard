import { useState, useMemo } from "react";

import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import { tokens } from "../../themes";
import { useData } from "../../context/DataContext";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarCharts from "../../components/BarCharts";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import ConfirmDialog from "../../components/ConfirmDialog";
import DataManagementModal from "../../components/DataManagementModal";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    transactions,
    contacts,
    invoices,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useData();

  /* =========================================================
     DATA MANAGEMENT
  ========================================================= */

  const [dataModalOpen, setDataModalOpen] = useState(false);

  /* =========================================================
     TRANSACTION MODAL
  ========================================================= */

  const [txModalOpen, setTxModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const [txForm, setTxForm] = useState({
    user: "",
    cost: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [txError, setTxError] = useState("");

  /* =========================================================
     DELETE MODAL
  ========================================================= */

  const [txToDelete, setTxToDelete] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  /* =========================================================
     DASHBOARD STATISTICS
  ========================================================= */

  const calculatedStats = useMemo(() => {
    const totalRevenue = transactions.reduce((acc, tx) => {
      const value = parseFloat(tx.cost);

      return acc + (isNaN(value) ? 0 : value);
    }, 0);

    const totalSales = transactions.length + invoices.length;

    const totalClients = contacts.length;

    const emailsCount = 12000 + contacts.length * 45;

    const trafficCount = 1325134 + transactions.length * 820;

    return {
      revenue: totalRevenue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),

      sales: totalSales.toLocaleString("en-US"),

      clients: totalClients.toLocaleString("en-US"),

      emails: emailsCount.toLocaleString("en-US"),

      traffic: trafficCount.toLocaleString("en-US"),
    };
  }, [transactions, invoices, contacts]);

  /* =========================================================
     ADD TRANSACTION
  ========================================================= */

  const handleOpenAddTx = () => {
    setEditingTx(null);

    setTxForm({
      user: "",
      cost: "",
      date: new Date().toISOString().split("T")[0],
    });

    setTxError("");
    setTxModalOpen(true);
  };

  /* =========================================================
     EDIT TRANSACTION
  ========================================================= */

  const handleOpenEditTx = (tx) => {
    setEditingTx(tx);

    setTxForm({
      user: tx.user || "",
      cost: tx.cost || "",
      date: tx.date || new Date().toISOString().split("T")[0],
    });

    setTxError("");
    setTxModalOpen(true);
  };

  /* =========================================================
     SAVE TRANSACTION
  ========================================================= */

  const handleSaveTx = () => {
    if (!txForm.user.trim()) {
      setTxError("User name is required");
      return;
    }

    if (
      !txForm.cost ||
      isNaN(txForm.cost) ||
      Number(txForm.cost) <= 0
    ) {
      setTxError("Valid positive amount is required");
      return;
    }

    if (editingTx) {
      updateTransaction(editingTx.txId, {
        user: txForm.user.trim(),
        cost: parseFloat(txForm.cost).toFixed(2),
        date: txForm.date,
      });
    } else {
      addTransaction({
        user: txForm.user.trim(),
        cost: parseFloat(txForm.cost).toFixed(2),
        date: txForm.date,
      });
    }

    setTxModalOpen(false);
  };

  /* =========================================================
     DELETE TRANSACTION
  ========================================================= */

  const handleDeleteTxClick = (tx) => {
    setTxToDelete(tx);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDeleteTx = () => {
    if (txToDelete) {
      deleteTransaction(txToDelete.txId);
      setTxToDelete(null);
    }

    setDeleteConfirmOpen(false);
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        boxSizing: "border-box",
        padding: {
          xs: "12px",
          sm: "20px",
        },
        overflowX: "hidden",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",

          "@media (max-width: 700px)": {
            flexDirection: "column",
            gap: "15px",
          },
        }}
      >
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your dashboard"
        />

        <Button
          onClick={() => setDataModalOpen(true)}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "13px",
            fontWeight: "bold",
            padding: "10px 18px",
            borderRadius: "3px",
            textTransform: "uppercase",

            "&:hover": {
              backgroundColor: colors.blueAccent[800],
            },
          }}
        >
          <DownloadOutlinedIcon
            sx={{
              marginRight: "10px",
              fontSize: "18px",
            }}
          />

          Download Reports
        </Button>
      </Box>

      {/* =====================================================
          DASHBOARD GRID
      ===================================================== */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(12, minmax(0, 1fr))",

          gridAutoRows: "140px",

          gap: "20px",

          width: "100%",

          /* TABLET */
          "@media (max-width: 1100px)": {
            gridTemplateColumns:
              "repeat(6, minmax(0, 1fr))",
          },

          /* MOBILE */
          "@media (max-width: 700px)": {
            gridTemplateColumns: "1fr",
            gridAutoRows: "auto",
          },
        }}
      >

        {/* =====================================================
            STAT CARD 1
        ===================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              sm: "span 3",
            },

            backgroundColor: colors.primary[400],

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            minWidth: 0,

            height: "100%",
          }}
        >
          <StatBox
            title={calculatedStats.emails}
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        {/* =====================================================
            STAT CARD 2
        ===================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              sm: "span 3",
            },

            backgroundColor: colors.primary[400],

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            minWidth: 0,

            height: "100%",
          }}
        >
          <StatBox
            title={calculatedStats.sales}
            subtitle="Sales Obtained"
            progress="0.65"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        {/* =====================================================
            STAT CARD 3
        ===================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              sm: "span 3",
            },

            backgroundColor: colors.primary[400],

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            minWidth: 0,

            height: "100%",
          }}
        >
          <StatBox
            title={calculatedStats.clients}
            subtitle="New Clients"
            progress="0.45"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        {/* =====================================================
            STAT CARD 4
        ===================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              sm: "span 3",
            },

            backgroundColor: colors.primary[400],

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            minWidth: 0,

            height: "100%",
          }}
        >
          <StatBox
            title={calculatedStats.traffic}
            subtitle="Traffic Inbound"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        {/* =====================================================
            REVENUE CHART
            8 COLUMNS
        ===================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              sm: "span 6",
              md: "span 8",
            },

            gridRow: {
              xs: "auto",
              md: "span 2",
            },

            backgroundColor: colors.primary[400],

            minWidth: 0,

            overflow: "hidden",

            height: {
              xs: "350px",
              md: "300px",
            },
          }}
        >
          <Box
            sx={{
              padding: "18px 20px 0 20px",

              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${calculatedStats.revenue}
              </Typography>
            </Box>

            <IconButton
              onClick={() => setDataModalOpen(true)}
            >
              <DownloadOutlinedIcon
                sx={{
                  fontSize: "24px",
                  color: colors.greenAccent[500],
                }}
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              height: "225px",
              width: "100%",
              marginTop: "-5px",
            }}
          >
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* =====================================================
            RECENT TRANSACTIONS
            4 COLUMNS
        ===================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              sm: "span 6",
              md: "span 4",
            },

            gridRow: {
              xs: "auto",
              md: "span 2",
            },

            backgroundColor: colors.primary[400],

            minWidth: 0,

            overflow: "auto",

            height: {
              xs: "350px",
              md: "300px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              borderBottom:
                `2px solid ${colors.primary[500]}`,

              padding: "15px",
            }}
          >
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontWeight="600"
            >
              Recent Transactions
            </Typography>

            <IconButton
              size="small"
              onClick={handleOpenAddTx}
              sx={{
                backgroundColor:
                  colors.greenAccent[600],

                color: colors.grey[100],

                "&:hover": {
                  backgroundColor:
                    colors.greenAccent[700],
                },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {transactions.length === 0 ? (
            <Box
              p={3}
              textAlign="center"
            >
              <Typography
                color={colors.grey[300]}
                variant="body2"
                mb={1.5}
              >
                No transactions recorded.
              </Typography>

              <Button
                size="small"
                variant="outlined"
                onClick={handleOpenAddTx}
                sx={{
                  color: colors.greenAccent[400],
                  borderColor:
                    colors.greenAccent[400],
                  textTransform: "none",
                }}
              >
                Add Transaction
              </Button>
            </Box>
          ) : (
            transactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",

                  gap: "10px",

                  borderBottom:
                    `1px solid ${colors.primary[500]}`,

                  padding: "10px 15px",

                  "&:hover": {
                    backgroundColor:
                      colors.primary[500],
                  },
                }}
              >
                <Box
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <Typography
                    color={
                      colors.greenAccent[500]
                    }
                    fontSize="13px"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>

                  <Typography
                    color={colors.grey[100]}
                    fontSize="12px"
                    noWrap
                  >
                    {transaction.user}
                  </Typography>
                </Box>

                <Typography
                  color={colors.grey[300]}
                  fontSize="11px"
                  whiteSpace="nowrap"
                >
                  {transaction.date}
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  gap="3px"
                >
                  <Box
                    sx={{
                      backgroundColor:
                        colors.greenAccent[500],

                      color: colors.grey[900],

                      padding: "5px 8px",

                      borderRadius: "3px",

                      fontSize: "11px",

                      fontWeight: 600,

                      whiteSpace: "nowrap",
                    }}
                  >
                    ${transaction.cost}
                  </Box>

                  <IconButton
                    size="small"
                    onClick={() =>
                      handleOpenEditTx(
                        transaction
                      )
                    }
                    sx={{
                      color: colors.grey[300],
                      padding: "3px",
                    }}
                  >
                    <EditOutlinedIcon
                      sx={{
                        fontSize: "14px",
                      }}
                    />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() =>
                      handleDeleteTxClick(
                        transaction
                      )
                    }
                    sx={{
                      color: colors.grey[300],
                      padding: "3px",
                    }}
                  >
                    <DeleteOutlineIcon
                      sx={{
                        fontSize: "14px",
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* =====================================================
            CAMPAIGN
            4 COLUMNS
        ===================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              sm: "span 6",
              md: "span 4",
            },

            gridRow: {
              xs: "auto",
              md: "span 2",
            },

            backgroundColor: colors.primary[400],

            padding: "25px",

            minWidth: 0,

            height: {
              xs: "350px",
              md: "300px",
            },
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
          >
            Campaign
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              marginTop: "20px",
            }}
          >
            <ProgressCircle size="125" />

            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{
                marginTop: "12px",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              ${calculatedStats.revenue}
              {" "}revenue generated
            </Typography>

            <Typography
              color={colors.grey[100]}
              sx={{
                marginTop: "8px",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Includes live expenditures,
              sales & invoices
            </Typography>
          </Box>
        </Box>

        {/* =====================================================
            SALES QUANTITY
            4 COLUMNS
        ===================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              sm: "span 6",
              md: "span 4",
            },

            gridRow: {
              xs: "auto",
              md: "span 2",
            },

            backgroundColor: colors.primary[400],

            minWidth: 0,

            overflow: "hidden",

            height: {
              xs: "350px",
              md: "300px",
            },
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
            sx={{
              padding:
                "25px 25px 0 25px",
            }}
          >
            Sales Quantity
          </Typography>

          <Box
            sx={{
              height: "240px",
              width: "100%",
              marginTop: "-10px",
            }}
          >
            <BarCharts
              isDashboard={true}
            />
          </Box>
        </Box>

        {/* =====================================================
            GEOGRAPHY
            4 COLUMNS
        ===================================================== */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 1",
              sm: "span 6",
              md: "span 4",
            },

            gridRow: {
              xs: "auto",
              md: "span 2",
            },

            backgroundColor: colors.primary[400],

            minWidth: 0,

            overflow: "hidden",

            height: {
              xs: "350px",
              md: "300px",
            },
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
            sx={{
              padding:
                "25px 25px 0 25px",
            }}
          >
            Geography Based Traffic
          </Typography>

          <Box
            sx={{
              height: "240px",
              width: "100%",
              marginTop: "-10px",
            }}
          >
            <GeographyChart
              isDashboard={true}
            />
          </Box>
        </Box>
      </Box>

      {/* =====================================================
          ADD / EDIT TRANSACTION
      ===================================================== */}

      <Dialog
        open={txModalOpen}
        onClose={() =>
          setTxModalOpen(false)
        }
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor:
              colors.primary[400],

            backgroundImage: "none",

            color: colors.grey[100],

            borderRadius: "8px",

            border:
              `1px solid ${colors.primary[500]}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "18px",
            color: colors.grey[100],
          }}
        >
          {editingTx
            ? "Edit Transaction"
            : "Record New Transaction"}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 2,
          }}
        >
          <TextField
            label="User / Customer Name"
            variant="outlined"
            fullWidth
            value={txForm.user}
            onChange={(e) => {
              setTxForm({
                ...txForm,
                user: e.target.value,
              });

              setTxError("");
            }}
            error={
              !!txError &&
              !txForm.user
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                color: colors.grey[100],

                "& fieldset": {
                  borderColor:
                    colors.primary[500],
                },
              },

              "& .MuiInputLabel-root": {
                color: colors.grey[300],
              },
            }}
          />

          <TextField
            label="Amount ($)"
            variant="outlined"
            type="number"
            fullWidth
            value={txForm.cost}
            onChange={(e) => {
              setTxForm({
                ...txForm,
                cost: e.target.value,
              });

              setTxError("");
            }}
            error={
              !!txError &&
              (!txForm.cost ||
                Number(txForm.cost) <= 0)
            }
            helperText={txError}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: colors.grey[100],

                "& fieldset": {
                  borderColor:
                    colors.primary[500],
                },
              },

              "& .MuiInputLabel-root": {
                color: colors.grey[300],
              },
            }}
          />

          <TextField
            label="Date"
            variant="outlined"
            type="date"
            fullWidth
            value={txForm.date}
            onChange={(e) =>
              setTxForm({
                ...txForm,
                date: e.target.value,
              })
            }
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: colors.grey[100],

                "& fieldset": {
                  borderColor:
                    colors.primary[500],
                },
              },

              "& .MuiInputLabel-root": {
                color: colors.grey[300],
              },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            gap: 1,
          }}
        >
          <Button
            onClick={() =>
              setTxModalOpen(false)
            }
            variant="outlined"
            sx={{
              color: colors.grey[100],
              borderColor: colors.grey[400],
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSaveTx}
            variant="contained"
            sx={{
              backgroundColor:
                colors.greenAccent[600],

              color: colors.grey[100],

              fontWeight: 600,

              "&:hover": {
                backgroundColor:
                  colors.greenAccent[700],
              },
            }}
          >
            {editingTx
              ? "Save Changes"
              : "Add Transaction"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* =====================================================
          DELETE CONFIRMATION
      ===================================================== */}

      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Transaction"
        message={`Are you sure you want to delete transaction "${txToDelete?.txId}" by ${txToDelete?.user}?`}
        onConfirm={handleConfirmDeleteTx}
        onClose={() =>
          setDeleteConfirmOpen(false)
        }
      />

      {/* =====================================================
          DATA MANAGEMENT
      ===================================================== */}

      <DataManagementModal
        open={dataModalOpen}
        onClose={() =>
          setDataModalOpen(false)
        }
      />
    </Box>
  );
};

export default Dashboard;