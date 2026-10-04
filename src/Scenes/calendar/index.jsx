import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import { tokens } from "../../themes";
import Header from "../../components/Header";
import { useData } from "../../context/DataContext";
import ConfirmDialog from "../../components/ConfirmDialog";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";

import { formatDate } from "@fullcalendar/core";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { events, addEvent, updateEvent, deleteEvent } = useData();

  // Add / Edit Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    start: "",
    end: "",
    allDay: true,
  });
  const [formError, setFormError] = useState("");

  // Delete Confirm State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Handle date selection on the calendar
  const handleDateSelect = (selected) => {
    setEditingEvent(null);
    setEventForm({
      title: "",
      start: selected.startStr,
      end: selected.endStr || selected.startStr,
      allDay: selected.allDay,
    });
    setFormError("");
    setModalOpen(true);

    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
  };

  // Handle clicking an existing event on the calendar
  const handleEventClick = (selected) => {
    const clickedEvent = events.find(
      (e) => String(e.id) === String(selected.event.id)
    ) || {
      id: selected.event.id,
      title: selected.event.title,
      start: selected.event.startStr,
      end: selected.event.endStr,
      allDay: selected.event.allDay,
    };

    setEditingEvent(clickedEvent);
    setEventForm({
      title: clickedEvent.title || "",
      start: clickedEvent.start || "",
      end: clickedEvent.end || "",
      allDay: clickedEvent.allDay ?? true,
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (!eventForm.title.trim()) {
      setFormError("Event title is required");
      return;
    }

    if (editingEvent) {
      updateEvent(editingEvent.id, {
        title: eventForm.title.trim(),
        start: eventForm.start,
        end: eventForm.end,
        allDay: eventForm.allDay,
      });
    } else {
      addEvent({
        title: eventForm.title.trim(),
        start: eventForm.start,
        end: eventForm.end,
        allDay: eventForm.allDay,
      });
    }
    setModalOpen(false);
  };

  const handleDeleteClick = (evt) => {
    setEventToDelete(evt);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete.id);
      setEventToDelete(null);
      setModalOpen(false);
    }
  };

  return (
    <Box sx={{ margin: "20px" }}>
      {/* ================= HEADER ================= */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Header title="CALENDAR" subtitle="Full Calendar Interactive Page with Local Storage" />
        <Button
          variant="contained"
          startIcon={<EventAvailableIcon />}
          onClick={() => {
            setEditingEvent(null);
            setEventForm({
              title: "",
              start: new Date().toISOString().split("T")[0],
              end: "",
              allDay: true,
            });
            setFormError("");
            setModalOpen(true);
          }}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { backgroundColor: colors.blueAccent[800] },
          }}
        >
          Add Event
        </Button>
      </Box>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          gap: "15px",
          alignItems: "flex-start",
          marginTop: "20px",
        }}
      >
        {/* ================= EVENTS SIDEBAR ================= */}
        <Box
          sx={{
            width: { xs: "100%", md: "25%" },
            minWidth: "220px",
            maxHeight: "75vh",
            overflowY: "auto",
            backgroundColor: colors.primary[400],
            padding: "15px",
            borderRadius: "6px",
            boxSizing: "border-box",
            border: `1px solid ${colors.primary[500]}`,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: colors.grey[100],
              fontSize: "15px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Scheduled Events ({events.length})
          </Typography>

          {events.length === 0 ? (
            <Typography variant="body2" sx={{ color: colors.grey[300], py: 2 }}>
              No calendar events scheduled. Click any date on the calendar to create one.
            </Typography>
          ) : (
            <List sx={{ padding: 0, margin: 0 }}>
              {events.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "8px 0",
                    borderRadius: "4px",
                    padding: "10px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          color: colors.grey[100],
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {event.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          color: colors.grey[100],
                          fontSize: "11px",
                          marginTop: "2px",
                        }}
                      >
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                  <IconButton
                    size="small"
                    title="Delete Event"
                    onClick={() => handleDeleteClick(event)}
                    sx={{ color: colors.grey[100], "&:hover": { color: colors.redAccent[400] } }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* ================= FULL CALENDAR ================= */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            minWidth: 0,
            backgroundColor: colors.primary[400],
            p: 2,
            borderRadius: "6px",
            border: `1px solid ${colors.primary[500]}`,
          }}
        >
          <FullCalendar
            height="72vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />
        </Box>
      </Box>

      {/* Add / Edit Event Dialog */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[400],
            backgroundImage: "none",
            color: colors.grey[100],
            borderRadius: "8px",
            border: `1px solid ${colors.primary[500]}`,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "18px", color: colors.grey[100] }}>
          {editingEvent ? "Edit Calendar Event" : "Create New Event"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Event Title"
            variant="outlined"
            fullWidth
            value={eventForm.title}
            onChange={(e) => {
              setEventForm({ ...eventForm, title: e.target.value });
              setFormError("");
            }}
            error={!!formError}
            helperText={formError}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: colors.grey[100],
                "& fieldset": { borderColor: colors.primary[500] },
              },
              "& .MuiInputLabel-root": { color: colors.grey[300] },
            }}
          />

          <TextField
            label="Date / Start"
            variant="outlined"
            fullWidth
            value={eventForm.start}
            onChange={(e) => setEventForm({ ...eventForm, start: e.target.value })}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: colors.grey[100],
                "& fieldset": { borderColor: colors.primary[500] },
              },
              "& .MuiInputLabel-root": { color: colors.grey[300] },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={eventForm.allDay}
                onChange={(e) =>
                  setEventForm({ ...eventForm, allDay: e.target.checked })
                }
                sx={{ color: colors.greenAccent[400] }}
              />
            }
            label={<Typography color={colors.grey[100]}>All-Day Event</Typography>}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          {editingEvent ? (
            <Button
              color="error"
              onClick={() => handleDeleteClick(editingEvent)}
              sx={{ textTransform: "none" }}
            >
              Delete
            </Button>
          ) : (
            <Box />
          )}

          <Box display="flex" gap={1}>
            <Button
              onClick={() => setModalOpen(false)}
              variant="outlined"
              sx={{ color: colors.grey[100], borderColor: colors.grey[400] }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEvent}
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                fontWeight: 600,
                "&:hover": { backgroundColor: colors.greenAccent[700] },
              }}
            >
              {editingEvent ? "Save" : "Add Event"}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Calendar Event"
        message={`Are you sure you want to remove event "${eventToDelete?.title}"?`}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </Box>
  );
};

export default Calendar;