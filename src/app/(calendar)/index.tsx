import * as React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getCalendarColumns, getDayColor, getDayText } from '@/utils';
import dayjs, { Dayjs } from 'dayjs';
import Column from '@/components/Calendar/Column';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import ArrowButton from '@/components/Calendar/ArrowButton';

const columnSize = 35;

export default function CalendarOneScreen() {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const CalendarHeader = () => {
    const currentDateText = dayjs(now).format('YYYY.MM.DD.');

    return (
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ArrowButton onPress={() => {}}>
            <ChevronLeft color={'black'} />
          </ArrowButton>

          <TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.currentText}>{currentDateText}</Text>
            </View>
          </TouchableOpacity>

          <ArrowButton onPress={() => {}}>
            <ChevronRight color={'black'} />
          </ArrowButton>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day, index) => {
            return <Column key={`${day} + ${index}`} text={getDayText(day)} color={getDayColor(day)} opacity={1} />;
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item: date }: { item: Dayjs }) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');

    const isCurrentMonth = dayjs(date).isSame(now, 'month');
    const textOpacity = isCurrentMonth ? 1 : 0.4;

    return <Column key={day} text={dateText} color={getDayColor(day)} opacity={textOpacity} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, index) => `column-${index}`}
        data={columns}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={CalendarHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: columnSize,
    height: columnSize,
    justifyContent: 'center',
    alignItems: 'center',
  },

  CalenderHeaderWrapper: {
    display: 'flex',
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '100%',
    flexDirection: 'row',
  },

  currentText: {
    fontSize: 20,
    color: '#404040',
  },
});
