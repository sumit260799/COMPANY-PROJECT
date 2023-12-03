import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card1 from "./Card1";
import Footer1 from "./Footer1";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function ProductDetails() {
  const itemData = [
    {
      img: "https://picsum.photos/seed/picsum/200/300",
      title: "Breakfast",
    },
    {
      img: "https://picsum.photos/200/300/?blur",
      title: "Burger",
    },
    {
      img: "https://picsum.photos/seed/picsum/200/300",
      title: "Camera",
    },
    {
      img: "https://picsum.photos/200/300/?blur",
      title: "Coffee",
    },
    {
      img: "https://picsum.photos/seed/picsum/200/300",
      title: "Hats",
    },
    {
      img: "https://picsum.photos/200/300/?blur",
      title: "Honey",
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1, margin: "15px" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>
              <ImageList
                sx={{ width: 600, height: "80%", marginLeft: "10px" }}
                cols={2}
              >
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=130&h=130&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=130&h=130&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography variant="h6" gutterBottom>
                ASCOT X CHARLIE
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
                Carbon Military
              </Typography>
              <Typography variant="h6" gutterBottom>
                402 USD
              </Typography>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                startIcon={<PaymentsIcon />}
              >
                You will earn 80 USD per sale
              </Typography>
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Remove from shop
              </Button>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                startIcon={<PaymentsIcon />}
              >
                The Soho low-top design is built on a minimalist last with
                curved edges and a high, robust heel cap. The rich black nappa
                upper makes this style an elegant and classy all-rounder that
                pairs well with jeans or chino trousers. Hand-stitched original
                Margom outsoles and full calf-skin lining add our signature
                luxurious touch.
              </Typography>

              <Typography variant="body2" gutterBottom>
                Product Description:-Among design professionals, there's a bit
                of controversy surrounding the filler text. Controversy, as in
                Death to Lorem Ipsum. The strength of lorem ipsum is its
                weakness: it doesn't communicate. To some, designing a website
                around placeholder text is unacceptable, akin to sewing a custom
                suit without taking measurements. Kristina Halvorson notes:
                “I’ve heard the argument that “lorem ipsum” is effective in
                wireframing or design because it helps people focus on the
                actual layout, or color scheme, or whatever. What kills me here
                is that we’re talking about creating a user experience that will
                (whether we like it or not) be DRIVEN by words. The entire
                structure of the page or app flow is FOR THE WORDS.” Lorem ipsum
                is so ubiquitous because it is so versatile. Select how many
                paragraphs you want, copy, paste, and break the lines wherever
                it is convenient. Real copy doesn't work that way. As front-end
                developer Kyle Fiedler put it: “When you are designing with
                Lorem Ipsum, you diminish the importance of the copy by lowering
                it to the same level as any other visual element. The text
                simply becomes another supporting role, serving to make other
                aspects more aesthetic. Instead of your design enhancing the
                meaning of the content, your content is enhancing your design.”
                But despite zealous cries for the demise of lorem ipsum, others,
                such as Karen McGrane, offer appeals for moderation: “Lorem
                Ipsum doesn’t exist because people think the content is
                meaningless window dressing, only there to be decorated by
                designers who can’t be bothered to read. Lorem Ipsum exists
                because words are powerful. If you fill up your page with draft
                copy about your client’s business, they will read it. They will
                comment on it. They will be inexorably drawn to it. Presented
                the wrong way, draft copy can send your design review off the
                rails.” And that’s why a 15th century typesetter might have
                scrambled a passage of Cicero; he wanted people to focus on his
                fonts, to imagine their own content on the pages. He wanted
                people to see, and to get them to see he had to keep them from
                reading.
              </Typography>
              {/* <dl>
                <dt>
                  The Soho low-top design &nbsp is built on a minimalist last
                  with curved edges and a high, robust heel cap. The rich black
                  nappa upper makes this style an elegant and classy all-rounder
                  that pairs well with jeans or chino trousers. Hand-stitched
                  original Margom outsoles and full calf-skin lining add our
                  signature luxurious touch. Product Description - Full leather
                  sneakers in black Italian nappa leather - Soft padding on
                  heel. Full calf skin lining - Hand-stitched outsoles (Strobel
                  construction) - Gold embossing on tongue - Handcrafted in
                  Italy Size Guide Fits true to size, order your normal size. If
                  you wear a half size, we recommend you size down for a perfect
                  fit. EUR 39 40 41 42 43 44 45 46 UK 5.5 6.5 7.5 8 9 9.5 10.5
                  11 Cm 25.9 26.5 27.2 27.8 28.4 29.1 30.2 30.8
                </dt>
              </dl> */}
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Stores selling this product</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>More info</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>About ASCOT X CHARLIE</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Shipping & delivery</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Size & Fit</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Item>
          </Grid>
        </Grid>
        <div>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            More Shoes
          </Typography>
          <div style={{ display: "flex", gap: "20px" }}>
            <Card1 />
            <Card1 />
            <Card1 />
          </div>
          <div>
            <Footer1 />
          </div>
        </div>
      </Box>
    </>
  );
}
export default ProductDetails;
