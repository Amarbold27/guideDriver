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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Pagination,
  TableFooter,
  Tabs,
  Tab,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { apiGet, apiPost } from "src/service/baseApi";
import { Search as SearchIcon } from "../../icons/search";
import { DatePicker, TabContext, TabList, TabPanel } from "@mui/lab";
import TablePagination from "@mui/material/TablePagination";
import format from "date-fns/format";
import usePagination from "../pagination/usePagination";
import ReportKnitting from "./report-knitting";
import ReportFactory from "./report-factory";
import Loader from "../loader/loader";
import Empty from "../Empty/Empty";

export const FactoryReportToolbar = (props) => {
  const [value, setValue] = useState(new Date());
  const [knittingCostData, setknittingCostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [valueTab, setValueTab] = useState("1");
  const [factorySewncost, setFactorySewncost] = useState([]);
  const PER_PAGE = 10;
  const _DATA = usePagination(knittingCostData, PER_PAGE);
  useEffect(() => {
    getFactorySewncost();
    getKnittingCost();

    return () => {};
  }, []);
  const getKnittingCost = () => {
    setLoading(true);
    apiGet(
      `/report/factory/knitting-cost?year=${new Date(value).getFullYear()}&month=${new Date(
        value
      ).getMonth()}`
    )
      .then((res) => {
        setLoading(false);
        setknittingCostData(res.data.data);
      })
      .catch(() => setLoading(false));
  };
  const getFactorySewncost = () => {
    // setLoading(true);
    apiGet(
      `/report/factory/sewn-cost?year=${new Date(value).getFullYear()}&month=${new Date(
        value
      ).getMonth()}`
    ).then((res) => {
      // setLoading(false);
      setFactorySewncost(res.data.data);
    });
    // .catch(() => setLoading(false));
  };
  const onChange = (e) => {
    console.log(e, ":sad");
    setValue(e);
  };
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };
  return (
    <Box {...props}>
      {loading && <Loader />}
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

        <Box sx={{ m: 1, display: "flex" }}>
          <DatePicker
            label="Хугацаа"
            views={["month", "year"]}
            minDate={new Date("2012-03-01")}
            value={value}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                // {...params,inputProps.value:}
                // value={
                //   new Date(inputProps.value).getFullYear() +
                //   " оны " +
                //   new Date(inputProps.value).getMonth() +
                //   "-р сар"
                // }
                fullWidth
                size="medium"
              />
            )}
          />
          <Button
            sx={{ ml: 2 }}
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => {
              getKnittingCost();
              getFactorySewncost();
            }}
          >
            Хайх
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label="Сүлжмэлийн нэгж өртөг" value="1" />
              <Tab label="Оёмолын нэгж өртөг" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ReportKnitting data={knittingCostData ?? []} />
          </TabPanel>
          <TabPanel value="2">
            <ReportFactory data={factorySewncost} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};
