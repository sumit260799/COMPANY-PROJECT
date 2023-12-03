import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <NotificationsNoneOutlinedIcon
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{ color: "#000" }}
      ></NotificationsNoneOutlinedIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 10 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
}
