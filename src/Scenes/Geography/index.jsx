import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import { tokens } from "../../themes";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ margin: { xs: "12px", sm: "20px" } }}>
      <Header title="Geography Chart" subtitle="Simple Geography Chart" />
      <Box
        sx={{
          height: { xs: "60vh", sm: "70vh", md: "75vh" },
          width: "100%",
          overflow: "hidden",
          border: `1px solid ${colors.grey[100]}`,
          borderRadius: "4px",
        }}
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
