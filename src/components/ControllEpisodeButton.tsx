import React from 'react';
import { Icon, Pressable } from 'native-base';

import { Feather } from '@expo/vector-icons';

export type PlayStatus = 'playing' | 'paused' | 'stoped';

interface ControllEpisodeButtonProps {
  onChangePlayState: () => void;
  playStatus: PlayStatus
}

export function ControllEpisodeButton({ onChangePlayState, playStatus }: ControllEpisodeButtonProps) {
  return (
    <Pressable 
      h={16} 
      w={16} 
      mx={12} 
      rounded="full" 
      bg="gray.600" 
      alignItems="center" 
      justifyContent="center"
      onPress={onChangePlayState}
      _pressed={{
        opacity: 0.7
      }}
    >
      <Icon 
        as={Feather}
        color="white"
        size="md"
        name={playStatus !== 'playing' ? 'play' : 'pause'}
        ml={playStatus !== 'playing' ? 1 : 0}
      />
    </Pressable>
  );
}