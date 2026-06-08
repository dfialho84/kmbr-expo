import { FILTROS_TIPO, useDespesasContext } from "@/contexts/despesas-context";
import { FILTROS } from "@/types/filtro";
import React from "react";
import { FlatList } from "react-native";
import Chip from "../ui/Chip";

export default function Filtros() {
    const { filtro, setFiltro, filtroTipo, setFiltroTipo } =
        useDespesasContext();

    return (
        <>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={FILTROS}
                keyExtractor={(item) => item}
                contentContainerClassName="gap-2 pb-2 px-4"
                renderItem={({ item }) => (
                    <Chip
                        selecionado={filtro === item}
                        label={item}
                        onPress={() => setFiltro(item)}
                    />
                )}
            />
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={FILTROS_TIPO}
                keyExtractor={(item) => item}
                contentContainerClassName="gap-2 pb-4 px-4"
                renderItem={({ item }) => (
                    <Chip
                        selecionado={filtroTipo === item}
                        label={item}
                        onPress={() => setFiltroTipo(item)}
                    />
                )}
            />
        </>
    );
}
