import colors from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React from "react";
import { Pressable } from "react-native";

type Props = React.ComponentProps<typeof Pressable> & {
    iconName: React.ComponentProps<typeof MaterialIcons>["name"];
    iconSize?: number;
};

export default function CircleButton({
    iconName,
    className,
    iconSize,
    ...props
}: Props) {
    return (
        <Pressable
            className={clsx([
                "rounded-full items-center justify-center p-4",
                className,
            ])}
            style={{ backgroundColor: colors.primary }}
            onPress={() => {}}
        >
            <MaterialIcons
                name={iconName}
                size={iconSize || 28}
                color={colors.primaryForegorund}
            />
        </Pressable>
    );
}
