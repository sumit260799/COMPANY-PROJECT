import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ImageUpload from "./ImageUpload";
function FeaturedImage() {
  return (
    <>
      <Container
        sx={{
          border: "1px solid black",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Author
        </Typography>
        <div style={{ position: "relative" }}>
          <Box
            sx={{
              width: 500,
              height: 200,
              backgroundColor: "rgb(42, 42, 42)",
              "&:hover": {
                backgroundColor: "rgb(42, 42, 42)",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <ImageUpload sx={{}} />
          </Box>
          <label>Desktop</label>
          <div>
            <Box
              sx={{
                width: 200,
                height: 200,
                backgroundColor: "rgb(42, 42, 42)",
                marginTop: 10,
                "&:hover": {
                  backgroundColor: "rgb(42, 42, 42)",
                  opacity: [0.9, 0.8, 0.7],
                },
                position: "relative",
              }}
            >
              <ImageUpload
                sx={{
                  width: "100px",
                  height: "100px",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </Box>
          </div>
          <label>Mobile</label>
        </div>
      </Container>
    </>
  );
}
export default FeaturedImage;
