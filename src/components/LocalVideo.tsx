import { Box, Card, CardContent, Typography } from "@mui/material";

interface LocalVideoProps {
    src: string;
    title: string;
    description: string;
}

const LocalVideo = ({ src, title, description }: LocalVideoProps) => {
    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Box sx={{ width: '100%', mb: 2 }}>
                    <video
                        controls
                        style={{
                            width: "100%",
                            borderRadius: "4px",
                            maxHeight: "500px",
                            backgroundColor: "#000" // Fondo negro para archivos de solo audio
                        }}
                    >
                        <source src={`/static${src}`} type="video/mp4" />
                        <source src={`/static${src}`} type="audio/mp4" />
                        Tu navegador no soporta el elemento de video/audio.
                    </video>
                </Box>
                <Typography variant="h6" sx={{ mt: 1 }}>
                    {title}
                </Typography>
                <Typography color="text.secondary">{description}</Typography>
            </CardContent>
        </Card>
    );
};

export default LocalVideo;
