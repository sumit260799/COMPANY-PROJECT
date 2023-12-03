import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Card1() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="400px"
        src="https://picsum.photos/seed/picsum/200/300"
      />
      <CardContent>
        <a href="#">
          <Typography gutterBottom variant="subtitle1">
            ASCOT X CHARLIE
          </Typography>
        </a>
        <a href="#">
          <Typography gutterBottom variant="subtitle1">
            Carbon Military
          </Typography>
        </a>
        <Typography gutterBottom variant="subtitle1">
          $402.00
        </Typography>
      </CardContent>
    </Card>
  );
}
