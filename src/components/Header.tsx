import { ReactNode } from "react";
import { Platform, TouchableOpacity } from "react-native";

import { Box, Center, Heading, Icon } from "native-base";
import { IconButton } from "./IconButton";


interface HeaderRootProps {
  children: ReactNode;
}
function HeaderRoot({ children }: HeaderRootProps) {
  return (
    <Box pt={Platform.OS === 'android' ? 8 : 12} position="relative">
      {children}
    </Box>
  )
};

interface HeaderTitleProps {
  children: string;
}
function HeaderTitle({ children }: HeaderTitleProps) {
  return (
    <Center>
      <Heading fontFamily="heading" fontSize="lg" color="white" textAlign="center">
        {children}
      </Heading>
    </Center>
  )
}

export function HeaderBackButton() {
  return (
    <IconButton 
      name="arrow-left" 
      style={{ 
        position: 'absolute', 
        top: Platform.OS === 'android' ? 32 : 48,
      }} 
    />
  )
}

export const Header = {
  Root: HeaderRoot,
  Title: HeaderTitle,
  BackButton: HeaderBackButton
}