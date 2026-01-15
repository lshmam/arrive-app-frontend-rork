import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="create-listing"
        options={{
          title: "Create Listing",
          presentation: "modal"
        }}
      />
      <Stack.Screen
        name="listing-detail"
        options={{
          title: "Listing Details",
          presentation: "card"
        }}
      />
      <Stack.Screen
        name="booking"
        options={{
          title: "Book Parking",
          presentation: "card"
        }}
      />
      <Stack.Screen
        name="booking-confirmation"
        options={{
          title: "Booking Confirmed",
          headerShown: false
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
