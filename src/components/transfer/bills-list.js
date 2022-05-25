import { format } from "date-fns";
import PerfectScrollbar from "react-perfect-scrollbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  Card,
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

export const BillsList = ({ data, visible, close }) => {
  const route = useRouter();
  return (
    <TDialog open={visible} onClose={close} maxWidth={"md"} fullWidth={true}>
      <TDialogTitle onClose={close}>Биллийн дэлгэрэнгүй</TDialogTitle>
      <TDialogContent>
        <Card sx={{ my: 2 }}>
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
                <TableCell>Дэлгүүр</TableCell>
                <TableCell>Худалдагч</TableCell>
                <TableCell>Үндсэн үнэ</TableCell>
                <TableCell>Хямдарсан үнэ</TableCell>
                <TableCell>Нийт үнэ</TableCell>
                <TableCell>Өдөр</TableCell>
              </TableHead>
              <TableBody>
                {data &&
                  data.length > 0 &&
                  data.map((el) => (
                    <TableRow
                      hover
                      sx={{
                        "& .MuiTableCell-root": {
                          textAlign: "center",
                        },
                      }}
                      onClick={() => {
                        route.push({
                          pathname: "/transfer/[id]",
                          query: { id: el.id },
                        });
                      }}
                    >
                      <TableCell>
                        <Typography>{el.ShopName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{el.CashierName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{moneySuffix(el.BaseAmount)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{moneySuffix(el.DiscountAmount)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{moneySuffix(el.Amount)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{el.DocumentDate}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </TDialogContent>
      <TDialogActions>
        <Button variant="contained" size="small" onClick={close}>
          Буцах
        </Button>
      </TDialogActions>
    </TDialog>
  );
};
