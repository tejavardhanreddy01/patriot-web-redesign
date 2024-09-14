import * as React from 'react';
import { useState, useEffect } from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import { Link } from "@mui/material";
import useContentful from './contentful/useContentful';

const Cards = ({ categories }) => {

    return (
        <div>
            <Card
                // data-resizable
                sx={{
                    width: 250,
                    height: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    alignItems: 'center',
                    width: 343,
                    // to make the demo resizable
                    overflow: 'hidden',
                    '--icon-size': '100px',
                }} >
                <CardOverflow variant="solid" color="success">
                    <AspectRatio
                        variant="outlined"
                        color="warning"
                        ratio="1"
                        sx={{
                            m: 'auto',
                            transform: 'translateY(50%)',
                            borderRadius: '50%',
                            width: 'var(--icon-size)',
                            boxShadow: 'sm',
                            bgcolor: 'background.surface',
                            position: 'relative',
                        }}    >
                        <div>
                            <Avatar src={categories.avatar.file.url} sx={{ '--Avatar-size': '6rem' }} />
                        </div>
                    </AspectRatio>
                </CardOverflow>
                <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>

                    <Link href={categories.url} >
                        <Button variant="outlined" sx={{ backgroundColor: 'gold', color: 'black', '&:hover': { backgroundColor: 'darkgoldenrod' } }}>
                            {categories.name}
                        </Button>
                    </Link>


                </Typography>
                <CardContent sx={{ maxWidth: '40ch' }}>
                    <div>
                        {categories.description.split('\n').map((listItem, idx) => (
                            <li key={idx}>{listItem.trim()}</li>

                        ))}
                    </div>

                </CardContent>
                <CardActions
                    orientation="vertical"
                    buttonFlex={1}
                    sx={{
                        '--Button-radius': '40px',
                        width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                    }} >
                </CardActions>

            </Card>

        </div >
    );
}

export default Cards;


// import styled from "styled-components";

// const AuthorCard = ({ categories }) => {
//     return (
//         <Wrapper background={categories.avatar.file.url}>
//             <TextContainer>
//                 <Title>{categories.name}</Title>
//                 <Subtitle>{categories.description}</Subtitle>
//             </TextContainer>
//         </Wrapper>
//     );
// };

// export default AuthorCard;

// const Wrapper = styled.div`
//   display: grid;
//   align-items: flex-end;
//   width: 240px;
//   height: 240px;
//   border-radius: 20px;
//   box-shadow: 0px 20px 40px rgba(52, 53, 99, 0.2),
//     0px 1px 3px rgba(0, 0, 0, 0.05);
//   background: ${(props) =>
//         props.background && `url(${props.background}) center no-repeat`};
//   background-size: auto 150%;
// `;

// const TextContainer = styled.div`
//   cursor: pointer;
//   display: grid;
//   background: rgba(255, 255, 255, 0.3);
//   padding: 20px;
//   gap: 10px;
//   width: 100%;

//   :hover {
//     height: fit-content;
//     width: auto;

//     p:last-child {
//       visibility: visible;
//       display: block;
//     }
//   }
// `;

// const Title = styled.p`
//   font-style: normal;
//   font-weight: 500;
//   font-size: 20px;
//   margin: 0;
//   font-weight: bold;
//   color: #000000;
//   margin: 0px;
// `;

// const Subtitle = styled.p`
//   font-weight: normal;
//   font-size: 12px;
//   font-style: italic;
//   color: rgba(0, 0, 0, 0.7);
//   margin: 0px;
//   visibility: hidden;
//   display: none;
// `;
