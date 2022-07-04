import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  SvgIcon,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Search as SearchIcon } from "../../icons/search";
import { DateRangePicker } from "@mui/lab";
import { useBill } from "src/context/BillContext";
import format from "date-fns/format";
export const TransferListToolbar = (props) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [isSearch, setIsSearch] = useState(false);
  const { setQuery, getPromotions, query } = useBill();
  const [value, setValue] = useState("ALL");
  const [status, setStatus] = useState({
    new: false,
    canceled: false,
    incomplate: false,
    transfered: false,
    ewritten: false,
    etransferred: false,
  });
  useEffect(() => {
    setQuery(setQueryParam());
  }, [value, status, isSearch]);
  const setQueryParam = () => {
    let param = "?";
    let filterParam = "";
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
    if (
      value !== "ALL" &&
      (status.new ||
        status.canceled ||
        status.incomplate ||
        status.transfered ||
        status.etransferred ||
        status.ewritten)
    ) {
      param = param + "&";
    }
    if (
      status.new ||
      status.canceled ||
      status.incomplate ||
      status.transfered ||
      status.etransferred ||
      status.ewritten
    ) {
      filterParam =
        "status=" +
        (status.new ? "NEW " : "") +
        (status.canceled ? "CANCELED " : "") +
        (status.incomplate ? "INCOMPLATE " : "") +
        (status.transfered ? "TRANSFERRED " : "") +
        (status.ewritten ? "EWRITTEN " : "") +
        (status.etransferred ? "ETRANSFERRED" : "");
    }
    if (dateRange[0] && dateRange[1]) {
      if ((param + filterParam).length > 1) param = param + filterParam + "&";
      else param = param + filterParam;
      param =
        param +
        `beginDate=${format(dateRange[0], "yyyy-MM-dd")}&endDate=${format(
          dateRange[1],
          "yyyy-MM-dd"
        )}`;
    } else param = param + filterParam;
    if (param.length > 1) return param;
    else return " ";
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
            onClick={() => setIsSearch(!isSearch)}
          >
            хайх
          </Button>
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
                  onChange={onChange}
                  value={value}
                >
                  <FormControlLabel value="ALL" control={<Radio />} label="Бүгд" />
                  <FormControlLabel value="INDIVIDUAL" control={<Radio />} label="Хувь хүн" />
                  <FormControlLabel value="ORGANIZATION" control={<Radio />} label="Байгууллага" />
                </RadioGroup>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => query && getPromotions(query)}
                >
                  Шинэчлэх
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  color="info"
                  variant="outlined"
                  sx={{ ml: 1 }}
                  size="small"
                  onClick={() => setStatus({ ...status, new: !status.new })}
                >
                  <Checkbox
                    checked={status.new}
                    size="small"
                    color="info"
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
                  onClick={() => setStatus({ ...status, incomplate: !status.incomplate })}
                >
                  <Checkbox
                    checked={status.incomplate}
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
                  onClick={() => setStatus({ ...status, canceled: !status.canceled })}
                >
                  <Checkbox
                    checked={status.canceled}
                    size="small"
                    color="error"
                    sx={{ padding: 0 }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Цуцлагдсан
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                  sx={{ ml: 1 }}
                  size="small"
                  onClick={() => setStatus({ ...status, ewritten: !status.ewritten })}
                >
                  <Checkbox
                    checked={status.ewritten}
                    size="small"
                    color="warning"
                    sx={{ padding: 0 }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Ибаримт шивсэн
                </Button>
                <Button
                  color="success"
                  variant="outlined"
                  sx={{ ml: 1 }}
                  size="small"
                  onClick={() => setStatus({ ...status, etransferred: !status.etransferred })}
                >
                  <Checkbox
                    checked={status.etransferred}
                    size="small"
                    color="success"
                    sx={{ padding: 0 }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Ибаримт илгээсэн
                </Button>

                <Button
                  color="success"
                  variant="outlined"
                  sx={{ ml: 1 }}
                  size="small"
                  onClick={() => setStatus({ ...status, transfered: !status.transfered })}
                >
                  <Checkbox
                    checked={status.transfered}
                    size="small"
                    color="success"
                    sx={{ padding: 0 }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Шилжүүлсэн
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
