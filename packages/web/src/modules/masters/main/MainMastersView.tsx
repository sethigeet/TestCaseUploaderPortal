import { FC } from "react";

import { useHistory } from "react-router-dom";

import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { Wrapper } from "../../components";

export const MainMastersView: FC = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Box textAlign="center" mb={10} display="flex" justifyContent="center">
        <Heading
          size="4xl"
          fontWeight={400}
          borderBottomWidth={2}
          pb={1}
          borderColor="#ddd"
        >
          Masters
        </Heading>
      </Box>
      <Grid w="70vw" templateColumns="repeat(2, 1fr)" gap={10}>
        {[
          { name: "Products", link: "products" },
          { name: "Modules", link: "modules" },
          { name: "Menus", link: "menus" },
          { name: "Testing Fors", link: "testingFors" },
          { name: "Testing Scopes", link: "testingScopes" },
        ].map(({ link, name }, i) => (
          <Box
            key={i}
            w="100%"
            borderWidth={2}
            borderRadius={15}
            borderColor="#dbdbdb"
            p={25}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            cursor="pointer"
            transition="all 0.3s ease-out"
            _hover={{ transform: "scale(1.05)" }}
            onClick={() => history.push(`/masters/${link}`)}
          >
            <Text fontSize="5xl">{name}</Text>
            <ChevronRightIcon w={10} h={10} />
          </Box>
        ))}
      </Grid>
    </Wrapper>
  );
};
