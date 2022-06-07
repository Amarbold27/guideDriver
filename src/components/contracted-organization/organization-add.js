import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import { TDialog, TDialogContent, TDialogTitle } from "../dialog/dialog";
import { useState } from "react";
import { DateRangePicker } from "@mui/lab";
import { toastify } from "../toastify/toastify";
import { useContract } from "src/context/ContractContext";
import { format } from "date-fns";

const OrganizationAdd = ({ visible, close }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const { createContract } = useContract();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      companyName: "",
      register: "",
      bankAccount: "",
      bankName: "",
      email: "",
      mobile: "",
    },
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
      if ((dateRange[0] && dateRange[1]) || (!dateRange[0] && !dateRange[1])) {
        let reqData = {
          ...values,
          contractBeginDate: format(dateRange[0] ?? new Date(), "yyyy-MM-dd"),
          contractEndDate: format(dateRange[1] ?? new Date(), "yyyy-MM-dd"),
        };
        createContract(dateRange[0] ? reqData : values);
        close();
      } else {
        toastify("WARNING", "Эхлэх, дуусах өдрөө оруулна уу");
      }
      //   apiPost("/staffs/login", { mobile: values.phoneNum, register: values.register })
      //     .then((res) => {
      //       console.log(res.data);
      //       if (res.data.code === 200) {
      //         localStorage.setItem("userState", res.data.data);
      //         authContext.setAuthState(res.data.token);
      //         router.push("/");
      //       }
      //     })
      //     .catch((err) => {});
      //   setTimeout(() => {
      //     actions.setSubmitting(false);
      //   }, 1500);
    },
  });

  return (
    <TDialog open={visible} onClose={close} maxWidth={"sm"} fullWidth={true}>
      <TDialogTitle onClose={close}>Байгууллага нэмэх</TDialogTitle>
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

export default OrganizationAdd;
