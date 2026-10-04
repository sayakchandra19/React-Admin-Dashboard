import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import NotificationSnackbar from "./components/NotificationSnackbar";

import Topbar from "./Scenes/dashboard/global/Topbar";
import Sidebar from "./Scenes/dashboard/global/Sidebar";
import Dashboard from "./Scenes/dashboard";
import Team from "./Scenes/team";
import Contacts from "./Scenes/contacts";
import Invoices from "./Scenes/invoices";
import Form from "./Scenes/form";
import Calendar from "./Scenes/calendar";
import FAQ from "./Scenes/faq";
import Bar from "./Scenes/bar";
import Pie from "./Scenes/pie";
import Line from "./Scenes/line";
import Geography from "./Scenes/Geography";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataProvider>
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/form" element={<Form />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
          <NotificationSnackbar />
        </DataProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
