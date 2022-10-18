import { ReactNode } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Box, Center, Heading, Icon } from "native-base";


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
    <TouchableOpacity 
      style={{ 
        position: 'absolute', 
        top: Platform.OS === 'android' ? 32 : 48,
      }}>
      <Icon 
        as={Feather}
        name="chevron-left"
        size="lg"
        color="white"
      />
    </TouchableOpacity>
  )
}

export const Header = {
  Root: HeaderRoot,
  Title: HeaderTitle,
  BackButton: HeaderBackButton
}