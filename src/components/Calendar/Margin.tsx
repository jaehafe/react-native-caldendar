import { StyleSheet, View } from 'react-native';
import React from 'react';

interface MarginProps {
  height: number;
}

export default function Margin({ height }: MarginProps) {
  return <View style={{ height }} />;
}

const styles = StyleSheet.create({});
