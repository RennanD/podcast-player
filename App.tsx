import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';


import { THEME } from './src/theme';
import { Loading } from './src/screens/Loading';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular
  });
  
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        backgroundColor='transparent' 
        barStyle='light-content' 
        translucent 
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}