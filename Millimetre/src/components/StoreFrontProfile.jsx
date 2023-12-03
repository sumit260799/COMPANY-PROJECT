import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Grid, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function StoreFrontProfile() {
  const [value, setValue] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  const getButtonStyle = (gender) => ({
    backgroundColor: selectedGender === gender ? "#000" : "#fff",
    color: selectedGender === gender ? "#fff" : "#000",
  });
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState("");

  return (
    <>
      <Box sx={{ marginTop: "100px" }}>
        <Box sx={{ width: "50%", margin: "auto" }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <Stack direction="row" alignItems="center" spacing={2} marginTop={2}>
            <Button variant="outlined" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <Button variant="contained">Save</Button>
          </Stack>
        </Box>
        <Box sx={{ width: "50%", margin: "auto" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={10}>
              <label>Your Full Name</label>
              <TextField
                id="outlined-multiline-flexible"
                placeholder="Full Name"
                fullWidth
                value={fullName}
              />
            </Grid>
            <Grid item xs={10}>
              <label>Your Phone Number</label>

              <TextField
                id="outlined-multiline-flexible"
                placeholder="Phone Number"
                fullWidth
                value={phoneNumber}
              />
            </Grid>
            <Grid item xs={10}>
              <label>Your Email</label>
              <TextField
                id="outlined-multiline-flexible"
                placeholder="Email"
                fullWidth
                value={email}
              />
            </Grid>
            <Grid item xs={10}>
              <label>Date of birth</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={value}
                  sx={{ width: "100%" }}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={10}>
              <label>Gender</label>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  onClick={() => handleGenderClick("male")}
                  sx={getButtonStyle("male")}
                >
                  Male
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleGenderClick("female")}
                  sx={getButtonStyle("female")}
                >
                  Female
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleGenderClick("other")}
                  sx={getButtonStyle("other")}
                >
                  Other
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Button sx={{ margin: "2%", marginLeft: "0%" }} variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default StoreFrontProfile;
