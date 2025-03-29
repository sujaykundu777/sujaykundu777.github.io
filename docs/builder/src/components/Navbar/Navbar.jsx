import {
  Box,
  Flex,
  HStack,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box
      bg={useColorModeValue("green.500", "green.900")}
      color={useColorModeValue("white", "gray.200")}
      p={4}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Heading as="h1" size="lg">
              Resume Builder
            </Heading>
          </Box>
        </HStack>
        <Flex alignItems={"center"}>
          <HStack as={"nav"} spacing={4} marginRight={4}>
            <Box>
              <Button>Signin</Button>
            </Box>
            {/* <Box>
                    <Button>
                        Download
                    </Button>
                </Box> */}
          </HStack>
          {/* <Menu>
              <MenuButton as={Button} colorScheme={'blue'} variant={'outline'}>
                Settings
                </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
        </Flex>
      </Flex>
    </Box>
  );
}
