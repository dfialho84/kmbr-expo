import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="corridas"
                options={{
                    title: "Corridas",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="directions-car" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="despesas"
                options={{
                    title: "Despesas",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="account-balance-wallet" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
