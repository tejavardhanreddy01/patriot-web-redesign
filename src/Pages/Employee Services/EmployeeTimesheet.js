import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Helper function to get the days in a month
const getDaysInMonth = (year, month) => {
    return new Array(31).fill('').map((_, i) => {
        const date = new Date(year, month, i + 1);
        if (date.getMonth() === month) {
            return date;
        }
        return null;
    }).filter(Boolean);
};

const TimeSheet = () => {
    const today = new Date();
    const [year] = useState(today.getFullYear());
    const [month] = useState(today.getMonth());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [timesheet, setTimesheet] = useState({});

    // Generate days for the current month and year on component load
    useEffect(() => {
        setDaysInMonth(getDaysInMonth(year, month));
    }, [year, month]);

    // Handle input for working hours
    const handleHoursChange = (date, e) => {
        const newTimesheet = { ...timesheet, [date]: e.target.value };
        setTimesheet(newTimesheet);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Timesheet Submitted:', timesheet);
        alert('Timesheet Submitted Successfully!');
    };

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Employee Timesheet - {today.toLocaleString('default', { month: 'long' })} {year}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><strong>Date</strong></TableCell>
                                <TableCell align="center"><strong>Day</strong></TableCell>
                                <TableCell align="center"><strong>Hours Worked</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {daysInMonth.map((dateObj) => {
                                const dateStr = dateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                                return (
                                    <TableRow key={dateStr}>
                                        <TableCell align="center">
                                            {dateObj.toLocaleDateString('default', { day: 'numeric', month: 'numeric' })}
                                        </TableCell>
                                        <TableCell align="center">
                                            {dateObj.toLocaleDateString('default', { weekday: 'short' })}
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                type="number"
                                                label="Hours"
                                                inputProps={{ min: 0, max: 24 }}
                                                value={timesheet[dateStr] || ''}
                                                onChange={(e) => handleHoursChange(dateStr, e)}
                                                size="small"
                                                variant="outlined"
                                                sx={{ width: 60 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button type="submit" variant="contained" sx={{ marginTop: 3, backgroundColor: '#007BFF', color: '#fff' }}>
                    Submit Timesheet
                </Button>
            </form>
        </Box>
    );
};

export default TimeSheet;
