import { Tabs } from "expo-router";
import { Map, Calendar, User } from "lucide-react-native";
import React from "react";

export default function RenterTabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#000",
                headerShown: true,
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    borderTopWidth: 1,
                    borderTopColor: '#F0F0F0',
                    paddingBottom: 8,
                    height: 64,
                },
            }}
        >
            <Tabs.Screen
                name="map"
                options={{
                    title: "Find Parking",
                    tabBarIcon: ({ color }) => <Map size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="bookings"
                options={{
                    title: "Bookings",
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
        </Tabs>
    );
}
