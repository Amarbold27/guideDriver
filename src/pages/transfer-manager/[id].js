import { Box, Typography } from "@mui/material";
import { Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { TransferDetail } from "src/components/transfer-manager/transfer-detail";
import { TransferList } from "src/components/transfer-manager/transfer-list";
import { BillProvider, useBill } from "src/context/BillContext";
// import { useParams } from "react-router-dom";
const Details = () => {
  return (
    <>
      <BillProvider>
        <Head>
          <title> Баримтын дэлгэрэнгүй| Хөтөч жолооч</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Typography sx={{ m: 1 }} variant="h4">
              Баримтын дэлгэрэнгүй
            </Typography>
            <TransferDetail />
          </Container>
        </Box>
      </BillProvider>
    </>
  );
};

Details.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Details;
