import * as React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import { getCalendarColumns, getDayColor, getDayText } from '@/utils';
import ArrowButton from './ArrowButton';
import Column from './Column';

interface CalendarProps {
  selectedDate: Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  showDatePicker: VoidFunction;
  onPressLeftArrow: VoidFunction;
  onPressRightArrow: VoidFunction;
}

export default function Calendar({
  selectedDate,
  setSelectedDate,
  showDatePicker,
  onPressLeftArrow,
  onPressRightArrow,
}: CalendarProps) {
  const columns = getCalendarColumns(selectedDate);

  function CalendarHeader() {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD.');

    return (
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ArrowButton onPress={onPressLeftArrow}>
            <ChevronLeft color="black" />
          </ArrowButton>

          <TouchableOpacity onPress={showDatePicker}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.currentText}>{currentDateText}</Text>
            </View>
          </TouchableOpacity>

          <ArrowButton onPress={onPressRightArrow}>
            <ChevronRight color={'black'} />
          </ArrowButton>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day, index) => {
            return (
              <Column disabled key={`${day} + ${index}`} text={getDayText(day)} color={getDayColor(day)} opacity={1} />
            );
          })}
        </View>
      </View>
    );
  }

  const renderItem = ({ item: date }: { item: Dayjs }) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const textOpacity = isCurrentMonth ? 1 : 0.4;
    const isSelected = dayjs(date).isSame(selectedDate, 'date');

    const onPressDate = () => setSelectedDate(date);

    return (
      <Column
        isSelected={isSelected}
        onPress={onPressDate}
        key={day}
        text={dateText}
        color={getDayColor(day)}
        opacity={textOpacity}
      />
    );
  };

  return (
    <FlatList
      scrollEnabled={false}
      keyExtractor={(_, index) => `column-${index}`}
      data={columns}
      numColumns={7}
      renderItem={renderItem}
      ListHeaderComponent={CalendarHeader}
    />
  );
}

const styles = StyleSheet.create({
  currentText: {
    fontSize: 20,
    color: '#404040',
  },
});
