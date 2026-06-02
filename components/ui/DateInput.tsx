import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { clsx } from "clsx";
import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
    className?: string;
    placeholder?: string;
    value?: Date;
    onChangeDate?: (date: Date) => void;
    onBlur?: () => void;
};

export default function DateInput({
    className,
    placeholder,
    value,
    onChangeDate,
    onBlur,
}: Props) {
    const [showPicker, setShowPicker] = React.useState(false);

    const handlePress = () => {
        setShowPicker(true);
    };

    function handleChange(event: DateTimePickerEvent, selectedDate?: Date) {
        setShowPicker(false);

        if (selectedDate) {
            onChangeDate?.(selectedDate);
        }
    }

    return (
        <>
            <Pressable
                className={clsx(
                    "border border-border rounded-md px-3 py-2 text-foreground bg-background",
                    className,
                )}
                onPress={handlePress}
                onBlur={onBlur}
            >
                <Text className="text-foreground bg-background">
                    {value ? value.toLocaleDateString() : placeholder}
                </Text>
            </Pressable>
            {showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                />
            )}
        </>
    );
}
