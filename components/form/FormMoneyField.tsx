import Label from "@/components/ui/Label";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";
import MoneyInput from "../ui/MoneyInput";
import ErrorLabel from "./ErrorLabel";

type Props<T extends FieldValues> = React.ComponentProps<typeof View> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
};

export default function FormMoneyField<T extends FieldValues>({
    control,
    name,
    label,
    ...props
}: Props<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <View {...props}>
                    <Label>{label}</Label>
                    <MoneyInput
                        value={field.value}
                        onChangeValue={field.onChange}
                        onBlur={field.onBlur}
                    />
                    {fieldState.error && (
                        <ErrorLabel
                            error={fieldState.error.message || "Campo inválido"}
                        />
                    )}
                </View>
            )}
        />
    );
}
