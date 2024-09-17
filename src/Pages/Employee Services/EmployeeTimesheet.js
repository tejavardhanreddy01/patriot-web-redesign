import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

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
        // You can handle submission to a backend here
    };

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Employee Timesheet - {today.toLocaleString('default', { month: 'long' })} {year}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {daysInMonth.map((dateObj) => {
                        const dateStr = dateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                        return (
                            <Grid item xs={6} sm={4} md={3} key={dateStr}>
                                <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                                    <Typography variant="body1">
                                        {dateObj.toLocaleDateString('default', { day: 'numeric', weekday: 'short' })}
                                    </Typography>
                                    <TextField
                                        type="number"
                                        label="Hours"
                                        inputProps={{ min: 0, max: 24 }}
                                        value={timesheet[dateStr] || ''}
                                        onChange={(e) => handleHoursChange(dateStr, e)}
                                        fullWidth
                                    />
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
                <Button type="submit" variant="contained" sx={{ marginTop: 3, backgroundColor: '#000', color: '#fff' }}>
                    Submit Timesheet
                </Button>
            </form>
        </Box>
    );
};

export default TimeSheet;
