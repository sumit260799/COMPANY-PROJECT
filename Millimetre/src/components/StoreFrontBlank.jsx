import { Button } from "@mui/material";
import img1 from "../../src/assets/sodapdf-converted-removebg-preview.png";
function StoreFrontBlank() {
  return (
    <div>
      <img
        src={img1}
        height={300}
        width={300}
        style={{ margin: "auto", marginTop: "200px" }}
        alt="Paris"
        className="center"
      />
      {/* <Button variant="contained">Shop Now</Button> */}
    </div>
  );
}

export default StoreFrontBlank;
