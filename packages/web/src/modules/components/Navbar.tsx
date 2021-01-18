import { FC } from "react";

import { Link as RouterLink } from "react-router-dom";

import { Box, Image, Heading, Button } from "@chakra-ui/react";

import { Link } from "./Link";

import Logo from "../assets/icon.svg";

export const Navbar: FC = () => {
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
        <Link to="/create">Create</Link>
        <Link to="/status">Status</Link>
        <Link to="/test">Test</Link>
        <Link to="/dashboard">Dashboard</Link>
      </Box>

      <Box display="flex" mr={10} alignItems="center">
        <RouterLink to="/login">
          <Button variant="outline" color="blue.900">
            Login
          </Button>
        </RouterLink>
      </Box>
    </Box>
  );
};
