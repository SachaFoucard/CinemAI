import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogoScreen from './src/screens/Onboarding/LogoScreen'
import SignInScreen from './src/screens/Onboarding/SignInScreen'
import SignUpScreen from './src/screens/Onboarding/SignUpScreen'
import WelcomeScreen from './src/screens/Onboarding/WelcomeScreen'
import Home from './src/screens/Home/Home'
import Explore from './src/screens/Explore/Explore'
import Map from './src/screens/Map/Map'
import AI from './src/screens/AI/Ai'
import Favorite from './src/screens/Favorites/List'
import Profil from './src/screens/Profil/Profil'
import Ionicons from 'react-native-vector-icons/Ionicons';
import  UserContextProvider from './src/context/UserContext'
import InterestScreen from './src/screens/AccountSetUp.jsx/InterestScreen'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="OnBoardingScreens" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnBoardingScreens" component={OnBoarding} />
            <Stack.Screen name="TabMenu" component={TabMenu} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </>
  );
}
function OnBoarding() {
  return (
    <>
      <Stack.Navigator initialRouteName="LogoScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoarding" component={LogoScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="InterestScreen" component={InterestScreen}/>
      </Stack.Navigator>
    </>
  )
}

const Tab = createBottomTabNavigator();

function TabMenu() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') { iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline'; }
            else if (route.name === 'Explore') { iconName = focused ? 'ios-list' : 'ios-list-outline'; }
            else if (route.name === 'Map') { iconName = focused ? 'ios-list' : 'ios-list-outline'; }
            else if (route.name === 'Favorite') { iconName = focused ? 'ios-list' : 'ios-list-outline'; }
            else if (route.name === 'AI') { iconName = focused ? 'ios-list' : 'ios-list-outline'; }
            else if (route.name === 'Profil') { iconName = focused ? 'ios-list' : 'ios-list-outline'; }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#E21121',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="AI" component={AI} />
        <Tab.Screen name="Favorite" component={Favorite} />
        <Tab.Screen name="Profil" component={Profil} />
      </Tab.Navigator>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
