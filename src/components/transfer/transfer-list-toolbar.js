import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  MenuItem,
  Menu,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { DateRangePicker } from "@mui/lab";
export const TransferListToolbar = (props) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [status, setStatus] = useState({
    new: false,
    aborted: false,
    less: false,
  });
  console.log(status);
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
          Шилжүүлэх
        </Typography>
        <Box sx={{ m: 1, display: "flex" }}>
          <DateRangePicker
            startText="Эхлэх огноо"
            endText="Дуусах огноо"
            value={dateRange}
            onChange={(newValue) => {
              setDateRange(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} fullWidth size="small" sx={{ width: "200px" }} />
                <Box sx={{ mx: 2 }}> - </Box>
                <TextField {...endProps} fullWidth size="small" sx={{ width: "200px" }} />
              </>
            )}
          />
          {/* <Button
            color="primary"
            variant="contained"
            sx={{ ml: 1 }}
            startIcon={
              <SvgIcon color="white" fontSize="small">
                <SearchIcon />
              </SvgIcon>
            }
            size="small"
          >
            хайх
          </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
              <Grid item sx={{ maxWidth: 500 }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="all" control={<Radio />} label="Бүгд" />
                  <FormControlLabel value="personal" control={<Radio />} label="Хувь хүн" />
                  <FormControlLabel value="organization" control={<Radio />} label="Байгууллага" />
                </RadioGroup>
              </Grid>

              <Grid item sx={{ maxWidth: 500 }}>
                <Button
                  color="success"
                  variant="outlined"
                  sx={{ ml: 1 }}
                  size="small"
                  onClick={() => setStatus({ ...status, new: !status.new })}
                >
                  <Checkbox
                    checked={status.new}
                    size="small"
                    color="success"
                    sx={{ padding: 0 }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Шинэ
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                  sx={{ ml: 1 }}
                  size="small"
                  onClick={() => setStatus({ ...status, less: !status.less })}
                >
                  <Checkbox
                    checked={status.less}
                    size="small"
                    color="warning"
                    sx={{ padding: 0 }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Дутуу
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  sx={{ ml: 1 }}
                  size="small"
                  onClick={() => setStatus({ ...status, aborted: !status.aborted })}
                >
                  <Checkbox
                    checked={status.aborted}
                    size="small"
                    color="error"
                    sx={{ padding: 0 }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Цуцлагдсан
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
