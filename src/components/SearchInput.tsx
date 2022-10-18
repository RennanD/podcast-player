import { Feather } from '@expo/vector-icons';

import { Input as NativeBaseInput, IInputProps, FormControl, Icon } from 'native-base';

export function SearchInput() {
  return (
    <FormControl>
      <NativeBaseInput 
        bg="gray.600"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        rounded="2xl"
        fontFamily="body"
        placeholder='Search'
        placeholderTextColor="gray.400"
        _focus={{
          bgColor: 'gray.600',
          borderWidth: 1,
          borderColor: 'white'
        }}
        InputRightElement={
          <Icon 
            as={Feather}
            name='search'
            color="gray.400"
            mr={4}
            size="md"
          />
        }
      />
    </FormControl>
  );
}