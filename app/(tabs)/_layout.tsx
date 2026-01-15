import { Tabs } from "expo-router";
import { Calendar, Home, MapPin, Plus, User } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#EAB308",
        tabBarInactiveTintColor: "#666",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 20,
          height: 85,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <MapPin size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create-listing-modal"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('create-listing');
          },
        })}
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View style={{
              width: 50,
              height: 50,
              backgroundColor: '#EAB308',
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <Plus size={30} color="#000" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />

      {/* Hidden tabs that we might still want accessible via deep link or temporarily */}
      <Tabs.Screen name="dashboard" options={{ href: null }} />
      <Tabs.Screen name="listings" options={{ href: null }} />
      <Tabs.Screen name="bookings" options={{ href: null }} />
      <Tabs.Screen name="earnings" options={{ href: null }} />
    </Tabs>
  );
}
