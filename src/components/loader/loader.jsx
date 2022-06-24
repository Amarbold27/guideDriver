import { Box } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";
export default function Loader() {
  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          minWidth: "100vw",
          height: "100vh",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: "2000",
          background: "#000",
          opacity: "0.5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading type={"cylon"} color={"#fff"} height={"100px"} width={"100px"} />
      </Box>
    </div>
  );
}
