import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";

export const Budget = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            жуулчдийн тоо
          </Typography>
          <Typography color="textPrimary" variant="h4">
            2,4k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Сүүлийн 1 сар
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
