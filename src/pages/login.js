import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import { useContext, useEffect } from "react";
import { AuthContext } from "src/context/auth-context";
import { apiPost } from "src/service/baseApi";

const Login = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      phoneNum: "",
      password: "",
    },
    validationSchema: Yup.object({
      phoneNum: Yup.string()
        .matches(phoneRegExp, "утасны дугаар байх шаардлагатай")
        .max(8, "хамгийн ихдээ 8 оронтой байна.")
        .required("Заавал утасны дугаар оруулна"),
      password: Yup.string().max(255).required("Заавал нууц үг бичнэ"),
    }),
    onSubmit: (values, actions) => {
      apiPost("/staffs/login", { mobile: values.phoneNum, password: values.password })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            localStorage.setItem("userState", JSON.stringify(res.data.data));
            localStorage.setItem("role", JSON.stringify(res.data.data.roleId));
            authContext.setAuthState(res.data.token);
            router.push("/");
          }
        })
        .catch((err) => {});
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1500);
    },
  });
  useEffect(() => {
    authContext.isUserAuthenticated() && router.push("/");
  }, []);
  return (
    <>
      <Head>
        <title>Нэвтрэх | Хөтөч жолооч</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography color="textPrimary" variant="h4">
                    Нэвтрэх
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Хөтөч жолооч
                  </Typography>
                </Box>
                {/* <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid> */}
                {/* <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                or login with phoneNum address
              </Typography>
            </Box> */}
                <TextField
                  error={Boolean(formik.touched.phoneNum && formik.errors.phoneNum)}
                  fullWidth
                  helperText={formik.touched.phoneNum && formik.errors.phoneNum}
                  label="Утасны дугаар эсвэл имэйл хаяг"
                  margin="normal"
                  name="phoneNum"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="phoneNum"
                  value={formik.values.phoneNum}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Нууц үг"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Нэвтрэх
                  </Button>
                </Box>
                {/* <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography> */}
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
