import { ResponsiveLine } from "@nivo/line";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../themes";
import { mockLineData } from "../data/mockData";
import { useData } from "../context/DataContext";

const LineChart = ({ isDashboard = false, data: propData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lineData } = useData();

  const chartData = propData || lineData || mockLineData;

  if (!chartData || chartData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color={colors.grey[300]}>No line chart data available</Typography>
      </Box>
    );
  }

  return (
    <ResponsiveLine
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
          },
        },
      }}

      colors={
        isDashboard
          ? { datum: "color" }
          : { scheme: "nivo" }
      }

      margin={{
        top: 50,
        right: 160,
        bottom: 100,
        left: 80,
      }}

      xScale={{
        type: "point",
      }}

      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: false,
        reverse: false,
      }}

      yFormat=" >-.2f"

      curve="monotoneX"

      axisTop={null}
      axisRight={null}

      axisBottom={{
        tickSize: 5,
        tickPadding: 10,
        tickRotation: -30,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: 75,
        legendPosition: "middle",
      }}

      axisLeft={{
        tickValues: 5,
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: -60,
        legendPosition: "middle",
      }}

      enableGridX={false}
      enableGridY={true}

      lineWidth={3}

      pointSize={9}

      pointColor={{
        theme: "background",
      }}

      pointBorderWidth={2}

      pointBorderColor={{
        from: "serieColor",
      }}

      enablePointLabel={false}

      useMesh={true}

      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,

          translateX: 130,
          translateY: 0,

          itemsSpacing: 10,

          itemDirection: "left-to-right",
          itemWidth: 90,
          itemHeight: 24,

          itemOpacity: 0.85,

          symbolSize: 14,
          symbolShape: "circle",

          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;