import { FC } from "react";

import { Link as RouterLink, useLocation } from "react-router-dom";

import { Box, Image, Heading, Button } from "@chakra-ui/react";

import { Link } from "./Link";

import Logo from "../assets/icon.svg";

export const Navbar: FC = () => {
  const location = useLocation();

  const activeRoute = location.pathname.split("/")[1];

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={4}
      px={6}
    >
      <Box display="flex" ml={10} alignItems="center">
        <Image src={Logo} alt="logo" boxSize={30} mx={3} />
        <Heading size="lg" color="blue.900">
          Company
        </Heading>
      </Box>

      <Box display="flex" alignItems="center">
        <Link to="/" fontWeight={activeRoute === "" ? "bold" : ""}>
          Home
        </Link>
        <Link to="/create" fontWeight={activeRoute === "create" ? "bold" : ""}>
          Create
        </Link>
        <Link to="/status" fontWeight={activeRoute === "status" ? "bold" : ""}>
          Status
        </Link>
        <Link to="/test" fontWeight={activeRoute === "test" ? "bold" : ""}>
          Test
        </Link>
        <Link
          to="/dashboard"
          fontWeight={activeRoute === "dashboard" ? "bold" : ""}
        >
          Dashboard
        </Link>
      </Box>

      <Box display="flex" mr={10} alignItems="center">
        <RouterLink to="/login">
          <Button
            variant={activeRoute === "login" ? "solid" : "outline"}
            color="blue.900"
            _hover={{
              transform: "scale(1.1)",
            }}
          >
            Login
          </Button>
        </RouterLink>
      </Box>
    </Box>
  );
};
