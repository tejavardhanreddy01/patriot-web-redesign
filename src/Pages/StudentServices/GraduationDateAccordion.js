import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, TextField, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

function GraduationDateAccordion({ studentInfo, updateGraduationDate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date(studentInfo.expectedGraduationDate).toLocaleString('default', { month: 'long' }));
  const [selectedYear, setSelectedYear] = useState(new Date(studentInfo.expectedGraduationDate).getFullYear());

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedDate = new Date(`${selectedMonth} 1, ${selectedYear}`);
    updateGraduationDate(updatedDate.toISOString().slice(0, 7)); // YYYY-MM format
    setIsEditing(false); // Exit edit mode
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Expected Graduation Date</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isEditing ? (
          <>
            <TextField
              select
              label="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ marginRight: '10px' }}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              onClick={handleSaveClick}
              style={{ marginLeft: '10px' }}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Typography>
              {new Date(studentInfo.expectedGraduationDate).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Typography>
            <Button
              variant="contained"
              onClick={handleEditClick}
              style={{ marginLeft: '10px' }}
            >
              Update Graduation Date
            </Button>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default GraduationDateAccordion;
