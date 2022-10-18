import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Episodes } from '../screens/Episodes';
import { Player } from '../screens/Player';

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen 
          name='episodes'
          component={Episodes}
        />
        
        <Screen
          name='player'
          component={Player}
        />
      </Navigator>
    </NavigationContainer>
  )
}