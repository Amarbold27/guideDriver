import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import OrganizationAdd from "./organization-add";

export const ContractedOrganizationToolbar = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Гэрээт байгууллага
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={() => setVisible(true)}>
            Байгууллага нэмэх
          </Button>
        </Box>
        <OrganizationAdd visible={visible} close={() => setVisible(false)} />
      </Box>
    </Box>
  );
};
