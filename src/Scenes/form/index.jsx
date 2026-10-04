import { useState } from "react";
import { useData } from "../../context/DataContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../themes";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

const phoneRegExp =
  /^\+?\d{1,4}?[\s-]?\(?\d{1,3}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/;

const userSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Contact number is required"),
  address1: yup.string().required("Address line 1 is required"),
  address2: yup.string(),
});

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { addContact, addTeamMember } = useData();

  const handelFormSubmit = (values, { resetForm }) => {
    const fullName = `${values.firstName} ${values.lastName}`.trim();

    // Persist as a Contact
    addContact({
      name: fullName,
      email: values.email,
      phone: values.contact,
      address: `${values.address1} ${values.address2 || ""}`.trim(),
      city: "Global",
      zipCode: "10001",
      age: 28,
    });

    // Also persist as a Team Member with default role
    addTeamMember({
      name: fullName,
      email: values.email,
      phone: values.contact,
      age: 28,
      access: "user",
    });

    setOpenSnackbar(true);
    resetForm();
  };

  const textFieldSx = {
    "& .MuiFilledInput-root": {
      backgroundColor: `${colors.primary[500]} !important`,
      borderRadius: "6px",
      border: "1px solid #3a4558",
      transition: "all 0.2s ease-in-out",
      "&:before, &:after": {
        display: "none",
      },
      "&:hover": {
        borderColor: colors.greenAccent[500],
        backgroundColor: `${colors.primary[500]} !important`,
      },
      "&.Mui-focused": {
        borderColor: colors.greenAccent[400],
        boxShadow: `0 0 0 2px ${colors.greenAccent[600]}33`,
        backgroundColor: `${colors.primary[500]} !important`,
      },
      "&.Mui-error": {
        borderColor: `${colors.redAccent[500]} !important`,
      },
    },
    "& .MuiInputLabel-root": {
      color: `${colors.grey[300]} !important`,
      fontSize: "13px",
      "&.Mui-focused": {
        color: `${colors.greenAccent[400]} !important`,
      },
      "&.Mui-error": {
        color: `${colors.redAccent[400]} !important`,
      },
    },
    "& .MuiInputBase-input": {
      color: `${colors.grey[100]} !important`,
      fontSize: "14px",
      paddingTop: "20px",
      paddingBottom: "8px",
    },
    "& .MuiFormHelperText-root": {
      color: `${colors.redAccent[400]} !important`,
      fontSize: "11px",
      marginTop: "4px",
      marginLeft: "2px",
    },
  };

  return (
    <Box
      sx={{
        margin: { xs: "12px", sm: "20px" },
        padding: { xs: "0", sm: "10px" },
      }}
    >
      <Header title="CREATE USER" subtitle="Create a new user profile" />

      <Box
        backgroundColor={colors.primary[400]}
        borderRadius="10px"
        border="1px solid #3a4558"
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.25)"
        p={{ xs: "18px 14px", sm: "25px", md: "35px" }}
        m={{ xs: "15px 0 0 0", sm: "25px 0 0 0" }}
      >
        <Formik
          onSubmit={handelFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            handleReset,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                gap="20px"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                {/* Personal Information Section */}
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: "2px",
                  }}
                >
                  <PersonOutlinedIcon
                    sx={{ color: colors.greenAccent[400], fontSize: "20px" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: colors.grey[100],
                      fontWeight: 600,
                      fontSize: "14px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Personal Information
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlinedIcon
                          sx={{
                            color: colors.grey[400],
                            fontSize: "18px",
                            mt: "12px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ...textFieldSx, gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlinedIcon
                          sx={{
                            color: colors.grey[400],
                            fontSize: "18px",
                            mt: "12px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ...textFieldSx, gridColumn: "span 2" }}
                />

                {/* Contact Information Section */}
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: "10px",
                    mb: "2px",
                  }}
                >
                  <EmailOutlinedIcon
                    sx={{ color: colors.greenAccent[400], fontSize: "20px" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: colors.grey[100],
                      fontWeight: 600,
                      fontSize: "14px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Contact Details
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon
                          sx={{
                            color: colors.grey[400],
                            fontSize: "18px",
                            mt: "12px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ...textFieldSx, gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon
                          sx={{
                            color: colors.grey[400],
                            fontSize: "18px",
                            mt: "12px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ...textFieldSx, gridColumn: "span 2" }}
                />

                {/* Address Details Section */}
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: "10px",
                    mb: "2px",
                  }}
                >
                  <LocationOnOutlinedIcon
                    sx={{ color: colors.greenAccent[400], fontSize: "20px" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: colors.grey[100],
                      fontWeight: 600,
                      fontSize: "14px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Address Information
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address Line 1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address1}
                  name="address1"
                  error={!!touched.address1 && !!errors.address1}
                  helperText={touched.address1 && errors.address1}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnOutlinedIcon
                          sx={{
                            color: colors.grey[400],
                            fontSize: "18px",
                            mt: "12px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ...textFieldSx, gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address Line 2 (Optional)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address2}
                  name="address2"
                  error={!!touched.address2 && !!errors.address2}
                  helperText={touched.address2 && errors.address2}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeOutlinedIcon
                          sx={{
                            color: colors.grey[400],
                            fontSize: "18px",
                            mt: "12px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ...textFieldSx, gridColumn: "span 4" }}
                />

                {/* Form Action Buttons */}
                <Box
                  display="flex"
                  justifyContent={{ xs: "stretch", sm: "flex-end" }}
                  alignItems="center"
                  flexDirection={{ xs: "column-reverse", sm: "row" }}
                  gap={{ xs: "10px", sm: "15px" }}
                  mt="15px"
                  sx={{
                    gridColumn: "span 4",
                    pt: "20px",
                    borderTop: "1px solid #3a4558",
                  }}
                >
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outlined"
                    startIcon={<RestartAltOutlinedIcon />}
                    fullWidth={!isNonMobile}
                    sx={{
                      color: colors.grey[100],
                      borderColor: "#3a4558",
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "8px 18px",
                      borderRadius: "6px",
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        borderColor: colors.grey[300],
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<PersonAddAlt1OutlinedIcon />}
                    fullWidth={!isNonMobile}
                    sx={{
                      backgroundColor: colors.greenAccent[600],
                      color: colors.grey[100],
                      fontSize: "13px",
                      fontWeight: "600",
                      padding: "9px 24px",
                      borderRadius: "6px",
                      textTransform: "none",
                      letterSpacing: "0.3px",
                      width: { xs: "100%", sm: "auto" },
                      boxShadow: "0 4px 14px rgba(61, 165, 138, 0.35)",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        backgroundColor: colors.greenAccent[500],
                        boxShadow: "0 6px 20px rgba(76, 206, 172, 0.5)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    Create New User
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      {/* Feedback Toast */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[100],
            fontWeight: "600",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          User profile created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Form;
