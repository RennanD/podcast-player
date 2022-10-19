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
import { convertDuration } from '../utils/convertDuration';
import { Loading } from './Loading';
import { Episode } from '../dtos/EpisodeDto';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
  episode: Episode
}

type StatusUpdateProps = {
  positionMillis: number
}

export function Player() {

  const route = useRoute();

  const { episode } = route.params as RouteParams


  const [playingEpisode, setPlayingEpisode] = useState<Audio.Sound>({} as Audio.Sound);
  const [playStatus, setPlayStatus] = useState<PlayStatus>('stoped');
  const [isLoading, setIsLoading] = useState(false);
  const [progressInSeconds, setProgressInSeconds] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  function convertProgress(progessInMillis: number) {

    const progressSeconds = (progessInMillis / 1000);

    const convertedProgressPercent = (progressSeconds * 100) / episode.file.duration


    setProgressInSeconds(Math.floor(progressSeconds))
    setProgressPercent(convertedProgressPercent)
  
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
    async function handlePlayEpisode() {
      try {
        setIsLoading(true)
        const { sound } = await Audio.Sound.createAsync({ uri: episode.file.url });
        await sound.playAsync();
        
        setPlayingEpisode(sound);
        setPlayStatus('playing');
  
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    handlePlayEpisode()
  },[])

  useEffect(() => {
    if(playingEpisode._loaded) {
      playingEpisode.setOnPlaybackStatusUpdate(statusUpdate => {
        const { positionMillis } = statusUpdate as StatusUpdateProps;
        convertProgress(positionMillis)
      })
    }
  },[playingEpisode._loaded])

  useEffect(() => {
    return playingEpisode._loaded
      ? () => {
          console.log('Unloading Sound');
          playingEpisode.unloadAsync();
        }
      : undefined;
  }, [playingEpisode]);

  if( isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700" p={8}>

      <Box pb={8}>
        <Header.Root>
          <Header.Title>Tocando Agora</Header.Title>
          <Header.BackButton />
        </Header.Root>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Center mt={8}>
          <Image 
            w={64}
            h={64}
            source={{ uri: episode.thumbnail }}
            alt="Capa do podcast"
            rounded="md"
            resizeMode='cover'
          />
        </Center>
        
        <VStack mt={8}>
          <Heading size="sm" mb={4} color="white" fontFamily="heading">
            {episode.title}
          </Heading>

          <Text color="gray.400" fontFamily="body" mb={12}>
            {episode.description}
          </Text>

          <VStack w="full" h={1} bg="gray.600">
            <VStack style={{ width: `${progressPercent}%` }} h={1} bg="white" />
          </VStack>

          <HStack alignItems="center" mt={6} justifyContent="space-between">
            <Text color="white" fontFamily="body">{convertDuration(progressInSeconds)}</Text>
            <Text color="white" fontFamily="body">{convertDuration(episode.file.duration)}</Text>
          </HStack>
        </VStack>

        <HStack mt={12} alignItems="center" justifyContent="center" w="full">
          <IconButton name="chevron-left" size='xl' />

          <ControllEpisodeButton 
            onChangePlayState={handleContollPlayingEpisode} 
            playStatus={playStatus} 
          />

          <IconButton name="chevron-right" size='xl' />
        </HStack>
      </ScrollView>

    </VStack>
  );
} 