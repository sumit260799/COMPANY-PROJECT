import { Typography } from "@mui/joy";
import Button from "@mui/material/Button";
function MyOrder() {
  return (
    <>
      <article className="flex flex-col gap-1 w-[90%] p-2 mx-auto  mt-[5rem]">
        <Typography variant="h4" className="text-[2rem] text-zinc-600">
          Latest orders
        </Typography>
        <div className=" border-2 p-5  ">
          <div>
            <Typography variant="h5">Payouts</Typography>
            <Button
              variant="outlined"
              style={{
                display: "flex",
                float: "right",
                marginTop: "-30px",
                color: "black",
              }}
            >
              Export as CSV
            </Button>
          </div>
          <div style={{ textAlign: "center", margin: "20px" }}>
            <Typography variant="body1">
              <p>No data to be shown yet</p>
            </Typography>
          </div>
        </div>
      </article>
    </>
  );
}
export default MyOrder;
