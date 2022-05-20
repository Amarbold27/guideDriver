import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults, TransferList } from "../components/transfer/transfer-list";
import { TransferListToolbar } from "../components/transfer/transfer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Transfer = () => (
  <>
    <Head>
      <title>Шилжүүлэх | Хөтөч жолооч</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <TransferListToolbar />
        <Box sx={{ mt: 3 }}>
          <TransferList />
        </Box>
      </Container>
    </Box>
  </>
);
Transfer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Transfer;
