import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardContent,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ListAltIcon from '@mui/icons-material/ListAlt';

const ethnicities = [
    'African',
    'African American',
    'Afro-Caribbean',
    'Arab',
    'Asian',
    'South Asian',
    'Southeast Asian',
    'European',
    'Hispanic or Latino',
    'Indigenous or Native American',
    'Pacific Islander',
    'Jewish',
    'Middle Eastern',
    'Mixed or Multiethnic',
    'White or Caucasian'
];

const PersonalProfile = () => {
    const [userInfo, setUserInfo] = useState({
        PersonalInfo: { UserName: '', Email: '', HomeAddress: '', PhoneNumber: '', GNumber: '' },
        PersonalDetails: { FirstName: '', MiddleName: '', LastName: '', DateofBirth: '', Sex: '', PersonalPronoun: '', GenderIdentification: '' },
        Email: { GMUEmail: '', FAFSAParentEmail: '', FAFSAStudentEmail: '', OtherEmail1: '', OtherEmail2: '' },
        PhoneNumber: { phonenum1: '', phonenum2: '', premresphone: '' },
        Address: { PermanentAddress: '' },
        EmergencyContact: { EmergencyCont: '' },
        AdditionalDetails: { EthnicityRace: '', SSN: '', SSNConfirm: '' }
    });

    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [ssnError, setSsnError] = useState('');

    const handleOpen = (category) => {
        setEditingCategory(category);
        setOpen(true);
        setSsnError(''); // Reset SSN error when opening dialog
    };

    const handleClose = () => {
        setOpen(false);
        setEditingCategory(null);
    };

    const handleSave = () => {
        if (editingCategory === 'AdditionalDetails' && userInfo.AdditionalDetails.SSN !== userInfo.AdditionalDetails.SSNConfirm) {
            setSsnError('SSNs do not match. Please enter again.');
            return;
        }
        handleClose();
    };

    const handleChange = (e, category) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [category]: { ...prev[category], [name]: value },
        }));
    };

    const renderFields = () => {
        if (!editingCategory) return null;

        if (editingCategory === 'AdditionalDetails') {
            return (
                <>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Ethnicity</InputLabel>
                        <Select
                            name="EthnicityRace"
                            value={userInfo.AdditionalDetails.EthnicityRace}
                            onChange={(e) => handleChange(e, 'AdditionalDetails')}
                        >
                            {ethnicities.map((ethnicity) => (
                                <MenuItem key={ethnicity} value={ethnicity}>{ethnicity}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                   
                    <TextField
                        label="SSN"
                        name="SSN"
                        type="password" // Hide input with asterisks
                        value={userInfo.AdditionalDetails.SSN}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
                            handleChange({ target: { name: 'SSN', value } }, 'AdditionalDetails');
                        }}
                        fullWidth
                        margin="normal"
                        inputProps={{ maxLength: 11 }} // Limit to 11 digits
                    />
                    <TextField
                        label="Confirm SSN"
                        name="SSNConfirm"
                        type="password" // Hide input with asterisks
                        value={userInfo.AdditionalDetails.SSNConfirm}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
                            handleChange({ target: { name: 'SSNConfirm', value } }, 'AdditionalDetails');
                        }}
                        fullWidth
                        margin="normal"
                        error={!!ssnError}
                        helperText={ssnError}
                        inputProps={{ maxLength: 11 }} // Limit to 11 digits
                    />
                </>
            );
        }

        return Object.keys(userInfo[editingCategory]).map((field) => (
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
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>Personal Information</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Box sx={{ flex: '1 1 40%', maxWidth: '400px' }}>
                    <Card sx={{ boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'right', justifyContent: 'space-between' }}>
                            <Box sx={{ flex: 2 }}>
                                <Avatar sx={{ width: 85, height: 85 }}>
                                    <PersonIcon sx={{ marginRight: 2, width: 50, height: 50, alignItems: 'center' }} />
                                </Avatar>
                                <Typography variant="h6">{userInfo.PersonalInfo.Email || 'Not Provided'}</Typography>
                                <br />
                                <Typography><strong>GNumber:</strong> <br />{userInfo.PersonalInfo.GNumber || 'Not Provided'}</Typography>
                                <p>----------------------------------------</p>
                                <Typography><EmailIcon /> {userInfo.PersonalInfo.Email || 'Not Provided'}</Typography>
                                <Typography><HomeIcon /> {userInfo.PersonalInfo.HomeAddress || 'Not Provided'}</Typography>
                                <Typography><PhoneIcon /> {userInfo.PersonalInfo.PhoneNumber || 'Not Provided'}</Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('PersonalInfo')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar sx={{ marginRight: 2, width: 56, height: 56 }}>
                                <PersonIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Personal Details</strong></Typography>
                                <p>-----------------------------</p>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>First Name:</strong> <br />{userInfo.PersonalDetails.FirstName || 'Not Provided'}</Typography>
                                    <Typography><strong>Middle Name:</strong><br /> {userInfo.PersonalDetails.MiddleName || 'Not Provided'}</Typography>
                                    <Typography><strong>Last Name:</strong><br /> {userInfo.PersonalDetails.LastName || 'Not Provided'}</Typography>
                                    <TextField
                                        label="Date of Birth"
                                        type="date"
                                        name="DateofBirth"
                                        value={userInfo.PersonalDetails.DateofBirth || ''}
                                        onChange={(e) => handleChange(e, 'PersonalDetails')}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <Typography><strong>Legal Sex:</strong><br /> {userInfo.PersonalDetails.Sex || 'Not Provided'}</Typography>
                                    <Typography><strong>Personal Pronoun:</strong> <br />{userInfo.PersonalDetails.PersonalPronoun || 'Not Provided'}</Typography>
                                    <Typography><strong>Gender Identification:</strong><br /> {userInfo.PersonalDetails.GenderIdentification || 'Not Provided'}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('PersonalDetails')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar sx={{ marginRight: 2, width: 56, height: 56 }}>
                                <EmailIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Email</strong></Typography>
                                <p>-----------------------------</p>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>GMU E-mail Address (Preferred)</strong> <br />{userInfo.Email.GMUEmail || 'Not Provided'} <br /><strong>(Not Updateable)</strong></Typography>
                                    <Typography><strong>Financial Aid Parent E-mail Address</strong><br /> {userInfo.Email.FAFSAParentEmail || 'Not Provided'}<br /><strong>(Not Updateable)</strong></Typography>
                                    <Typography><strong>Financial Aid Student E-mail Address</strong><br /> {userInfo.Email.FAFSAStudentEmail || 'Not Provided'}<br /><strong>(Not Updateable)</strong></Typography>
                                    <Typography><strong>Other E-mail Address</strong> <br />{userInfo.Email.OtherEmail1 || 'Not Provided'}</Typography>
                                    <Typography><strong>Other E-mail Address</strong><br /> {userInfo.Email.OtherEmail2 || 'Not Provided'}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('Email')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Updated Additional Details Card */}
                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar sx={{ marginRight: 2, width: 56, height: 56 }}>
                                <ListAltIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Additional Details</strong></Typography>
                                <p>-----------------------------</p>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>Ethnicity:</strong> <br />{userInfo.AdditionalDetails.EthnicityRace || 'Not Provided'}</Typography>
                                    <Typography><strong>SSN:</strong> <br />{userInfo.AdditionalDetails.SSN ? '*********' : 'Not Provided'}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('AdditionalDetails')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {editingCategory}</DialogTitle>
                <DialogContent>{renderFields()}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PersonalProfile;
