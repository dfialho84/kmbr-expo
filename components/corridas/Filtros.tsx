import { useCorridasContext } from "@/contexts/corridas-context";
import { FILTROS } from "@/types/filtro";
import React from "react";
import { FlatList, Pressable, Text } from "react-native";

export default function Filtros() {
    const { filtro: selecionado, setFiltro: onChangeFiltro } =
        useCorridasContext();
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={FILTROS}
            keyExtractor={(item) => item}
            contentContainerClassName="gap-2 px-0 pb-4"
            renderItem={({ item }) => (
                <Pressable
                    onPress={() => onChangeFiltro(item)}
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
