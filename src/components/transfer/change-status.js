import * as Yup from "yup";
import { Button, Divider, Grid, MenuItem, Select, TextField } from "@mui/material";
import { TDialog, TDialogActions, TDialogContent, TDialogTitle } from "../dialog/dialog";
import { useFormik } from "formik";
import { toastify } from "../toastify/toastify";
import { useBill } from "src/context/BillContext";
import { useEffect } from "react";

export const ChangeStatus = ({ amount, percent, visible, close, selectData }) => {
  const { promotions, saveTransfers, query } = useBill();
  useEffect(() => {}, []);
  const status = [
    { name: "Дутуу", value: "INCOMPLATE" },
    { name: "Цуцлагдсан", value: "CANCELED" },
    { name: "Шилжүүлсэн", value: "TRANSFERED" },
  ];
  const formik = useFormik({
    initialValues: {
      status: "",
      desc: "",
    },
    validationSchema: Yup.object({
      status: Yup.string().required("төлөв сонгоно уу"),
      desc: Yup.string().max(150, "Тэмдэгтийн хязгаар хэтэрлээ"),
    }),
    onSubmit: (value) => {
      if (value.status === "TRANSFERED") {
        let reqData = {};
        if (selectData?.organizationCode) {
          reqData = {
            status: value.status,
            amount: amount,
            percent: percent,
            status: value.status,
            organizationCode: selectData.organizationCode,
            bankAccount: selectData.bankAccount,
          };
        } else {
          reqData = {
            status: value.status,
            amount: amount,
            percent: percent,
            status: value.status,
            userId: selectData.userId,
            bankAccount: selectData.bankAccount,
          };
        }

        percent
          ? saveTransfers(selectData.id, reqData)
          : toastify("WARNING", "Урамшууллын хувиа оруулна уу");
      } else if (value.status !== "TRANSFERED" && value.desc === "") {
        toastify("WARNING", "Тайлбар хэсгийг бөглөнө үү.");
      } else {
        let reqData = {
          status: value.status,
          description: value.desc,
          status: value.status,
          userId: selectData.userId,
          bankAccount: selectData.bankAccount,
        };
        saveTransfers(selectData.id, reqData);
      }
    },
  });
  return (
    <TDialog open={visible} onClose={close} maxWidth={"xs"} fullWidth={true}>
      <TDialogTitle onClose={close}>Төлөв өөрчлөх</TDialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <TDialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Select
                fullWidth
                size="small"
                placeholder="Төлөвөө сонгоно уу"
                labelId="status-select-id"
                id="status-select"
                label="Төлөв"
                name="status"
                error={Boolean(formik.touched.status && formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.status}
              >
                {status.map((el) => {
                  if (selectData?.status !== el.value)
                    return <MenuItem value={el.value}>{el.name}</MenuItem>;
                })}
              </Select>
            </Grid>
            {formik.values.status !== "TRANSFERED" && (
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Энд тайлбар бичнэ"
                  multiline
                  rows={3}
                  maxRows={4}
                  error={Boolean(formik.touched.desc && formik.errors.desc)}
                  helperText={formik.touched.desc && formik.errors.desc}
                  label="Тайлбар"
                  margin="normal"
                  name="desc"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.desc}
                  variant="outlined"
                />
              </Grid>
            )}
          </Grid>
        </TDialogContent>
        <Divider />
        <TDialogActions>
          <Button variant="outlined" size="small" onClick={close}>
            Буцах
          </Button>
          <Button variant="contained" size="small" type="submit">
            Хадгалах
          </Button>
        </TDialogActions>
      </form>
    </TDialog>
  );
};
