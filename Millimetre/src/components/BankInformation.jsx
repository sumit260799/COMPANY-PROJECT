import TextField from "@mui/material/TextField";
//import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

function BankInformation() {
  const Country = [
    { name: "Afghanistan", value: 1 },
    { name: "Australia", value: 2 },
    { name: "Azerbaijan", value: 3 },
    { name: "Bangladesh", value: 4 },
    { name: "Brazil", value: 5 },
    { name: "India", value: 5 },
  ];
  const PayMethod = [
    { name: "Private Person", id: 1 },
    { name: "Solo Trader(Enskild firma)", id: 2 },
    { name: "Private Company(Aktiebolag)", id: 3 },
  ];
  return (
    <>
      <h2>Add your payout information</h2>
      <label>Your personal info</label>
      <div style={{ marginTop: "10px" }}>
        <TextField
          label="Full Name"
          color="secondary"
          focused
          style={{ width: "500px" }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          label="Phone Number"
          color="secondary"
          focused
          style={{ width: "500px" }}
        />
      </div>
      <label>Country</label>
      <div style={{ marginTop: "10px" }}>
        <TextField
          label="Select Your Country"
          select
          color="secondary"
          focused
          style={{ width: "500px" }}
        >
          {Country.map((option) => (
            <MenuItem key={option.value} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <label>Payout Method</label>
      <div style={{ marginTop: "10px" }}>
        <TextField
          label="Payout Method"
          select
          color="secondary"
          focused
          style={{ width: "500px" }}
        >
          {PayMethod.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <Button variant="contained" style={{ marginTop: "10px" }}>
        Save
      </Button>
    </>
  );
}
export default BankInformation;
