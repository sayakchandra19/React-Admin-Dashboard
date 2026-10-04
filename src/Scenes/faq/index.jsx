import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../themes";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ margin: { xs: "12px", sm: "20px" } }}>
      <Header
        title="FAQ"
        subtitle="Frequently Asked Questions"
      />

      {/* Question 1 */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: `${colors.greenAccent[500]} !important`,
              }}
            />
          }
        >
          <Typography
            variant="h5"
            sx={{
              color: `${colors.greenAccent[500]} !important`,
            }}
          >
            An Important Question
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            React is a JavaScript library for building user interfaces.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 2 */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: `${colors.greenAccent[500]} !important`,
              }}
            />
          }
        >
          <Typography
            variant="h5"
            sx={{
              color: `${colors.greenAccent[500]} !important`,
            }}
          >
            Another Important Question
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            React is a JavaScript library for building user interfaces.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 3 */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: `${colors.greenAccent[500]} !important`,
              }}
            />
          }
        >
          <Typography
            variant="h5"
            sx={{
              color: `${colors.greenAccent[500]} !important`,
            }}
          >
            Another Important Question
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            React is a JavaScript library for building user interfaces.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 4 */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: `${colors.greenAccent[500]} !important`,
              }}
            />
          }
        >
          <Typography
            variant="h5"
            sx={{
              color: `${colors.greenAccent[500]} !important`,
            }}
          >
            Another Important Question
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            React is a JavaScript library for building user interfaces.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 5 */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: `${colors.greenAccent[500]} !important`,
              }}
            />
          }
        >
          <Typography
            variant="h5"
            sx={{
              color: `${colors.greenAccent[500]} !important`,
            }}
          >
            Another Important Question
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            React is a JavaScript library for building user interfaces.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Final Question */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: `${colors.greenAccent[500]} !important`,
              }}
            />
          }
        >
          <Typography
            variant="h5"
            sx={{
              color: `${colors.greenAccent[500]} !important`,
            }}
          >
            The Final Question
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            React is a JavaScript library for building user interfaces.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;