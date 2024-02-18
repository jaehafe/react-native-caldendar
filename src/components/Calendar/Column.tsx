import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ColumnProps {
  text: number | string;
  color: string;
  opacity: number;
}

const columnSize = 35;

export default function Column({ text, color, opacity }: ColumnProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={[{ color, opacity }]}>{text}</Text>
    </View>
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
