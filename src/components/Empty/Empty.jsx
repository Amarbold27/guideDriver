import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import NoData from "../../icons/noData.jpeg";
export default function Empty() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "400px", textAlign: "center" }}>
        <Image src={NoData} layout="responsive" />
        <Typography variant="h6" color={"text.secondary"}>
          Хоосон байна
        </Typography>
      </Box>
    </Box>
  );
}
