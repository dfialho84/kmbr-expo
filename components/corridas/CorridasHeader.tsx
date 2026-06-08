import React from "react";
import { View } from "react-native";
import Filtros from "./Filtros";
import TopPanel from "./TopPanel";

export default function CorridasHeader() {
    return (
        <View className="my-4 border-b border-border px-0 gap-4">
            <TopPanel />
            <Filtros />
        </View>
    );
}
