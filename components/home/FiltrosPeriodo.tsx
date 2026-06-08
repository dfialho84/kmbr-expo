import { useResumoContext } from "@/contexts/resumo-context";
import { AGRUPAMENTOS } from "@/types/filtro";
import React from "react";
import { FlatList } from "react-native";
import Chip from "../ui/Chip";

export default function FiltrosPeriodo() {
    const { agrupamento, setAgrupamento } = useResumoContext();

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={AGRUPAMENTOS}
            keyExtractor={(item) => item}
            contentContainerClassName="gap-2 pb-4 px-4"
            renderItem={({ item }) => (
                <Chip
                    selecionado={agrupamento === item}
                    label={item}
                    onPress={() => setAgrupamento(item)}
                />
            )}
        />
    );
}
