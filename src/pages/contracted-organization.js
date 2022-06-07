import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { ContractedOrganizationToolbar } from "src/components/contracted-organization/contracted-organization-toolbar";
import { ContractedOrganizationList } from "src/components/contracted-organization/contracted-organization-list";
import { ContractProvider } from "src/context/ContractContext";

const ContractedOrganization = () => (
  <>
    <ContractProvider>
      <Head>
        <title>Гэрээт байгууллага | Хөтөч жолооч</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ContractedOrganizationToolbar />
          <Box sx={{ pt: 3 }}>
            <ContractedOrganizationList />
          </Box>
        </Container>
      </Box>
    </ContractProvider>
  </>
);

ContractedOrganization.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ContractedOrganization;
