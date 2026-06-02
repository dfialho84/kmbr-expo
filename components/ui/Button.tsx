import { clsx } from "clsx";
import React from "react";
import { Pressable, Text } from "react-native";

type Variant = "primary" | "secondary";

const variantStyles: Record<Variant, { container: string; label: string }> = {
    primary: {
        container: "bg-primary active:bg-primary-600",
        label: "text-primary-foreground",
    },
    secondary: {
        container: "bg-secondary border border-border active:bg-gray-200",
        label: "text-secondary-foreground",
    },
};

type Props = React.ComponentProps<typeof Pressable> & {
    label: string;
    variant?: Variant;
};

export default function Button({
    label,
    variant = "primary",
    className,
    ...props
}: Props) {
    const styles = variantStyles[variant];
    return (
        <Pressable
            className={clsx([
                "px-4 py-3 rounded-lg items-center justify-center",
                styles.container,
                className,
            ])}
            {...props}
        >
            <Text className={clsx(["text-sm font-semibold", styles.label])}>
                {label}
            </Text>
        </Pressable>
    );
}
