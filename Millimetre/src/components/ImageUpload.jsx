import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import upload from "./../assets/upload-icon.png";

function ImageUpload() {
  return (
    <>
      <Container maxWidth="sx">
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <img src={upload} srcSet={upload} loading="lazy" />
          </IconButton>
        </Stack>
      </Container>
    </>
  );
}
export default ImageUpload;
