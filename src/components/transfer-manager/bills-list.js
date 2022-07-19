import { format } from "date-fns";
import PerfectScrollbar from "react-perfect-scrollbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TDialog, TDialogActions, TDialogContent, TDialogTitle } from "../dialog/dialog";
import { moneySuffix } from "src/utils/helper";
import { useRouter } from "next/router";

export const BillsList = ({ data, visible, close }) => {
  console.log(data);
  const route = useRouter();
  return (
    <TDialog open={visible} onClose={close} maxWidth={"md"} fullWidth={true}>
      <TDialogTitle onClose={close}>Биллүүд</TDialogTitle>
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
                <TableCell>Урамшуулал бодогдох дүн</TableCell>
                <TableCell>Төлсөн дүн</TableCell>
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
                        <Typography>{moneySuffix(el.promotionAmount)}</Typography>
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