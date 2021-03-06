import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults, MovableList } from "../components/movable/movable-list";
import { MovableListToolbar } from "../components/movable/movable-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { BillProvider } from "src/context/BillContext";

const Movable = () => (
  <>
    <BillProvider>
      <Head>
        <title>Шилжүүлсэн | Хөтөч жолооч</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <MovableListToolbar />
          <Box sx={{ mt: 3 }}>
            <MovableList />
          </Box>
        </Container>
      </Box>
    </BillProvider>
  </>
);
Movable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Movable;
