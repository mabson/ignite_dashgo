import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { NotificationsNav } from "./NotificationsNav";

interface ProfileProps {
    showProfileData: boolean
}
export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align={"center"}>
            {showProfileData && <Box mr={4} textAlign="right">
                <Text>Mábson Vinicius</Text>
                <Text color={"gray.300"} fontSize="small">
                    mabson@live.com
                </Text>
            </Box>}
            <Avatar size={"md"} name="Mábson Vinicius" src='https://github.com/mabson.png' />
        </Flex>
    )
}