import { Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Feather } from '@expo/vector-icons';

interface IconButtonProps extends TouchableOpacityProps {
  name: string;
  size?: 'lg' | 'xl'
}

export function IconButton({ name, size = 'lg', ...rest }: IconButtonProps) {
  return (
    <TouchableOpacity {...rest}>
      <Icon 
        as={Feather}
        name={name}
        size={size}
        color="white"
      />
    </TouchableOpacity>
  )
}