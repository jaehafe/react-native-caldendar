import * as React from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native';

interface ArrowButtonProps {
  children: React.ReactNode;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export default function ArrowButton({ children, onPress }: ArrowButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 15 }}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
