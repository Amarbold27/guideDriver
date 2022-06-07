import { DateRangePicker } from "@mui/lab";
import { Box, Button, Card, CardContent, TextField, SvgIcon, Typography } from "@mui/material";
import { useState } from "react";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
export const ReportToolbar = (props) => {
  const [dateRange, setDateRange] = useState([null, null]);

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
          Тайлан
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ m: 1, display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>
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
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ ml: 1 }}
                  startIcon={
                    <SvgIcon color="white" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  }
                  size="small"
                  // onClick={() => setIsSearch(!isSearch)}
                >
                  хайх
                </Button>
              </Box>
              <Button
                variant="contained"
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ mr: 1 }}
                color="success"
              >
                Export
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
