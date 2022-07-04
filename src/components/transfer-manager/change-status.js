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
    { name: "ebarimt илгээсэн", value: "ETRANSFERRED" },
    { name: "ebarimt шивсэн", value: "EWRITTEN" },
  ];
  const formik = useFormik({
    initialValues: {
      status: "",
      desc: "",
      ebarimtNumber: selectData.ebarimtNumber,
    },
    validationSchema: Yup.object({
      status: Yup.string().required("төлөв сонгоно уу"),
      desc: Yup.string().max(150, "Тэмдэгтийн хязгаар хэтэрлээ"),
    }),
    onSubmit: (value) => {
      if (value.status === "ETRANSFERRED") {
        let reqData = {};
        if (selectData?.organizationCode) {
          reqData = {
            status: value.status,
            status: value.status,
            organizationCode: selectData.organizationCode,
          };
        } else {
          reqData = {
            status: value.status,
            userId: selectData.userId,
          };
        }
      }
      if (value.status !== "ETRANSFERRED" && value.status !== "EWRITTEN") {
        saveTransfers(selectData.id, reqData);
      } else if (
        value.status !== "ETRANSFERRED" &&
        value.status !== "EWRITTEN" &&
        value.desc === ""
      ) {
        toastify("WARNING", "Тайлбар хэсгийг бөглөнө үү.");
      } else {
        reqData = {
          status: value.status,
          description: value.desc,
          status: value.status,
          userId: selectData.userId,
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
          <Grid container spacing={2}>
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

            {!["ETRANSFERRED", "EWRITTEN"].includes(formik.values.status) && (
              <Grid item xs={12}>
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
