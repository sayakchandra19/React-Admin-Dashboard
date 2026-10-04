import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../themes";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb={{ xs: "15px", sm: "25px" }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: { xs: "22px", sm: "26px", md: "32px" },
          fontWeight: 700,
          color: colors.grey[100],
          mb: "4px",
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: { xs: "13px", sm: "14px", md: "16px" },
          color: colors.greenAccent[400],
          margin: 0,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
