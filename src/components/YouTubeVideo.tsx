import { Box, Card, CardContent, Typography } from "@mui/material";

interface YouTubeVideoProps {
  id: string;
  title: string;
  description: string;
}

const YouTubeVideo = ({ id, title, description }: YouTubeVideoProps) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default YouTubeVideo; 