import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = () => {
  return (
    <Box sx={{ margin: { xs: "12px", sm: "20px" } }}>
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box
        sx={{
          height: { xs: "60vh", sm: "70vh", md: "75vh" },
          width: "100%",
          overflow: "hidden",
        }}
      >
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
