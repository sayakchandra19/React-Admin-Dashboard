import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../themes";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        sx={{
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "32px",
          fontWeight: 700,
          padding: "0 12px",
          color: colors.grey[100],
          mb: "5px",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: "16px",
          padding: "15px 12px",
          color: colors.greenAccent[400],
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
