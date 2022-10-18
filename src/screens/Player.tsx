import { 
  Center,
  Heading, 
  HStack, 
  Image, 
  Text, 
  VStack, 
  ScrollView, 
  Box 
} from 'native-base';

import { Audio } from 'expo-av';

import { Header } from '../components/Header';
import { IconButton } from '../components/IconButton';
import { useEffect, useState } from 'react';
import { PlayEpisodeButton } from '../components/PlayEpisodeButton';
import { ControllEpisodeButton, PlayStatus } from '../components/ControllEpisodeButton';


export function Player() {

  const [playingEpisode, setPlayingEpisode] = useState<Audio.Sound>({} as Audio.Sound);
  const [playStatus, setPlayStatus] = useState<PlayStatus>('stoped');
  const [isLoading, setIsLoading] = useState(false)

  async function handlePlayEpisode() {
    try {
      setIsLoading(true)
      const { sound } = await Audio.Sound.createAsync({ uri: 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/audios/typescript.m4a' });
      await sound.playAsync();

      
      setPlayingEpisode(sound);
      setPlayStatus('playing');

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleContollPlayingEpisode() {
    if(playStatus === 'paused') {
      setPlayStatus('playing')
      playingEpisode.playAsync();
      return;
    }

    if(playStatus === 'playing') {
      setPlayStatus('paused')
      playingEpisode.pauseAsync();
      return
    }
  }

  useEffect(() => {
    return playingEpisode._loaded
      ? () => {
          console.log('Unloading Sound');
          playingEpisode.unloadAsync();
        }
      : undefined;
  }, [playingEpisode]);

  return (
    <VStack flex={1} bg="gray.700"  p={8}>

      <Box pb={8}>
        <Header.Root>
          <Header.Title>Tocando Agora</Header.Title>
          <Header.BackButton />
        </Header.Root>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Center mt={8}>
          <Image 
            w="full"
            h={80}
            source={{ uri: 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/autenticacao.jpg' }}
            alt="Capa do podcast"
            rounded="md"
            resizeMode='cover'
          />
        </Center>
        
        <VStack mt={8}>
          <Heading size="xs" color="gray.400" fontFamily="body" >
            Três programadores conversam sobre estratégia de autenticação. Vamos discutir quais aspectos você deve considerar na hora de fazer a sua escolha. A gente passa a maior parte do tempo escrevendo código. 
            Agora chegou o momento de falar sobre isso.
          </Heading>

          <VStack mt={8} w="full" h={1} bg="gray.600">
            <VStack h={1} w={56} bg="white" />
          </VStack>

          <HStack alignItems="center" mt={6} justifyContent="space-between">
            <Text color="white" fontFamily="body">24:32</Text>
            <Text color="white" fontFamily="body">34:00</Text>
          </HStack>
        </VStack>

        <HStack mt={12} alignItems="center" justifyContent="center" w="full">
          <IconButton name="chevron-left" size='xl' />

          {playStatus === 'stoped' && !isLoading
            ? <PlayEpisodeButton onPlay={handlePlayEpisode} isLoading={isLoading} /> 
            : <ControllEpisodeButton onChangePlayState={handleContollPlayingEpisode} playStatus={playStatus} />}

          <IconButton name="chevron-right" size='xl' />
        </HStack>
      </ScrollView>

    </VStack>
  );
} 