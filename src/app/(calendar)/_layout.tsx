import { Link, Tabs } from 'expo-router';
import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Calendar, CheckCircle2, CheckSquare2 } from 'lucide-react-native';

export default function CalendarLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
          headerRight: () => (
            <Link href={'/modal'} asChild>
              <Pressable>
                {({ pressed }) => (
                  <CheckCircle2 color={'blue'} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="todo"
        options={{
          title: 'Todo',
          tabBarIcon: ({ color }) => <CheckSquare2 color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
