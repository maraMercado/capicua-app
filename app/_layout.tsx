import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { ThemeProvider } from "../themes/ThemeProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'DynaPuff-Bold': require('../assets/fonts/DynaPuff-Bold.ttf'),
    'DynaPuff-Regular': require('../assets/fonts/DynaPuff-Regular.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
      </Stack>
    </ThemeProvider>
  )
}