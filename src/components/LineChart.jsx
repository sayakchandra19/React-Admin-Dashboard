import { ResponsiveLine } from "@nivo/line";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../themes";
import { mockLineData } from "../data/mockData";
import { useData } from "../context/DataContext";

const LineChart = ({ isDashboard = false, data: propData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { lineData } = useData();

  const chartData = propData || lineData || mockLineData;

  if (!chartData || chartData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color={colors.grey[300]}>No line chart data available</Typography>
      </Box>
    );
  }

  const margin = isDashboard
    ? { top: 20, right: 15, bottom: 35, left: 35 }
    : isMobile
    ? { top: 25, right: 20, bottom: 65, left: 40 }
    : { top: 45, right: 120, bottom: 55, left: 55 };

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
              fontSize: isMobile ? 10 : 12,
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
              fontSize: isMobile ? 9 : 11,
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
      colors={
        isDashboard
          ? { datum: "color" }
          : { scheme: "nivo" }
      }
      margin={margin}
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
        tickSize: 4,
        tickPadding: 6,
        tickRotation: isMobile ? -30 : 0,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: isMobile ? 45 : 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickValues: isDashboard ? 4 : 5,
        tickSize: 4,
        tickPadding: 6,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: isMobile ? -35 : -45,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={true}
      lineWidth={isDashboard ? 2.5 : 3}
      pointSize={isDashboard ? 6 : 8}
      pointColor={{
        theme: "background",
      }}
      pointBorderWidth={2}
      pointBorderColor={{
        from: "serieColor",
      }}
      enablePointLabel={false}
      useMesh={true}
      legends={
        isDashboard
          ? undefined
          : [
              {
                anchor: isMobile ? "bottom" : "bottom-right",
                direction: isMobile ? "row" : "column",
                justify: false,
                translateX: isMobile ? 0 : 100,
                translateY: isMobile ? 55 : 0,
                itemsSpacing: 4,
                itemDirection: "left-to-right",
                itemWidth: isMobile ? 70 : 80,
                itemHeight: 20,
                itemOpacity: 0.85,
                symbolSize: 12,
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
            ]
      }
    />
  );
};

export default LineChart;