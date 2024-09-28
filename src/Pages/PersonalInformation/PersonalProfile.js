import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";


const PersonalProfile = () => {
    const [userInfo, setUserInfo] = useState({
        PersonalInfo: { UserName: '', Email: '', HomeAddress: '', PhoneNumber: '', GNumber: '' },
        PersonalDetails: { FirstName: '', MiddleName: '', LastName: '', DateofBirth: '', Sex: '', PersonalPronoun: '', GenderIdentification: '' },
        Email: { GMUEmail: '', FAFSAParentEmail: '', FAFSAStudentEmail: '', OtherEmail1: '', OtherEmail2: '' },
        PhoneNumber: { phonenum1: '', phonenum2: '', premresphone: '' },
        Address: { PermanentAddress: '' },
        EmergencyContact: { EmergencyCont: '' },
        AdditionalDetails: { EthnicityRace: '', VeteranClass: '', DisabilityStatus: '' }
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

    const isLetterOnly = (value) => /^[a-zA-Z\s]*$/.test(value);
    const isIntegerOnly = (value) => /^\d*$/.test(value);



    const handleChange = (e, category) => {
        const { name, value } = e.target;
        // Determine the field type based on the category
        let isValid = true;

        switch (name) {
            case 'FirstName':
            case 'MiddleName':
            case 'LastName':
            case 'UserName':
            case 'Email':
            case 'HomeAddress':
            case 'PersonalPronoun':
            case 'Sex':
            case 'GenderIdentification':
                isValid = isLetterOnly(value);
                break;
            case 'PhoneNumber':
            case 'GNumber':
            case 'phonenum1':
            case 'phonenum2':
            case 'premresphone':
                isValid = isIntegerOnly(value);
                break;
            case 'DateofBirth':
                // You can add any date validation here if needed
                isValid = true; // Allow any input for now
                break;
            default:
                break;
        }


        // Update state only if valid
        if (isValid) {


            setUserInfo((prev) => ({
                ...prev,
                [category]: { ...prev[category], [name]: value },
            }));
        }
    };

    const handleDelete = (category) => {
        setUserInfo((prev) => ({
            ...prev,
            [category]: {},
        }));
    };

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

                {/* Right Side Columns */}
                <Box sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Contact Information */}
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
                                    {/* Date of Birth as a Date Picker */}
                                    <TextField
                                        label="Date of Birth"
                                        type="date"
                                        name="Date of Birth"
                                        value={userInfo.PersonalDetails.DOB || ''}
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
                                {/* <IconButton onClick={() => handleDelete('PersonalDetails')}>
                                    <DeleteIcon sx={{ color: 'black' }} />
                                </IconButton> */}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Additional Information Card */}
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

                                    <Typography><strong>Financial Aid Parent E-mail Address</strong><br /> {userInfo.Email.FAFSAStudentEmail || 'Not Provided'}<br /><strong>(Not Updateable)</strong></Typography>
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
                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar sx={{ marginRight: 2, width: 56, height: 56 }}>
                                <PhoneIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Phone Number</strong></Typography>
                                <p>-----------------------------</p>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>Cellular Phone Number</strong> <br />{userInfo.PhoneNumber.phonenum1 || 'Not Provided'}</Typography>
                                    <Typography><strong>Cellular Phone Number</strong><br /> {userInfo.PhoneNumber.phonenum2 || 'Not Provided'}</Typography>
                                    <Typography><strong>Perm Residence Phone Number (Primary)</strong><br /> {userInfo.PhoneNumber.premresphone || 'Not Provided'}</Typography>

                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('PhoneNumber')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>

                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar sx={{ marginRight: 2, width: 56, height: 56 }}>
                                <HomeIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Address</strong></Typography>
                                <p>-----------------------------</p>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>Permanent Residence</strong> <br />{userInfo.Address.PermanentAddress || 'Not Provided'}</Typography>

                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('Address')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>

                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar sx={{ marginRight: 2, width: 56, height: 56 }}>
                                <PhoneIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Emergency Contact</strong></Typography>
                                <p>-----------------------------</p>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong></strong> {userInfo.EmergencyContact.EmergencyCont || 'Not Provided'}</Typography>

                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('EmergencyContact')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>

                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Additional Details</strong></Typography>
                                <p>-----------------------------</p>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>Ethnicity and Race</strong> <br />{userInfo.AdditionalDetails.EthnicityRace || 'Not Provided'}</Typography>
                                    <Typography><strong>Veteran Classification</strong><br /> {userInfo.AdditionalDetails.VeteranClass || 'Not Provided'}</Typography>
                                    <Typography><strong>Disability Status</strong><br /> {userInfo.AdditionalDetails.DisabilityStatus || 'Not Provided'}</Typography>
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
