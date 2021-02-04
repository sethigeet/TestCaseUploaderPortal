import { FC } from "react";

import { Link as RouterLink, useLocation } from "react-router-dom";

import {
  Box,
  Image,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";

import {
  useLogoutMutation,
  useMeQuery,
  useApiClient,
} from "@portal/controller";
import { UserRoles } from "@portal/common";

import Logo from "../assets/icon.svg";

import { Link } from "./Link";
import { displayErrorToast } from "./ErrorToast";
import { LoadingIndicator } from "./LoadingIndicator";

export const Navbar: FC = () => {
  const { data, error: meError, loading: meLoading } = useMeQuery();
  const [
    logout,
    { error: logoutError, loading: logoutLoading },
  ] = useLogoutMutation();
  const apiClient = useApiClient();

  const location = useLocation();

  const activeRoute = location.pathname.split("/").slice(1).join("/");

  if (!meLoading && meError) {
    displayErrorToast({
      message:
        "There was an error while fetching your data. Make sure that you are connected to the internet!",
    });
  }

  if (!logoutLoading && logoutError) {
    displayErrorToast({
      message:
        "There was an error while logging you out!. Make sure that you are connected to the internet!",
    });
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={4}
      px={6}
    >
      <LoadingIndicator loading={meLoading || logoutLoading} />
      <Box display="flex" ml={10} alignItems="center">
        <Image src={Logo} alt="logo" boxSize={30} mx={3} />
        <Heading size="lg" color="blue.900">
          Company
        </Heading>
      </Box>

      <Box display="flex" alignItems="center">
        <Link to="/" fontWeight={activeRoute === "" ? "bold" : ""} showBorder>
          Home
        </Link>

        {data?.me?.role === UserRoles.ADMIN && (
          <Link
            to="/masters"
            fontWeight={activeRoute === "masters" ? "bold" : ""}
            showBorder
          >
            Masters
          </Link>
        )}

        <Link
          to="/testCase"
          fontWeight={activeRoute === "testCase" ? "bold" : ""}
          showBorder
        >
          Test Cases
        </Link>
        <Link
          to="/dashboard"
          fontWeight={activeRoute === "dashboard" ? "bold" : ""}
          showBorder
        >
          Dashboard
        </Link>
      </Box>

      <Box display="flex" mr={10} alignItems="center">
        {data?.me ? (
          <Menu>
            <MenuButton as={Avatar} cursor="pointer">
              <Avatar name={data.me.username} bg="blue.800" fontWeight="bold" />
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem cursor="initial">
                  Username - {data.me.username}
                </MenuItem>
                <MenuItem cursor="initial">
                  Role - &ldquo;{data.me.role.toUpperCase()}&rdquo;
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Actions">
                <MenuItem
                  onClick={async () => {
                    await logout();
                    await apiClient.resetStore();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
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
        )}
      </Box>
    </Box>
  );
};
