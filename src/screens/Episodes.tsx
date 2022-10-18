import { TouchableOpacity } from 'react-native';
import { Box, FlatList, Heading, HStack, Image, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { SearchInput } from '../components/SearchInput';

export function Episodes() {

  const navigation = useNavigation();

  function handleShowEpisode() {
    navigation.navigate('player');
  }

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
          data={[1, 2, 3, 4, 5]}
          keyExtractor={item => String(item)}
          horizontal
          ml={8}
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{
            pr: 32
          }}
          renderItem={() => (
            <TouchableOpacity onPress={() => handleShowEpisode()}>
              <VStack w={40} mr={3}>
                <Image 
                  source={{ uri: 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/typescript.jpg' }}
                  alt="Capa do podcast"
                  w={40}
                  h={40}
                  rounded="md"
                  resizeMode='cover'
                />

                <Heading color="white" size="xs" fontFamily="heading" numberOfLines={3}>
                  Três programadores conversam sobre estratégia de autenticação. Vamos discutir quais aspectos você deve considerar na hora de fazer a sua escolha. A gente passa a maior parte do tempo escrevendo código. Agora chegou o momento de falar sobre isso.
                </Heading>
              </VStack>
            </TouchableOpacity>
          )}

        />
      </Box>
    </VStack>
  );
}