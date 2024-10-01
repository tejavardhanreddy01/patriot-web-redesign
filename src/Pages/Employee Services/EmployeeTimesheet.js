import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, Alert, Paper } from '@mui/material';

const TimeSheet = () => {
    const today = new Date();
    const [timesheet, setTimesheet] = useState({});
    const [dates, setDates] = useState([]);
    const [error, setError] = useState('');

    // Function to get the current week's dates (Monday to Friday)
    const getWeekDates = () => {
        const currentDay = today.getDay();
        const weekDates = [];

        // Find Monday of the current week (ISO Standard, Monday = 1)
        const startOfWeek = new Date(today.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1)));
        
        for (let i = 0; i < 5; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            weekDates.push(date);
        }
        
        return weekDates;
    };

    // Update dates for the timesheet on component mount
    useEffect(() => {
        const weekDates = getWeekDates();
        setDates(weekDates);

        // Initialize the timesheet state with empty values
        const initialTimesheet = {};
        weekDates.forEach(date => {
            initialTimesheet[date.toLocaleDateString()] = '';
        });
        setTimesheet(initialTimesheet);
    }, []);

    // Handle input for working hours
    const handleHoursChange = (date, e) => {
        const { value } = e.target;
        if (value < 0 || value > 24) {
            setError('Please enter valid hours (0-24).');
        } else {
            setError('');
            setTimesheet({ ...timesheet, [date]: value });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        const allFieldsFilled = Object.values(timesheet).every(value => value !== '');

        if (!allFieldsFilled) {
            setError('Please fill in all the hours before submitting.');
        } else {
            setError('');
            console.log('Timesheet Submitted:', timesheet);
            alert('Timesheet submitted successfully!');
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Employee Timesheet - Week of {dates.length > 0 && dates[0].toLocaleDateString()}
                </Typography>

                {/* Display any error messages */}
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {dates.map((date) => (
                            <Grid item xs={12} sm={6} key={date.toLocaleDateString()}>
                                <Paper elevation={1} sx={{ padding: 2, borderRadius: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                        {date.toLocaleDateString()}
                                    </Typography>
                                    <TextField
                                        type="number"
                                        label="Hours"
                                        inputProps={{ step: 0.1, min: 0, max: 24, inputMode: 'numeric' }} // Remove up/down arrows
                                        value={timesheet[date.toLocaleDateString()] || ''}
                                        onChange={(e) => handleHoursChange(date.toLocaleDateString(), e)}
                                        fullWidth
                                        variant="outlined"
                                        sx={{ marginBottom: 2 }}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 3, backgroundColor: '#1976d2', color: '#fff', padding: '10px 20px' }}
                    >
                        Submit Timesheet
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default TimeSheet;
