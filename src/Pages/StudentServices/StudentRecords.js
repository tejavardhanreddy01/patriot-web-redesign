import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
//import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';

const StudentRecords = () => {
    const [studentInfo, setStudentInfo] = useState({
        personalInfo: { userName: 'John Doe', studentId: '123456', major: 'Computer Science', enrollmentYear: '2021' },
        grades: [
            { course: 'Introduction to Programming', grade: 'A', semester: 'Fall 2023' },
            { course: 'Data Structures', grade: 'A-', semester: 'Spring 2024' },
        ],
        holds: ['Library Fee', 'Tuition Due'],
        expectedGraduationDate: 'May 2025',
        unofficialTranscriptLink: 'link-to-unofficial-transcript.pdf',
        officialTranscriptOrderLink: 'link-to-order-official-transcript',
    });

    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const handleOpen = (category) => {
        setEditingCategory(category);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingCategory(null);
    };

    const handleSave = () => {
        handleClose();
    };

    const handleChange = (e, category) => {
        const { name, value } = e.target;
        setStudentInfo((prev) => ({
            ...prev,
            [category]: { ...prev[category], [name]: value },
        }));
    };

    const renderFields = () => {
        if (!editingCategory) return null;

        const fields = Object.keys(studentInfo[editingCategory]).map((field) => (
            <TextField
                key={field}
                label={field.replace(/([A-Z])/g, ' $1')} // Add spaces between camelCase words
                name={field}
                value={studentInfo[editingCategory][field]}
                onChange={(e) => handleChange(e, editingCategory)}
                fullWidth
                margin="normal"
            />
        ));

        return fields;
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>Student Records</Typography>

            {/* Main Flex Container */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {/* Left Box */}
                <Box sx={{ flex: '1 1 40%', maxWidth: '400px' }}>
                    <Card sx={{ boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ display: 'flex' }}>
                            <Box sx={{ flex: 1, alignItems: "center" }}>
                                <Avatar sx={{ width: 60, height: 60 }}>
                                    <SchoolIcon />
                                </Avatar>
                                <Typography variant="h6">{studentInfo.personalInfo.userName}</Typography>
                                <Typography variant="body2">Student ID: {studentInfo.personalInfo.studentId}</Typography>
                                <Typography variant="body2">Major: {studentInfo.personalInfo.major}</Typography>
                                <Typography variant="body2">Enrollment Year: {studentInfo.personalInfo.enrollmentYear}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Right Side Columns */}
                <Box sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Accordion for Grades */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">View Grades</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                {studentInfo.grades.map((grade, index) => (
                                    <Card key={index} sx={{ boxShadow: 3, p: 2 }}>
                                        <CardContent>
                                            <Typography><strong>{grade.course}</strong></Typography>
                                            <Typography>Grade: {grade.grade}</Typography>
                                            <Typography>Semester: {grade.semester}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion for Holds */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">View Your Holds</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                {studentInfo.holds.length > 0 ? (
                                    studentInfo.holds.map((hold, index) => (
                                        <Typography key={index}><strong>{hold}</strong></Typography>
                                    ))
                                ) : (
                                    <Typography>No holds on your account</Typography>
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion for Graduation Date */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Expected Graduation Date</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{studentInfo.expectedGraduationDate}</Typography>
                            <Button variant="contained" onClick={() => handleOpen('expectedGraduationDate')}>Update Graduation Date</Button>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion for Transcripts */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Transcript Services</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button href={studentInfo.unofficialTranscriptLink} variant="outlined" target="_blank">
                                    View Unofficial Transcript
                                </Button>
                                <Button href={studentInfo.officialTranscriptOrderLink} variant="outlined" target="_blank">
                                    Order Official Transcript
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>

            {/* Edit Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {editingCategory}</DialogTitle>
                <DialogContent>{renderFields()}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentRecords;
