import React from "react";
// import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
// import MuiDialogContent from "@mui/material/DialogContent";
// import MuiDialogActions from "@mui/material/DialogActions";
import { CloseOutlined } from "@mui/icons-material";
import { IconButton, DialogContent, DialogActions, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TDialog = styled(Dialog)(({ theme }) => ({
  margin: 0,
  borderRadius: theme.spacing(1),
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: "12px 16px",
  },
}));

export const TDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <Box mr={3}>{children}</Box>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseOutlined />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export const TDialogContent = styled(DialogContent)(({ theme }) => ({
  "&::-webkit-scrollbar": {
    width: "5px",
  },
}));

export const TDialogActions = styled(DialogActions)(({ theme }) => ({
  // "&::-webkit-scrollbar": {
  //   width: "5px",
  // },
}));
