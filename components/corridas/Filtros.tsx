import React, { useState } from "react";
import { FlatList, Pressable, Text } from "react-native";

const FILTROS = ["Todos", "Hoje", "Esta semana", "Este mês", "Este ano"];

export default function Filtros() {
    const [selecionado, setSelecionado] = useState("Todos");

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={FILTROS}
            keyExtractor={(item) => item}
            contentContainerClassName="gap-2 px-0 pb-4"
            renderItem={({ item }) => (
                <Pressable
                    onPress={() => setSelecionado(item)}
                    className={`rounded-full px-4 py-1.5 border ${
                        selecionado === item
                            ? "bg-primary border-primary"
                            : "bg-transparent border-border"
                    }`}
                >
                    <Text
                        className={`text-sm font-medium ${
                            selecionado === item
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                        }`}
                    >
                        {item}
                    </Text>
                </Pressable>
            )}
        />
    );
}
