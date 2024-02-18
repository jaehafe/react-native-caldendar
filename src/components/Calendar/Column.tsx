import * as React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ColumnProps {
  text: number | string;
  color: string;
  opacity: number;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  isSelected?: boolean;
}

const columnSize = 35;

export default function Column({ text, color, opacity, disabled, onPress, isSelected }: ColumnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.wrapper,
        { backgroundColor: isSelected ? '#c2c2c2' : 'transparent', borderRadius: columnSize / 2 },
      ]}
    >
      <Text style={[{ color, opacity }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: columnSize,
    height: columnSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
