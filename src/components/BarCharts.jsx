import { ResponsiveBar } from "@nivo/bar";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../themes";
import { mockBarData } from "../data/mockData";
import { useData } from "../context/DataContext";

const BarCharts = ({ isDashboard = false, data: propData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { barData } = useData();

  const chartData = propData || barData || mockBarData;

  if (!chartData || chartData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color={colors.grey[300]}>No bar chart data available</Typography>
      </Box>
    );
  }

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

      keys={["hot dog", "burger", "kebab", "donut"]}

      indexBy="country"

      margin={{
        top: 50,
        right: 130,
        bottom: 50,
        left: 60,
      }}

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
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}

      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}

      enableLabel={false}

      labelSkipWidth={12}
      labelSkipHeight={12}

      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 3,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,

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

      role="application"

      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`
      }
    />
  );
};

export default BarCharts;

