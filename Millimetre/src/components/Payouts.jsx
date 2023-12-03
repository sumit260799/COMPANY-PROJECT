import { Typography } from "@mui/material";

function Payouts() {
  return (
    <article className="flex flex-col gap-1 w-[90%] p-2 mx-auto  mt-[5rem]">
      <Typography variant="h4" className="text-[2rem] text-zinc-600">
        Payouts
      </Typography>
      <div className=" border-2 p-5  ">
        <Typography variant="h5">Payouts</Typography>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <Typography variant="body1">No payments yet.</Typography>
          <Typography variant="body1">
            Payments can take between 5-7 business days to arrive in your
            account before being paid out.
          </Typography>
        </div>
      </div>
    </article>
  );
}
export default Payouts;
