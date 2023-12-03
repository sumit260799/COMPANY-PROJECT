import React from "react";
import { Stack, Skeleton } from "@mui/material";

const LoadSkeleton = () => {
  return (
    <div>
      <Stack
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" width={210} height={100} />
        <Skeleton
          variant="rectangular"
          width={210}
          height={80}
          sx={{ borderRadius: "8px", marginBottom: "8px" }}
        />
        <Skeleton
          variant="rectangular"
          width={210}
          height={40}
          sx={{ borderRadius: "8px" }}
        />
      </Stack>
    </div>
  );
};

export default LoadSkeleton;
