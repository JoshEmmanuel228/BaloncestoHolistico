
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = error.statusText || error.data?.message || "Unknown error";
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    gap: 2
                }}
            >
                <Typography variant="h1" component="h1" gutterBottom>
                    Oops!
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                    Sorry, an unexpected error has occurred.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    <i>{errorMessage}</i>
                </Typography>
                <Button variant="contained" component={Link} to="/">
                    Go back to Home
                </Button>
            </Box>
        </Container>
    );
}
