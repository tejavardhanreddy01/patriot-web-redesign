import React, { useState } from "react";
import {
    Box, Typography, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Accordion, AccordionSummary
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//import { Box } from '@mui/material';
const FinancialDashboard = () => {
    const [userInfo, setUserInfo] = useState({

        Offer: { Info: 'No award information is available for this aid year' },
        FinancialAidHistory: { Info: 'There is no award history available.' },
        Resources: { Info: 'No Responses to Questions or Terms and Conditions are found.' },
        Notifications: { Info: 'No Withdrawal Information is found. Please read all Notifications if exist.' },
        SatisfactoryAcademicProgress: { Info: 'xyz' },
        CollegeFinancialPlanning: { Info: 'No information is available for this aid year.' },
    });

    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // const handleOpen = (category) => {
    //     setEditingCategory(category);
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
        setEditingCategory(null);
    };

    const handleSave = () => {
        handleClose();
    };

    const handleChange = (e, category) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [category]: { ...prev[category], [name]: value },
        }));
    };

    // const handleDelete = (category) => {
    //     setUserInfo((prev) => ({
    //         ...prev,
    //         [category]: {},
    //     }));
    // };

    // Function to render all fields in the modal for editing
    const renderFields = () => {
        if (!editingCategory) return null;

        const fields = Object.keys(userInfo[editingCategory]).map((field) => (
            <TextField
                key={field}
                label={field.replace(/([A-Z])/g, ' $1')} // Add spaces between camelCase words
                name={field}
                value={userInfo[editingCategory][field]}
                onChange={(e) => handleChange(e, editingCategory)}
                fullWidth
                margin="normal"
            />
        ));

        return fields;
    };

    /*const FinancialDashboard = () => {
       
    
        return (
           <h1>This is financial Aid Dashboard</h1>
        );
    };
    
    export default FinancialDashboard;*/



    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>Financial Dashboard</Typography>

            {/* Main Flex Container */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {/* Left Box */}
                <Box sx={{ flex: '1 1 40%', maxWidth: '400px' }}>
                    <Card sx={{ boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ display: 'flex' }}>
                            <Box sx={{ flex: 1, alignItems: "center" }}>
                                <Avatar sx={{ width: 60, height: 60, alignItems: "center" }}>
                                    <PersonIcon />
                                </Avatar>
                                <Typography variant="h6">{userInfo.Offer.Info || 'Not Provided'}</Typography>
                                <br />
                                <a href="/personalprofile">
                                    <button> My Profile</button>
                                </a>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Right Side Columns */}
                <Box sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Offer</Typography>
                        </AccordionSummary>

                    </Accordion>

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Financial Aid History</Typography>
                        </AccordionSummary>
                    </Accordion>

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Resources</Typography>
                        </AccordionSummary>
                    </Accordion>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Notifications</Typography>
                        </AccordionSummary>
                    </Accordion>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Satisfactory Academic Progress</Typography>
                        </AccordionSummary>
                    </Accordion>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">College Financial Planning</Typography>
                        </AccordionSummary>
                    </Accordion>


                </Box>
            </Box>

            {/* Edit Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {editingCategory}</DialogTitle>
                <DialogContent>
                    {renderFields()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FinancialDashboard;
