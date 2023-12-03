import { Container, TextField, Typography } from "@mui/material";
import ImageUpload from "./ImageUpload";

function Author1() {
  return (
    <>
      <Container sx={{ border: "1px solid black" }}>
        <Typography variant="h5" gutterBottom>
          Author
        </Typography>

        <div>
          <label>Name (optional)</label>
        </div>
        <TextField
          id="outlined-basic"
          placeholder="Name of the Author"
          variant="outlined"
        />
        <div>
          <label>URL (optional)</label>
        </div>
        <TextField
          id="outlined-basic"
          placeholder="Link to webpage"
          variant="outlined"
        />
        <div>
          <ImageUpload />
          <label>Author image (optional)</label>
        </div>
      </Container>
    </>
  );
}
export default Author1;
