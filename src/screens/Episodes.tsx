import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList, Heading, HStack, Image, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { SearchInput } from '../components/SearchInput';
import { Episode } from '../dtos/EpisodeDto';
import { api } from '../services/api';

export function Episodes() {

  const navigation = useNavigation();
  const [episodes, setEpisodes] = useState<Episode[]>([])

  function handleShowEpisode(episode: Episode) {
    navigation.navigate('player', { episode });
  }

  useEffect(() => {
    api.get('/episodes').then(response => {
      setEpisodes(response.data)
    })
  },[])

  return (
    <VStack flex={1} bg="gray.700">

      <VStack p={8}>
        <Header.Root>
          <Header.Title>Episódios</Header.Title>
        </Header.Root>

        <Box mt={9}>
          <SearchInput />
        </Box>

        <Heading mt={12} size="md" fontFamily="heading" color="white">
          Todos os Episódios
        </Heading>
      </VStack>

      <Box>
        <FlatList 
          data={episodes}
          keyExtractor={item => String(item.id)}
          horizontal
          ml={8}
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{
            pr: 32
          }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleShowEpisode(item)}>
              <VStack w={40} mr={3}>
                <Image 
                  source={{ uri: item.thumbnail }}
                  alt="Capa do podcast"
                  w={40}
                  h={40}
                  rounded="md"
                  resizeMode='cover'
                />

                <Heading mt={2} color="white" size="xs" fontFamily="heading" numberOfLines={3}>
                  {item.title}
                </Heading>
              </VStack>
            </TouchableOpacity>
          )}

        />
      </Box>
    </VStack>
  );
}