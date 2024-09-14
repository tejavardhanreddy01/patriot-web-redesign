import React, { useEffect, useState } from "react";
import RegistrationCard from "../../components/Registration/RegistrationCard";
import useContentful from "../../components/contentful/useContentful";
import { Box } from '@mui/material';

const Registration = () => {
    const [registerOption, setRegisterOption] = useState([]);
    const { getRegistration } = useContentful();

    useEffect(() => {
        getRegistration().then((response) => setRegisterOption(response));
    }, []);

    return (
        <Box
            display="flex"                // Use flexbox for layout
            flexDirection="column"        // Arrange items in a column
            // Center horizontally
            justifyContent="center"       // Center vertically
            minHeight="100vh"             // Full viewport height
            p={2}                         // Padding around the container
            sx={{
                overflow: 'hidden',        // Prevent container scrolling
                maxWidth: '100%',          // Ensure container does not exceed screen width
                boxSizing: 'border-box',   // Include padding in the element's total width and height
            }}
        >
            <Box
                display="flex"            // Use flexbox for the cards container
                flexDirection="row"       // Arrange cards in a row
                flexWrap="wrap"           // Allow wrapping if needed
                justifyContent="center"   // Center cards horizontally
                gap={2}                   // Space between cards
            >
                {registerOption.map((registration, index) => (
                    <RegistrationCard key={index} registration={registration} />
                ))}
            </Box>
        </Box>
    );
};

export default Registration;
