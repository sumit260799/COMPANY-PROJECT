import { Avatar, Box, Typography } from "@mui/material";
import StoreFrontImageList from "./StoreFrontImageList";

function StoreFontProduct() {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 45, height: 45 }}
        />
        <Typography variant="body2">Suman /</Typography>
      </Box>
      <Box margin={10}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Suman
        </Typography>
        {/* <Typography variant="body2">1999suman</Typography> */}
      </Box>
    </>
  );
}

export default StoreFontProduct;
