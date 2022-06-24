import PerfectScrollbar from "react-perfect-scrollbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import _ from "lodash";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Paper,
  InputAdornment,
  Zoom,
} from "@mui/material";
import { SeverityPill } from "../severity-pill";
import { BillsList } from "./bills-list";
import { useEffect, useState } from "react";
import { moneySuffix, statusColor, statusName } from "src/utils/helper";
import { ChangeStatus } from "./change-status";
import { toastify } from "../toastify/toastify";
import moment from "moment";

export const TransferCard = ({ data, partnerOrg }) => {
  const [visible, setVisible] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [value, setValue] = useState({
    guide: data?.guideTransfer?.percent,
    driver: data?.driverTransfer?.percent,
    organization: data?.organizationTransfer?.percent,
  });
  const [error, setError] = useState({ guide: null, driver: null, organization: null });
  const [helperText, setHelperText] = useState({ guide: null, driver: null, organization: null });
  const [amount, setAmount] = useState({
    guide: data?.guideTransfer?.amount,
    driver: data?.driverTransfer?.amount,
    organization: data?.organizationTransfer?.amount,
  });
  const [selectData, setSelectData] = useState();
  const [isData, setIsData] = useState();
  useEffect(() => {
    if (data.guideTransferId) {
      (amount.guide = (_.sumBy(data.bills, (o) => _.toInteger(o.promotionAmount)) / 100) * 4),
        (value.guide = 4);
    }
    if (data.driverTransferId) {
      (amount.driver = (_.sumBy(data.bills, (o) => _.toInteger(o.promotionAmount)) / 100) * 4),
        (value.driver = 4);
    }
    setAmount({ ...amount });
    setValue({ ...value });
  }, []);

  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const openStatusModal = (t) => {
    //individual-baival

    // if (t === "guide") {
    //   setAmount({
    //     ...amount,
    //     guide: (_.sumBy(data.bills, (o) => _.toInteger(o.promotionAmount)) / 100) * 4,
    //   });
    //   setValue({ ...value, guide: 4 });
    // }
    // if (t === "driver") {
    //   setAmount({
    //     ...amount,
    //     driver: (_.sumBy(data.bills, (o) => _.toInteger(o.promotionAmount)) / 100) * 4,
    //   });
    //   setValue({ ...value, driver: 4 });
    // }

    //organzination-baival
    if (t === "guide") {
      if (!["TRANSFERRED", "CANCELED"].includes(data?.guideTransfer.status)) {
        setIsData(t);
        setChangeStatusModal(true);
        setSelectData({
          id: data.guideTransferId,
          status: data?.guideTransfer.status,
          userId: data?.guideTransfer.userId,
          bankAccount: data?.guideTransfer?.user?.bankAccount,
        });
      } else {
        toastify("WARNING", "төлөв өөрчлөх боломжгүй. ");
      }
    }
    if (t === "driver") {
      if (!["TRANSFERRED", "CANCELED"].includes(data?.driverTransfer.status)) {
        setIsData(t);
        setChangeStatusModal(true);
        setSelectData({
          id: data.driverTransferId,
          status: data?.driverTransfer.status,
          userId: data?.driverTransfer.userId,
          bankAccount: data?.driverTransfer?.user?.bankAccount,
        });
      } else {
        toastify("WARNING", "төлөв өөрчлөх боломжгүй. ");
      }
    }
    if (t === "organization") {
      if (!["TRANSFERRED", "CANCELED"].includes(data?.organizationTransfer.status)) {
        setIsData(t);
        setChangeStatusModal(true);
        setSelectData({
          id: data.organizationTransferId,
          status: data?.organizationTransfer.status,
          organizationCode: data?.organizationTransfer.organizationCode,
          bankAccount: data?.organizationTransfer?.user?.bankAccount,
        });
      } else {
        toastify("WARNING", "төлөв өөрчлөх боломжгүй. ");
      }
    }
  };
  const closeStatusModal = () => {
    setChangeStatusModal(false);
  };
  const onChangeGuide = (e) => {
    // alert("asdas");
    let floatValues = /^[+-]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/;
    if (!e.target.value.match(floatValues)) {
      setError({ ...error, guide: true });
      setHelperText({ ...helperText, guide: "Тоо бичих ёстой" });
      setValue({ ...value, guide: "" });
      setAmount({ ...amount, guide: "" });
    } else {
      setValue({ ...value, guide: e.target.value });
      setHelperText({ ...helperText, guide: "" });
      setError({ ...error, guide: false });
      console.log(
        e.target.value,
        data.bills,
        (_.sumBy(data.bills, (o) => _.toInteger(o.promotionAmount)) / 100) *
          _.toInteger(e.target.value)
      );
      setAmount({
        ...amount,
        guide:
          (_.sumBy(data.bills, (o) => _.toInteger(o.promotionAmount)) / 100) *
          parseInt(e.target.value),
      });
      // setPercent({ ...percent, guide: e.target.value });
    }
  };
  const onChangeDriver = (e) => {
    let floatValues = /^[+-]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/;
    if (!e.target.value.match(floatValues)) {
      setError({ ...error, driver: true });
      setHelperText({ ...helperText, driver: "Тоо бичих ёстой" });
      setValue({ ...value, driver: "" });
      setAmount({ ...amount, driver: "" });
    } else {
      setValue({ ...value, driver: e.target.value });
      setHelperText({ ...helperText, driver: "" });
      setError({ ...error, driver: false });
      setAmount({
        ...amount,
        driver:
          (_.sumBy(data.bills, (o) => _.toInteger(o.promotionAmount)) / 100) *
          parseInt(e.target.value),
      });
      // setPercent({ ...percent, driver: e.target.value });
    }
  };
  const onChangeOrganization = (e) => {
    let floatValues = /^[+-]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/;
    if (!e.target.value.match(floatValues)) {
      setError({ ...error, organization: true });
      setHelperText({ ...helperText, organization: "Тоо бичих ёстой" });
      setValue({ ...value, organization: "" });
      setAmount({ ...amount, organization: "" });
    } else {
      setValue({ ...value, organization: e.target.value });
      setHelperText({ ...helperText, organization: "" });
      setError({ ...error, organization: false });
      setAmount({
        ...amount,
        organization:
          (_.sumBy(data.bills, (o) => _.toInteger(o.promotionAmount)) / 100) *
          parseInt(e.target.value),
      });
      // setPercent({ ...percent, organization: e.target.value });
    }
  };
  return (
    <Card sx={{ my: 2 }}>
      {changeStatusModal && (
        <ChangeStatus
          selectData={selectData}
          amount={amount[isData]}
          percent={value[isData]}
          visible={changeStatusModal}
          close={closeStatusModal}
        />
      )}
      {visible && <BillsList data={data?.bills} visible={visible} close={closeModal} />}
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            <Button
              size="small"
              variant="contained"
              endIcon={<OpenInNewIcon />}
              onClick={openModal}
            >
              Бүртгэлэй биллүүд
            </Button>
            <Typography variant="h6">{moment(data?.createdAt).format("YYYY-MM-DD")}</Typography>
          </Box>
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
                <TableCell>Дансны дугаар</TableCell>
                <TableCell>Овог нэр</TableCell>
                <TableCell>Регистерийн дугаар</TableCell>
                <TableCell>Утасны дугаар</TableCell>
                <TableCell>Жуулчиний тоо</TableCell>
                <TableCell>Хувь</TableCell>
                <TableCell>Урамшууллын дүн</TableCell>
                <TableCell>Төлөв</TableCell>
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
                    <TableCell>{data?.guideTransfer?.user?.bankName ?? "-"}</TableCell>
                    <TableCell>{data?.guideTransfer?.user?.bankAccount ?? "-"}</TableCell>
                    <TableCell>
                      {data?.guideTransfer?.user?.firstName +
                        " " +
                        data?.guideTransfer?.user?.lastName}
                    </TableCell>
                    <TableCell>{data?.guideTransfer?.user?.rdNumber}</TableCell>
                    <TableCell>{data?.guideTransfer?.user?.mobile}</TableCell>
                    <TableCell>{data?.touristCount}</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        defaultValue={data.guideTransfer.percent}
                        error={error.guide}
                        value={value.guide}
                        onChange={onChangeGuide}
                        helperText={helperText.guide}
                        disabled={true}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField value={moneySuffix(amount.guide)} disabled size="small" />
                    </TableCell>
                    <TableCell>
                      <Tooltip TransitionComponent={Zoom} title={"Төлөв өөрчлөх"}>
                        <Typography onClick={() => openStatusModal("guide")}>
                          <SeverityPill color={statusColor(data.guideTransfer.status)}>
                            {statusName(data.guideTransfer.status)}
                          </SeverityPill>
                        </Typography>
                      </Tooltip>
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
                    <TableCell>{data?.driverTransfer?.user?.bankName ?? "-"}</TableCell>
                    <TableCell>{data?.driverTransfer?.user?.bankAccount ?? "-"}</TableCell>
                    <TableCell>
                      {data?.driverTransfer?.user?.firstName +
                        " " +
                        data?.driverTransfer?.user?.lastName}
                    </TableCell>
                    <TableCell>{data?.driverTransfer?.user?.rdNumber}</TableCell>
                    <TableCell>{data?.driverTransfer?.user?.mobile}</TableCell>
                    <TableCell>{data?.touristCount}</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        defaultValue={data?.driverTransfer.percent}
                        error={error.driver}
                        value={value.driver}
                        onChange={onChangeDriver}
                        helperText={helperText.driver}
                        // disabled={
                        //   data?.organizationTransferId &&
                        //   ["NEW", "INCOMPLATE"].includes(data?.driverTransfer.status)
                        //     ? false
                        //     : true
                        // }
                        disabled={true}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField value={moneySuffix(amount.driver)} disabled size="small" />
                    </TableCell>
                    <TableCell>
                      <Tooltip TransitionComponent={Zoom} title={"Төлөв өөрчлөх"}>
                        <Typography onClick={() => openStatusModal("driver")}>
                          <SeverityPill color={statusColor(data.driverTransfer.status)}>
                            {statusName(data.driverTransfer.status)}
                          </SeverityPill>
                        </Typography>
                      </Tooltip>
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
                    <TableCell colSpan={6}>
                      {data?.organizationTransfer.organizationCode &&
                      partnerOrg &&
                      partnerOrg.length > 0
                        ? partnerOrg.find((o) => {
                            if (
                              parseInt(o.id) ===
                              parseInt(data?.organizationTransfer.organizationCode)
                            )
                              return o;
                          })?.companyName
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        defaultValue={data.organizationTransfer.percent}
                        error={error.organization}
                        value={value.organization}
                        onChange={onChangeOrganization}
                        helperText={helperText.organization}
                        disabled={
                          data?.organizationTransferId &&
                          ["NEW", "INCOMPLATE"].includes(data.organizationTransfer.status)
                            ? false
                            : true
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField value={moneySuffix(amount.organization)} disabled size="small" />
                    </TableCell>
                    <TableCell>
                      <Tooltip TransitionComponent={Zoom} title={"Төлөв өөрчлөх"}>
                        <Typography onClick={() => openStatusModal("organization")}>
                          <SeverityPill color={statusColor(data.organizationTransfer.status)}>
                            {statusName(data.organizationTransfer.status)}
                          </SeverityPill>
                        </Typography>
                      </Tooltip>
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
