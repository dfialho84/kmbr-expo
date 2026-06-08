import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TipoDespesa } from "@/types/despesa";

export const TIPO_CONFIG: Record<TipoDespesa, {
    icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    label: string;
}> = {
    Abastecimento: { icon: "gas-station", label: "Abastecimento" },
    Manutenção:    { icon: "wrench",      label: "Manutenção" },
    Outros:        { icon: "dots-horizontal-circle", label: "Outros" },
};
