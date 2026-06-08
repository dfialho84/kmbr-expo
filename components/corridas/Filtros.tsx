import { useCorridasContext } from "@/contexts/corridas-context";
import { FILTROS } from "@/types/filtro";
import React from "react";
import { FlatList } from "react-native";
import Chip from "../ui/Chip";

export default function Filtros() {
    const { filtro: selecionado, setFiltro: onChangeFiltro } =
        useCorridasContext();
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={FILTROS}
            keyExtractor={(item) => item}
            contentContainerClassName="gap-2 pb-4 px-4"
            renderItem={({ item }) => (
                <Chip
                    selecionado={selecionado === item}
                    label={item}
                    onPress={() => onChangeFiltro(item)}
                />
            )}
        />
    );
}
