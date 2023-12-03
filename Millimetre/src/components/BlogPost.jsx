import SEO from "./SEO";
import TitleAndContent from "./TitleAndContent";
import Author1 from "./Author1";
import Status from "./Status";
import FeaturedImage from "./FeaturedImage";
import Payouts from "./Payouts";
import BrandsCard from "./BrandsCard";
import CardProd from "./CardProd";
import { Box } from "@mui/material";
import BrandsDetails from "./BrandsDetails";

function BlogPost() {
  return (
    <>
      {/* <TitleAndContent /> */}
      {/* <div style={{ marginTop: "10px" }}>
        <SEO />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Author1 />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Status />
      </div>
      <div style={{ marginTop: "10px" }}>
        <FeaturedImage />
      </div> */}
      {/* <div style={{margin:"10px"}}>
        <Payouts />
      </div> */}
      {/* <div>
        <BrandsCard />
        <BrandsCard />
        <BrandsCard />
      </div> */}

      <BrandsDetails />
      {/* <div style={{ margin: "100px" }}>
        <CardProd />
      </div>
      <div style={{ margin: "100px" }}>
        <CardProd />
      </div> */}
    </>
  );
}
export default BlogPost;
