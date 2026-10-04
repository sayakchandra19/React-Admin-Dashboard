import { Box } from "@mui/material";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import { useTheme } from "@mui/material";
import { tokens } from "../../themes";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px" sx={{ m: "20px" }} style={{ margin: "20px" }}>
      <Header title="Geography Chart" subtitle="Simple Geography Chart" />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
        sx={{
          height: "75vh",
          border: `1px solid ${colors.grey[100]}`,
          borderRadius: "4px",
        }}
        style={{
          height: "75vh",
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
