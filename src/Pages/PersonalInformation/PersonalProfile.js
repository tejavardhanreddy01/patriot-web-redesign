import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const PersonalProfile = () => {
    const [userInfo, setUserInfo] = useState({
        PersonalInfo: { UserName: '', Email: '', HomeAddress: '', PhoneNumber: '', GNumber: '' },
        PersonalDetails: { FirstName: '', MiddleName: '', LastName: '', DOB: '', Sex: '', PersonalPronoun: '', GenderId: '' },
        additionalInfo1: { field1: '', field2: '' },
        additionalInfo2: { field1: '', field2: '' },
        additionalInfo3: { field1: '', field2: '' },
        additionalInfo4: { field1: '', field2: '' },
        additionalInfo5: { field1: '', field2: '' },
        additionalInfo6: { field1: '', field2: '' },
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
        setUserInfo((prev) => ({
            ...prev,
            [category]: { ...prev[category], [name]: value },
        }));
    };

    const handleDelete = (category) => {
        setUserInfo((prev) => ({
            ...prev,
            [category]: {},
        }));
    };

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

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>Personal Information</Typography>

            {/* Main Flex Container */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {/* Left Box */}
                <Box sx={{ flex: '1 1 40%', maxWidth: '400px' }}>
                    <Card sx={{ boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'right', justifyContent: 'space-between' }}>

                            <Box sx={{ flex: 1 }}>
                                <Avatar sx={{ marginRight: 2, width: 56, height: 56 }}>
                                    <PersonIcon />
                                </Avatar>
                                <Typography variant="h6">{userInfo.PersonalInfo.Email || 'Not Provided'}</Typography>
                                <br />
                                <Typography><strong>GNumber:</strong> {userInfo.PersonalInfo.GNumber || 'Not Provided'}</Typography>
                                <p>----------------------------------------</p>
                                <Typography><EmailIcon /> {userInfo.PersonalInfo.Email || 'Not Provided'}</Typography>
                                <Typography><HomeIcon /> {userInfo.PersonalInfo.HomeAddress || 'Not Provided'}</Typography>
                                <Typography><PhoneIcon /> {userInfo.PersonalInfo.PhoneNumber || 'Not Provided'}</Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('PersonalInfo')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                                <IconButton onClick={() => handleDelete('PersonalInfo')}>
                                    <DeleteIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Right Side Columns */}
                <Box sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Contact Information */}
                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar sx={{ marginRight: 2, width: 56, height: 56 }}>
                                <PersonIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">Personal Details</Typography>
                                <p>-----------------------------</p>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>First Name:</strong> {userInfo.PersonalDetails.FirstName || 'Not Provided'}</Typography>
                                    <Typography><strong>Middle Name:</strong> {userInfo.PersonalDetails.MiddleName || 'Not Provided'}</Typography>
                                    <Typography><strong>Last Name:</strong> {userInfo.PersonalDetails.LastName || 'Not Provided'}</Typography>
                                    <Typography><strong>Date of Birth:</strong> {userInfo.PersonalDetails.DOB || 'Not Provided'}</Typography>
                                    <Typography><strong>Legal Sex:</strong> {userInfo.PersonalDetails.Sex || 'Not Provided'}</Typography>
                                    <Typography><strong>Personal Pronoun:</strong> {userInfo.PersonalDetails.PersonalPronoun || 'Not Provided'}</Typography>
                                    <Typography><strong>Gender Identification:</strong> {userInfo.PersonalDetails.GenderId || 'Not Provided'}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('PersonalDetails')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                                <IconButton onClick={() => handleDelete('PersonalDetails')}>
                                    <DeleteIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Additional 6 Boxes */}
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <Card key={index} sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Avatar sx={{ marginRight: 2, width: 56, height: 56 }}>
                                    <PersonIcon />
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6"><strong>Additional Info {index}</strong></Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                        <Typography><strong>Field 1:</strong> {userInfo[`additionalInfo${index}`].field1 || 'Not Provided'}</Typography>
                                        <Typography><strong>Field 2:</strong> {userInfo[`additionalInfo${index}`].field2 || 'Not Provided'}</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <IconButton onClick={() => handleOpen(`additionalInfo${index}`)}>
                                        <EditIcon sx={{ color: 'black' }} />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(`additionalInfo${index}`)}>
                                        <DeleteIcon sx={{ color: 'black' }} />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* Dialog for Editing */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {editingCategory}</DialogTitle>
                <DialogContent>
                    {renderFields()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PersonalProfile;
