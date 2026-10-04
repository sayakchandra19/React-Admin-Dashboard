import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarCharts from "../../components/BarCharts";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh" sx={{ height: "75vh", width: "100%" }} style={{ height: "75vh", width: "100%" }}>
        <BarCharts />
      </Box>
    </Box>
  );
};

export default Bar;
