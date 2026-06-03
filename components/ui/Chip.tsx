import { clsx } from "clsx";
import React from "react";
import { Pressable, Text } from "react-native";

type Props = React.ComponentProps<typeof Pressable> & {
    label: string;
    selecionado: boolean;
};

export default function Chip({
    label,
    selecionado,
    className,
    ...props
}: Props) {
    return (
        <Pressable
            className={clsx([
                "rounded-full px-4 py-1.5 border",
                selecionado
                    ? "bg-primary border-primary"
                    : "bg-transparent border-border",
                className,
            ])}
            {...props}
        >
            <Text
                className={clsx([
                    "text-sm font-medium",
                    selecionado
                        ? "text-primary-foreground"
                        : "text-muted-foreground",
                    className,
                ])}
            >
                {label}
            </Text>
        </Pressable>
    );
}
