import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../themes";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      sx={{
        padding: { xs: "16px 18px", sm: "20px 24px" },
        boxSizing: "border-box",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: "4px" }}>
            {icon}
          </Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: colors.grey[100],
              fontSize: { xs: "18px", sm: "20px", md: "22px" },
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ ml: 1, flexShrink: 0 }}>
          <ProgressCircle progress={progress} size="40" />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="10px"
        gap="4px"
      >
        <Typography
          variant="h5"
          sx={{
            color: colors.greenAccent[500],
            fontSize: { xs: "12px", sm: "13px", md: "14px" },
            fontWeight: 500,
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{
            color: colors.greenAccent[600],
            fontSize: { xs: "12px", sm: "13px", md: "14px" },
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;