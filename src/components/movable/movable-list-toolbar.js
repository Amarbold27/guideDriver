import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { useBill } from "src/context/BillContext";
export const MovableListToolbar = (props) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const { setQuery } = useBill();
  const [value, setValue] = useState("ALL");
  useEffect(() => {
    setQuery(setQueryParam());
  }, [value]);
  const setQueryParam = () => {
    let param = "?";
    switch (value) {
      case "ORGANIZATION":
        param = param + "organization=ORGANIZATION";
        break;
      case "ALL":
        break;
      case "INDIVIDUAL":
        param = param + "organization=INDIVIDUAL";
        break;
    }
    if (value === "ALL") {
      param = "?status=TRANSFERRED";
    } else param = param + "&status=TRANSFERRED";
    return param;
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
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
          Шилжүүлсэн
        </Typography>
        {/* <Box sx={{ m: 1, display: "flex" }}>
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
        </Box> */}
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
                  onChange={onChange}
                  value={value}
                >
                  <FormControlLabel value="ALL" control={<Radio />} label="Бүгд" />
                  <FormControlLabel value="INDIVIDUAL" control={<Radio />} label="Хувь хүн" />
                  <FormControlLabel value="ORGANIZATION" control={<Radio />} label="Байгууллага" />
                </RadioGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
