import React from 'react';
import { Icon, Pressable, Spinner } from 'native-base';

import { Feather } from '@expo/vector-icons';

interface PlayEpisodeButtonProps {
  onPlay: () => void;
  isLoading?: boolean
}

export function PlayEpisodeButton({ onPlay, isLoading = false }: PlayEpisodeButtonProps) {
  return (
    <Pressable 
      h={16} 
      w={16} 
      mx={12} 
      rounded="full" 
      bg="gray.600" 
      alignItems="center" 
      justifyContent="center"
      onPress={onPlay}
    >
      {isLoading 
        ? <Spinner color="white" />
        : <Icon 
            as={Feather}
            color="white"
            size="md"
            name='play'
            ml={1}
          />
      }
    </Pressable>
  );
}