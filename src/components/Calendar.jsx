import React, { useContext, useEffect } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useState } from "react";

const Calendar = ({ setDate }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const handleDateChange = (date) => {
    setSelectedDate(date);

    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setDate(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        className="w-1/2 text-orange"
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
