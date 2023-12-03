import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MonthlyUser from "./AdminChart/MonthlyUser";
import Revenue from "./AdminChart/Revenue";
import AmountCard from "./AmountCard";
import TotalViewCard from "./TotalViewCard";
import OrdersbyCategory from "./AdminChart/OrdersbyCategory";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CollectionsIcon from "@mui/icons-material/Collections";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
function CardHead() {
  const cardData = [
    { title: "Total Influencer", number: "5K", icon: <PeopleAltIcon /> },
    { title: "Total Follower", number: "1M", icon: <Diversity3Icon /> },
    { title: "Total Brands", number: "30K", icon: <CollectionsIcon /> },
    { title: "Sales", number: "200000", icon: <AccountBalanceWalletIcon /> },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginTop: "100px",
          justifyContent: "space-between",
          flexWrap: "wrap", // Allow cards to wrap to the next row on smaller screens
        }}
      >
        {cardData.map((item) => (
          <Card
            key={item.title}
            sx={{
              minWidth: 300,
              width: "calc(20% - 16px)", // Adjust card width for responsiveness
              marginBottom: "16px", // Add some spacing between cards
              display: "flex", // Make card content flex to align icon and number horizontally
              justifyContent: "space-between", // Space items evenly
              alignItems: "center", // Center items vertically
              padding: "16px", // Add padding to the card content
              "@media (max-width: 600px)": {
                width: "100%", // Make cards 100% width on screens less than 600px wide (phones)
              },
            }}
          >
            <div>
              <Typography
                sx={{ fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
                variant="h6"
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  mb: 1.5,
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: "14",
                }}
                variant="h4"
              >
                {item.number}
              </Typography>
            </div>
            {item.icon}
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <div style={{ flex: "1", width: "50%", paddingRight: "8px" }}>
          <MonthlyUser />
        </div>
        <div style={{ flex: "1", width: "50%", paddingLeft: "8px" }}>
          <Revenue />
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between", // Space the cards evenly
        }}
      >
        <AmountCard />
        <TotalViewCard />
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <OrdersbyCategory />
      </Box>
    </>
  );
}

export default CardHead;
