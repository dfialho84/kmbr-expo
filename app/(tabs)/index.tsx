import HomeHeader from "@/components/home/HomeHeader";
import PeriodoItem from "@/components/home/PeriodoItem";
import { ResumoProvider, useResumoContext } from "@/contexts/resumo-context";
import React from "react";
import { FlatList, View } from "react-native";

function ResumoScreen() {
    const { periodos, hasMore, loadMore } = useResumoContext();

    return (
        <View className="flex-1 bg-background">
            <FlatList
                ListHeaderComponent={<HomeHeader />}
                data={periodos}
                renderItem={({ item }) => <PeriodoItem periodo={item} />}
                keyExtractor={(item) => item.key}
                onEndReached={hasMore ? loadMore : undefined}
                onEndReachedThreshold={0.3}
            />
        </View>
    );
}

export default function Index() {
    return (
        <ResumoProvider>
            <ResumoScreen />
        </ResumoProvider>
    );
}
