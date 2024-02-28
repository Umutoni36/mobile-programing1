import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import CamerasScreen from './CamerasScreen';
import PhotosScreen from './PhotosScreen';
import ContactsScreen from './ContactsScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Cameras') {
              iconName = 'camera';
            } else if (route.name === 'Photos') {
              iconName = 'picture';
            } else if (route.name === 'Contacts') {
              iconName = 'contacts';
            }

            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Cameras" component={CamerasScreen} />
        <Tab.Screen name="Photos" component={PhotosScreen} />
        <Tab.Screen name="Contacts" component={ContactsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
