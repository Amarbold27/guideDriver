import {
  Box,
  Button,
  Card,
  CardContent,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import usePagination from "../pagination/usePagination";
import * as XLSX from "xlsx";
import { Download as DownloadIcon } from "../../icons/download";
import Loader from "../loader/loader";
import Empty from "../Empty/Empty";

export default function ReportFactory({ data }) {
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const fileDownload = () => {
    let excelData = [];
    if (data?.length > 0) {
      data.map((o, key) => {
        excelData.push({
          "Загварын дугаар": o.model,
          "Эсгүүрийн алба": o.cutcost,
          "Оёх алба": o.linkcost,
        });
      });
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Оёмолын нэгж өртөг");
      XLSX.writeFile(workbook, "factoryCost.xlsx");
    }
  };
  return (
    <Box>
      <Card>
        <CardContent>
          <Box display={"flex"} justifyContent="flex-end">
            <Button
              startIcon={<DownloadIcon />}
              sx={{ mb: 2 }}
              color="success"
              variant="contained"
              onClick={fileDownload}
            >
              татах
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead
                sx={{
                  "& .MuiTableCell-root": {
                    textAlign: "left",
                  },
                }}
              >
                <TableCell sx={{ width: "50px" }}>№</TableCell>
                <TableCell>Загварын дугаар</TableCell>
                <TableCell>Эсгүүрийн алба</TableCell>
                <TableCell>Оёх алба</TableCell>
              </TableHead>
              <TableBody>
                {_DATA.currentData().length > 0 ? (
                  _DATA.currentData().map((el, key) => (
                    <TableRow
                      hover
                      sx={{
                        "& .MuiTableCell-root": {
                          textAlign: "left",
                        },
                      }}
                    >
                      <TableCell>
                        {page === 1 ? key + 1 : page > 1 && (page - 1) * PER_PAGE + key + 1}
                      </TableCell>
                      <TableCell>{el.model}</TableCell>
                      <TableCell>{el.cutcost}</TableCell>
                      <TableCell>{el.linkcost}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Empty />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {count > 1 && (
              <Pagination
                count={count}
                size="medium"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
                color="primary"
                sx={{
                  m: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              />
            )}
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
