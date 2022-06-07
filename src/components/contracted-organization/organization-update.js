import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import { TDialog, TDialogContent, TDialogTitle } from "../dialog/dialog";
import { useEffect, useState } from "react";
import { DateRangePicker } from "@mui/lab";
import { toastify } from "../toastify/toastify";
import { useContract } from "src/context/ContractContext";
import _ from "lodash";
import moment from "moment";

const OrganizationUpdate = ({ visible, close, data }) => {
  const [dateRange, setDateRange] = useState([data?.contractBeginDate, data?.contractEndDate]);
  const [firstData, setFirstData] = useState(_.cloneDeep(data));
  const { updateContract } = useContract();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let initVal = {};
  useEffect(() => {
    // console.log(data);
    // initVal = {
    //   companyName: "asdas",
    //   register: data.register ?? "",
    //   bankAccount: data.bankAccount ?? "",
    //   bankName: data.bankName ?? "",
    //   email: data.email ?? "",
    //   mobile: data.mobile ?? "",
    // };
  }, [data]);

  const formik = useFormik({
    initialValues: {
      companyName: data.companyName ?? "",
      register: data.register ?? "",
      bankAccount: data.bankAccount ?? "",
      bankName: data.bankName ?? "",
      email: data.email ?? "",
      mobile: data.mobile ?? "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      companyName: Yup.string().max(50, "тэмдэгтийн тоо хэтэрлээ").required("Заавал бичнэ"),
      register: Yup.string().max(50, "тэмдэгтийн тоо хэтэрлээ").required("Заавал бичнэ"),
      bankAccount: Yup.number()
        .integer()
        .max(1000000000000000, "тэмдэгтийн тоо хэтэрлээ")
        .typeError("Зөвхөн тоо оруулна"),
      bankName: Yup.string().max(50, "тэмдэгтийн тоо хэтэрлээ"),
      email: Yup.string().email("имейл байх шаардлагатай").max(50, "тэмдэгтийн тоо хэтэрлээ"),
      mobile: Yup.string()
        .matches(phoneRegExp, "утасны дугаар байх шаардлагатай")
        .max(50, "тэмдэгтийн тоо хэтэрлээ"),
    }),
    onSubmit: (values, actions) => {
      // if ((dateRange[0] && dateRange[1]) || (!dateRange[0] && !dateRange[1])) {
      //   let reqData = {
      //     ...values,
      //     contractBeginDate: moment(dateRange[0], "yyyy-mm-dd"),
      //     contractEndDate: moment(dateRange[1], "yyyy-mm-dd"),
      //   };
      //   if (_.isEqual(reqData, firstData) || _.isEqual(values, firstData)) {
      //     toastify("WARNING", "Өөрчлөлт ороогүй байна.");
      //   } else {
      //     updateContract(firstData.id, dateRange[0] ? reqData : values);
      //     close();
      //   }
      // } else {
      //   toastify("WARNING", "Эхлэх, дуусах өдрөө оруулна уу");
      // }
      if ((dateRange[0] && dateRange[1]) || (!dateRange[0] && !dateRange[1])) {
        let reqData = {
          ...values,
          contractBeginDate: dateRange[0] && moment(dateRange[0], "YYYY-MM-DD"),
          contractEndDate: dateRange[1] && moment(dateRange[1], "YYYY-MM-DD"),
        };
        updateContract(data.id, dateRange[0] ? reqData : values);
        close();
      } else {
        toastify("WARNING", "Эхлэх, дуусах өдрөө оруулна уу");
      }
    },
  });

  return (
    <TDialog open={visible} onClose={close} maxWidth={"sm"} fullWidth={true}>
      <TDialogTitle onClose={close}>Байгууллагын мэдээлэл засах</TDialogTitle>
      <TDialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            error={Boolean(formik.touched.companyName && formik.errors.companyName)}
            helperText={formik.touched.companyName && formik.errors.companyName}
            label="Байгууллагын нэр"
            margin="normal"
            name="companyName"
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="companyName"
            value={formik.values.companyName}
            defaultValue={formik.values.companyName}
            variant="outlined"
            size="small"
          />
          <TextField
            error={Boolean(formik.touched.register && formik.errors.register)}
            helperText={formik.touched.register && formik.errors.register}
            label="Байгууллагын дугаар"
            margin="normal"
            fullWidth
            name="register"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="register"
            value={formik.values.register}
            variant="outlined"
            size="small"
          />
          <TextField
            error={Boolean(formik.touched.bankName && formik.errors.bankName)}
            helperText={formik.touched.bankName && formik.errors.bankName}
            label="Банкны нэр"
            margin="normal"
            fullWidth
            name="bankName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="bankName"
            value={formik.values.bankName}
            variant="outlined"
            size="small"
          />
          <TextField
            error={Boolean(formik.touched.bankAccount && formik.errors.bankAccount)}
            helperText={formik.touched.bankAccount && formik.errors.bankAccount}
            label="Дансны дугаар"
            margin="normal"
            fullWidth
            name="bankAccount"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="register"
            value={formik.values.bankAccount}
            variant="outlined"
            size="small"
          />
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="Имейл"
            fullWidth
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            variant="outlined"
            size="small"
          />
          <TextField
            error={Boolean(formik.touched.mobile && formik.errors.mobilev)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            label="утасны дугаар"
            fullWidth
            margin="normal"
            name="mobile"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="mobile"
            value={formik.values.mobile}
            variant="outlined"
            size="small"
            sx={{ mb: 3 }}
          />
          <DateRangePicker
            startText="Эхлэх огноо"
            endText="Дуусах огноо"
            fullWidth
            value={dateRange}
            onChange={(newValue) => {
              setDateRange(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} fullWidth size="small" />
                <Box sx={{ mx: 2 }}> - </Box>
                <TextField {...endProps} fullWidth size="small" />
              </>
            )}
          />

          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              //   disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Хадгалах
            </Button>
          </Box>
        </form>
      </TDialogContent>
    </TDialog>
  );
};

export default OrganizationUpdate;
