import { ResponsiveBar } from "@nivo/bar";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../themes";
import { mockBarData } from "../data/mockData";
import { useData } from "../context/DataContext";

const BarCharts = ({ isDashboard = false, data: propData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { barData } = useData();

  const chartData = propData || barData || mockBarData;

  if (!chartData || chartData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color={colors.grey[300]}>No bar chart data available</Typography>
      </Box>
    );
  }

  const margin = isDashboard
    ? { top: 20, right: 15, bottom: 35, left: 35 }
    : isMobile
    ? { top: 30, right: 20, bottom: 65, left: 40 }
    : { top: 50, right: 120, bottom: 50, left: 55 };

  return (
    <ResponsiveBar
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
      keys={["hot dog", "burger", "kebab", "donut"]}
      indexBy="country"
      margin={margin}
      padding={0.3}
      valueScale={{
        type: "linear",
      }}
      indexScale={{
        type: "band",
        round: true,
      }}
      colors={{
        scheme: "nivo",
      }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 4,
        tickPadding: 5,
        tickRotation: isMobile ? -30 : 0,
        legend: isDashboard ? undefined : "country",
        legendPosition: "middle",
        legendOffset: isMobile ? 45 : 36,
      }}
      axisLeft={{
        tickSize: 4,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food",
        legendPosition: "middle",
        legendOffset: isMobile ? -35 : -45,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      legends={
        isDashboard
          ? undefined
          : [
              {
                dataFrom: "keys",
                anchor: isMobile ? "bottom" : "bottom-right",
                direction: isMobile ? "row" : "column",
                justify: false,
                translateX: isMobile ? 0 : 110,
                translateY: isMobile ? 55 : 0,
                itemsSpacing: 3,
                itemWidth: isMobile ? 70 : 90,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 14,
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
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`
      }
    />
  );
};

export default BarCharts;
