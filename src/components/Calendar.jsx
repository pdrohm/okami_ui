import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

const Calendar = ({ setDate, daysWithTraining }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setDate(formattedDate);
  };

  const renderDay = (day, _, DayProps) => {
    const formattedDay = dayjs(day).format("YYYY-MM-DD");
    const hasTraining = daysWithTraining.includes(formattedDay);

    return (
      <div
        {...DayProps}
        style={{
          backgroundColor: hasTraining ? "orange" : "transparent",
          borderRadius: "50%",
          width: hasTraining ? "8px" : "auto",
          height: hasTraining ? "8px" : "auto",
        }}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        className="w-1/2 text-orange"
        renderDay={renderDay}
        slotProps={{
          day: {
            sx: {
              "&.MuiPickersDay-root.Mui-selected": {
                backgroundColor: "orange",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
