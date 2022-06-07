import PerfectScrollbar from "react-perfect-scrollbar";
import { Search as SearchIcon } from "../../icons/search";
import _ from "lodash";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Pagination,
  TableRow,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useContract } from "src/context/ContractContext";
import { toastify } from "../toastify/toastify";
import { SeverityPill } from "../severity-pill";
import { DeleteOutline, Edit } from "@mui/icons-material";
import OrganizationUpdate from "./organization-update";

export const ContractedOrganizationList = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState();
  const { setQuery, deleteContract } = useContract();
  const [selectData, setSelectData] = useState();
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const { getContractList, contractList, createContract } = useContract();
  useEffect(() => {
    getContractList(setQueryFunc());
  }, []);
  const handleChange = (e, p) => {
    getContractList(setQueryFunc(null, p));
    setPage(p);
  };
  const searchFunc = () => {
    if (search && search.length > 0) getContractList(setQueryFunc());
    else {
      toastify("ERROR", "Хайх утгаа оруулна уу?");
      // setError("Хайх утгаа оруулна уу?");
    }
  };
  const setQueryFunc = (status, pageNum) => {
    let query = `?status=ACTIVE&page=${pageNum ?? page}&limit=${PER_PAGE}`;
    if (search?.length > 0 && status !== "ALL") {
      query = query + `&companyName=${search}&register=${search}`;
    }
    setQuery(query);
    return query;
  };
  const openModal = (o) => {
    setSelectData(o);
    setVisible(true);
  };
  return (
    <PerfectScrollbar>
      <Box sx={{ mb: 3 }}>
        {selectData && (
          <OrganizationUpdate
            data={selectData}
            close={() => {
              setVisible(false), setSelectData({});
            }}
            visible={visible}
          />
        )}
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500, display: "flex" }}>
              <TextField
                fullWidth
                size="small"
                // error={error?.length > 0 && true}
                // helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Нэр болон рд- ээр хайх"
                variant="outlined"
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
                onClick={searchFunc}
              >
                Хайх
              </Button>
              <Button
                color="primary"
                variant="outlined"
                sx={{ ml: 1 }}
                size="small"
                onClick={() => getContractList(setQueryFunc("ALL", page))}
              >
                Бүгд
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <TableContainer component={Card}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              "& .MuiTableCell-root": {
                textAlign: "center",
                fontSize: "12px",
              },
            }}
          >
            <TableCell>№</TableCell>
            <TableCell>Нэр</TableCell>
            <TableCell>РД</TableCell>
            <TableCell>Банкны нэр</TableCell>
            <TableCell>Дансны дугаар</TableCell>
            <TableCell>Гэрээ байгуулсан өдөр</TableCell>
            <TableCell>Гэрээний хугацаа дуусах өдөр</TableCell>
            <TableCell>Имэйл</TableCell>
            <TableCell>Утасны дугаар</TableCell>
            <TableCell>Төлөв</TableCell>
            <TableCell>Үйлдэл</TableCell>
          </TableHead>
          <TableBody>
            {contractList.data &&
              contractList.data.length > 0 &&
              contractList.data.map((el, key) => (
                <TableRow key={el.id} hover>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>{el.companyName}</TableCell>
                  <TableCell>{el.register}</TableCell>
                  <TableCell>{el.bankName}</TableCell>
                  <TableCell>{el.bankAccount}</TableCell>
                  <TableCell>{el.contractBeginDate}</TableCell>
                  <TableCell>{el.contractEndDate}</TableCell>
                  <TableCell>{el.email}</TableCell>
                  <TableCell>{el.mobile}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (el.status === "ACTIVE" && "success") ||
                        (el.status === "DELETE" && "error") ||
                        "warning"
                      }
                    >
                      {el.status === "ACTIVE" ? "идэвхитэй" : "устсан"}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    <Box display="flex">
                      <IconButton color="error" onClick={() => deleteContract(el.id)}>
                        <DeleteOutline />
                      </IconButton>
                      <IconButton color="info" onClick={() => openModal(el)}>
                        <Edit />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 3,
          }}
        >
          {contractList?.pagination?.end !== 0 && (
            <Pagination
              color="primary"
              size="small"
              page={page}
              count={contractList?.pagination?.pageCount}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          )}
        </Box>
      </TableContainer>
    </PerfectScrollbar>
  );
};
