import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarCharts from "../../components/BarCharts";

const Bar = () => {
  return (
    <Box sx={{ margin: { xs: "12px", sm: "20px" } }}>
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box
        sx={{
          height: { xs: "60vh", sm: "70vh", md: "75vh" },
          width: "100%",
          overflow: "hidden",
        }}
      >
        <BarCharts />
      </Box>
    </Box>
  );
};

export default Bar;
