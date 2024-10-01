import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Button, Grid, TextField, Alert, Paper, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TimeSheet = () => {
    const navigate = useNavigate();
    const today = useMemo(() => new Date(), []);
    const [timesheet, setTimesheet] = useState({});
    const [dates, setDates] = useState([]);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

    const getWeekDates = useCallback(() => {
        const currentDay = today.getDay();
        const weekDates = [];
        const startOfWeek = new Date(today.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1)));

        for (let i = 0; i < 5; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            weekDates.push(date);
        }

        return weekDates;
    }, [today]);

    useEffect(() => {
        const weekDates = getWeekDates();
        setDates(weekDates);
        const initialTimesheet = {};
        weekDates.forEach(date => {
            initialTimesheet[date.toLocaleDateString()] = '';
        });
        setTimesheet(initialTimesheet);
    }, [getWeekDates]);

    const handleHoursChange = (date, e) => {
        const { value } = e.target;
        if (value < 0 || value > 24) {
            setError('Please enter valid hours (0-24).');
        } else {
            setError('');
            setTimesheet({ ...timesheet, [date]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(timesheet).every(value => value !== '');

        if (!allFieldsFilled) {
            setError('Please fill in all the hours before submitting.');
        } else {
            setError('');
            console.log('Timesheet Submitted:', timesheet);

            // Display Snackbar message
            setSnackbarMessage('Timesheet submitted successfully!');
            setSnackbarOpen(true);

            // Redirect back to Employee Dashboard after a delay
            setTimeout(() => {
                navigate('/employeedashboard');
            }, 1500); // 1.5 second delay
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Employee Timesheet - Week of {dates.length > 0 && dates[0].toLocaleDateString()}
                </Typography>

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
                                        inputProps={{ step: 0.1, min: 0, max: 24, inputMode: 'numeric' }}
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

            {/* Snackbar for submission message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Adjust position as needed
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TimeSheet;
