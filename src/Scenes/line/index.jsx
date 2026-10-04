import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = () => {
  return (
    <Box sx={{ margin: { xs: "12px", sm: "20px" } }}>
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box
        sx={{
          height: { xs: "60vh", sm: "70vh", md: "75vh" },
          width: "100%",
          overflow: "hidden",
        }}
      >
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
