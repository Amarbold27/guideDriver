import { format } from "date-fns";
import PerfectScrollbar from "react-perfect-scrollbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Divider,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { TDialog, TDialogActions, TDialogContent, TDialogTitle } from "../dialog/dialog";
import { moneySuffix } from "src/utils/helper";
import { useRouter } from "next/router";
import { useBill } from "src/context/BillContext";
import { useEffect } from "react";

export const TransferDetail = () => {
  const route = useRouter();
  let { id } = route.query;
  const { billDetail, getBillDetail } = useBill();
  useEffect(() => {
    if (route.isReady) getBillDetail(id);
  }, [route.asPath]);
  console.log(billDetail, "billl");
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        {/* <CardHeader title="Latest Orders" /> */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead
              sx={{
                "& .MuiTableCell-root": {
                  textAlign: "center",
                },
              }}
            >
              <TableCell>Код</TableCell>
              <TableCell>Тасаг</TableCell>
              <TableCell>Барааны нэр</TableCell>
              <TableCell>Ширхэг</TableCell>
              <TableCell>Нэгж бараа дүн</TableCell>
              <TableCell>Үндсэн үнэ</TableCell>
              <TableCell>Хямдарлын хувь</TableCell>
              <TableCell>Хямдарлын дүн</TableCell>
              <TableCell>Төлөх дүн</TableCell>
            </TableHead>
            <TableBody>
              {billDetail.length > 0 &&
                billDetail.map((el) => (
                  <TableRow
                    sx={{
                      "& .MuiTableCell-root": {
                        textAlign: "center",
                        fontSize: "10px",
                      },
                    }}
                  >
                    <TableCell>
                      <Typography>{el.codeId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{el.sectionName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{el.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{el.Quantity}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{moneySuffix(el.BasePrice)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{moneySuffix(el.BaseAmount)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{el.ItemDiscountPercent}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{moneySuffix(el.ItemDiscountAmount)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{moneySuffix(el.Amount)}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
