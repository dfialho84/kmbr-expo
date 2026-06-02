import { clsx } from "clsx";
import React from "react";
import { TextInput as RNTextInput } from "react-native";

type Props = {
    className?: string;
    value?: number;
    onChangeValue?: (value: number) => void;
    onBlur?: () => void;
};

function formatCentavos(centavos: number): string {
    const reais = Math.floor(centavos / 100);
    const cents = centavos % 100;
    return `${reais},${String(cents).padStart(2, "0")}`;
}

export default function MoneyInput({ className, value, onChangeValue, onBlur }: Props) {
    const centavos = value != null ? Math.round(value * 100) : 0;

    function handleChangeText(text: string) {
        const digits = text.replace(/\D/g, "");
        const newCentavos = parseInt(digits || "0", 10);
        onChangeValue?.(newCentavos / 100);
    }

    return (
        <RNTextInput
            className={clsx(
                "border border-border rounded-md px-3 py-2 text-foreground bg-background",
                className,
            )}
            value={formatCentavos(centavos)}
            onChangeText={handleChangeText}
            keyboardType="numeric"
            onBlur={onBlur}
        />
    );
}
