import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function DrawerLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const tintColor = Colors[colorScheme].tint;
  const bgColor = Colors[colorScheme].background;
  const cardColor = Colors[colorScheme].card;
  const textColor = Colors[colorScheme].text;

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: cardColor,
          elevation: 2,
          shadowOpacity: 0.1,
        },
        headerTintColor: textColor,
        drawerStyle: {
          backgroundColor: bgColor,
        },
        drawerActiveTintColor: tintColor,
        drawerInactiveTintColor: Colors[colorScheme].textSecondary,
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Smart Field Survey',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="house.fill" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="camera"
        options={{
          drawerLabel: 'Camera',
          title: 'Camera',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="camera.fill" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="contacts"
        options={{
          drawerLabel: 'Contacts',
          title: 'Contacts',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="person.crop.circle" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="location"
        options={{
          drawerLabel: 'Location',
          title: 'Location',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="location.fill" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="clipboard"
        options={{
          drawerLabel: 'Clipboard',
          title: 'Clipboard',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="doc.on.clipboard.fill" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <IconSymbol name="gear" color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
