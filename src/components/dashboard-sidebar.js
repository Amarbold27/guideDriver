import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { Users as UsersIcon } from "../icons/users";
import { Report as ReportIcon } from "../icons/report";
import { Contract as ContractIcon } from "../icons/contract";
import { NavItem } from "./nav-item";
import Gobi from "../icons/gobi.png";
import { AuthContext } from "src/context/auth-context";
import Report from "src/pages/report";
const itemsTokenRole1 = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Хянах самбар",
  },
  {
    href: "/transfer",
    icon: <UsersIcon fontSize="small" />,
    title: "Шилжүүлэх",
  },
  {
    href: "/movable",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Шилжүүлсэн",
  },
  // {
  //   href: "/report",
  //   icon: <ReportIcon fontSize="small" />,
  //   title: "Тайлан",
  // },
  {
    href: "/contracted-organization",
    icon: <ContractIcon fontSize="small" />,
    title: "Гэрээт байгууллага",
  },
  // {
  //   href: "/account",
  //   icon: <UserIcon fontSize="small" />,
  //   title: "Account",
  // },
  // {
  //   href: "/settings",
  //   icon: <CogIcon fontSize="small" />,
  //   title: "Settings",
  // },

  //auth
  // {
  //   href: "/login",
  //   icon: <LockIcon fontSize="small" />,
  //   title: "Login",
  // },
  // {
  //   href: "/register",
  //   icon: <UserAddIcon fontSize="small" />,
  //   title: "Register",
  // },
  // {
  //   href: "/404",
  //   icon: <XCircleIcon fontSize="small" />,
  //   title: "Error",
  // },
];

const itemsTokenRole3 = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Хянах самбар",
  },
  {
    href: "/transfer",
    icon: <UsersIcon fontSize="small" />,
    title: "Шилжүүлэх",
  },
  {
    href: "/movable",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Шилжүүлсэн",
  },

  // {
  //   href: "/contracted-organization",
  //   icon: <ContractIcon fontSize="small" />,
  //   title: "Гэрээт байгууллага",
  // },
];
const itemsTokenRole2 = [
  {
    href: "/",
    icon: <ReportIcon fontSize="small" />,
    title: "Тайлан",
  },
];
export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [role, setRole] = useState();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      setRole(localStorage.getItem("role"));
      const ISSERVER = typeof window === "undefined";
      if (!ISSERVER) {
        console.log(JSON.parse(localStorage.getItem("userState")));
      }
      !authContext.isUserAuthenticated() && router.push("/login");
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );
  const logOut = () => {
    localStorage.clear();
    router.push("/login");
  };

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              cursor: "pointer",
              textAlign: "center",
              px: 3,
              py: 2,
              m: 4,
              borderRadius: 1,
              fontWeight: 700,
            }}
          >
            <NextLink href="/" passHref>
              <Image src={Gobi} width={100} height={30} />
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {role === "1" &&
            itemsTokenRole1.map((item) => (
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
            ))}
          {role === "2" &&
            itemsTokenRole2.map((item) => (
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
            ))}
          {role === "3" &&
            itemsTokenRole3.map((item) => (
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
            ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Button
            color="secondary"
            endIcon={<OpenInNewIcon />}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={logOut}
          >
            Гарах
          </Button>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
