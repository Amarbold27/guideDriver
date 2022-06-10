import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import _ from "lodash";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { moneySuffix } from "src/utils/helper";
import { BillsList } from "../transfer/bills-list";

export const MovableCard = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <Card sx={{ my: 2 }}>
      {visible && <BillsList data={data?.bills} visible={visible} close={closeModal} />}
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          {/* <Box sx={{ p: 2 }}>
            <Button
              size="small"
              variant="contained"
              endIcon={<OpenInNewIcon />}
              onClick={openModal}
            >
              биллийн дэлгэрэнгүй
            </Button>
          </Box> */}
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead
                sx={{
                  "& .MuiTableCell-root": {
                    textAlign: "center",
                    fontSize: "12px",
                  },
                }}
              >
                <TableCell></TableCell>
                <TableCell>Банкны нэр</TableCell>
                <TableCell>Бүртгэлтэй дансны дугаар</TableCell>
                <TableCell>Урамшуулал шилжүүлсэн дансны дугаар</TableCell>
                <TableCell>Овог нэр</TableCell>
                <TableCell>Татвар төлөгчийн дугаар</TableCell>
                <TableCell>Утасны дугаар</TableCell>
                <TableCell>Жуулчиний тоо</TableCell>
                <TableCell>Хувь</TableCell>
                <TableCell>Урамшууллын дүн</TableCell>
              </TableHead>
              <TableBody>
                {data?.guideTransferId && (
                  <TableRow
                    hover
                    sx={{
                      "& .MuiTableCell-root": {
                        borderBottom: "1px solid #d1d5db",
                        textAlign: "center",
                      },
                    }}
                  >
                    <TableCell>{"Хөтөч"}</TableCell>
                    <TableCell>{data?.guideTransfer.user.bankName ?? "-"}</TableCell>
                    <TableCell>{data?.guideTransfer.user.bankAccount ?? "-"}</TableCell>

                    <TableCell>{data?.guideTransfer.bankAccount ?? "-"}</TableCell>
                    <TableCell>
                      {data?.guideTransfer.user.firstName + " " + data?.guideTransfer.user.lastName}
                    </TableCell>
                    <TableCell>{data?.guideTransfer.user.taxNumber}</TableCell>
                    <TableCell>{data?.guideTransfer.user.mobile}</TableCell>
                    <TableCell>{data?.touristCount}</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        defaultValue={data.guideTransfer.percent}
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={moneySuffix(data?.guideTransfer?.amount)}
                        disabled
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                )}
                {data?.driverTransferId && (
                  <TableRow
                    hover
                    sx={{
                      "& .MuiTableCell-root": {
                        borderBottom: "1px solid #d1d5db",
                        textAlign: "center",
                      },
                    }}
                  >
                    <TableCell>{"Жолооч"}</TableCell>
                    <TableCell>{data?.driverTransfer.user.bankName ?? "-"}</TableCell>
                    <TableCell>{data?.driverTransfer.user.bankAccount ?? "-"}</TableCell>
                    <TableCell>{data?.driverTransfer.bankAccount ?? "-"}</TableCell>
                    <TableCell>
                      {data?.driverTransfer.user.firstName +
                        " " +
                        data?.driverTransfer.user.lastName}
                    </TableCell>
                    <TableCell>{data?.driverTransfer.user.taxNumber}</TableCell>
                    <TableCell>{data?.driverTransfer.user.mobile}</TableCell>
                    <TableCell>{data?.touristCount}</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        defaultValue={data?.driverTransfer.percent}
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={moneySuffix(data?.driverTransfer?.amount)}
                        disabled
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                )}
                {data?.organizationTransferId && (
                  <TableRow
                    hover
                    sx={{
                      "& .MuiTableCell-root": {
                        borderBottom: "1px solid #d1d5db",
                        textAlign: "center",
                      },
                    }}
                  >
                    <TableCell>{"Байгууллага"}</TableCell>
                    <TableCell colSpan={7}>
                      {data?.organizationTransfer.organizationCode ?? "-"}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        defaultValue={data.organizationTransfer.percent}
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={moneySuffix(data?.organizationTransfer?.amount)}
                        disabled
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
