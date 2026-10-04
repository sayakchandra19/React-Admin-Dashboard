import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../themes";
import { mockPieData } from "../data/mockData";
import { useData } from "../context/DataContext";

const PieChart = ({ data: propData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { pieData } = useData();

  const chartData = propData || pieData || mockPieData;

  if (!chartData || chartData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color={colors.grey[300]}>No pie chart data available</Typography>
      </Box>
    );
  }

  const margin = isMobile
    ? { top: 25, right: 25, bottom: 65, left: 25 }
    : { top: 40, right: 80, bottom: 80, left: 80 };

  return (
    <ResponsivePie
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            fontSize: isMobile ? 10 : 12,
          },
        },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
            fontSize: 12,
            borderRadius: 4,
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          },
        },
      }}
      margin={margin}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: isMobile ? 50 : 56,
          itemsSpacing: 0,
          itemWidth: isMobile ? 65 : 85,
          itemHeight: 18,
          itemTextColor: colors.grey[100],
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: isMobile ? 12 : 16,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.greenAccent[400],
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
