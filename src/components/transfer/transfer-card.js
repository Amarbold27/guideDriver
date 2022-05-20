import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";

const orders = [
  {
    id: uuid(),
    ref: "Хөтөч",
    bank: "хаан банк",
    bankNumber: "5913207118",
    createdAt: 1555016400000,
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
    },
    status: "pending",
    statusName: "Бүртгэл дутуу",
  },
  {
    id: uuid(),
    ref: "Жолооч",
    bank: "хаан банк",
    bankNumber: "5913207118",
    createdAt: 1555016400000,
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
    },
    status: "delivered",
    statusName: "Шинэ",
  },
  {
    id: uuid(),
    ref: "Байгууллага",
    bank: "хаан банк",
    bankNumber: "5913207118",
    createdAt: 1555016400000,
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
    },
    status: "refunded",
    statusName: "Цуцлагдсан",
  },
];

export const TransferCard = (props) => (
  <Card {...props} sx={{ my: 2 }}>
    {/* <CardHeader title="Latest Orders" /> */}
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Box sx={{ p: 2 }}>
          <Button size="small" variant="contained" endIcon={<OpenInNewIcon />}>
            дэлгэрэнгүй
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Тасаг</TableCell>
              <TableCell>Билл</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc">
                    Огноо
                  </TableSortLabel>
                </Tooltip>
              </TableCell>

              <TableCell>Хямдарлын дүн</TableCell>
              <TableCell>Хэмжээ</TableCell>
              <TableCell>Нийт дүн</TableCell>
              <TableCell>Төлөв</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, i) => (
              <TableRow hover key={order.id}>
                <TableCell>{order.ref}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.bank}</TableCell>
                <TableCell>{order.bankNum}</TableCell>
                <TableCell>{format(order.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      (order.status === "delivered" && "success") ||
                      (order.status === "refunded" && "error") ||
                      "warning"
                    }
                  >
                    {order.statusName}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    {/* <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box> */}
  </Card>
);
