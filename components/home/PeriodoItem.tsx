import { PeriodoSummary } from "@/contexts/resumo-context";
import { clsx } from "clsx";
import React from "react";
import { Text, View } from "react-native";

function formatCurrency(value: number): string {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

type Props = {
    periodo: PeriodoSummary;
};

export default function PeriodoItem({ periodo }: Props) {
    const saldoPositivo = periodo.saldo >= 0;

    return (
        <View className="mx-4 mb-3 rounded-xl bg-card p-4 border border-border">
            <Text className="text-base font-semibold text-foreground mb-3">
                {periodo.label}
            </Text>
            <View className="flex-row justify-between mb-1">
                <Text className="text-sm text-muted-foreground">Receitas</Text>
                <Text className="text-sm text-green-600 font-medium">
                    {formatCurrency(periodo.receitas)}
                </Text>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text className="text-sm text-muted-foreground">Despesas</Text>
                <Text className="text-sm text-red-500 font-medium">
                    {formatCurrency(periodo.despesas)}
                </Text>
            </View>
            <View className="border-t border-border pt-2 flex-row justify-between">
                <Text className="text-sm font-semibold text-foreground">
                    Saldo
                </Text>
                <Text
                    className={clsx(
                        "text-sm font-bold",
                        saldoPositivo ? "text-green-600" : "text-red-500",
                    )}
                >
                    {formatCurrency(periodo.saldo)}
                </Text>
            </View>
        </View>
    );
}
