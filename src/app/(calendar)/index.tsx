import * as React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getCalendarColumns, getDayColor, getDayText } from '@/utils';
import dayjs, { Dayjs } from 'dayjs';
import Column from '@/components/Calendar/Column';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import ArrowButton from '@/components/Calendar/ArrowButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useCalendar from '@/hooks/useCalendar';
import useTodoList from '@/hooks/useTodoList';

const columnSize = 35;

export default function CalendarOneScreen() {
  const now = dayjs();

  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtractOneMonth,
    addOneMonth,
  } = useCalendar({ now });
  const {} = useTodoList({ selectedDate });

  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = () => {
    subtractOneMonth();
  };
  const onPressRightArrow = () => {
    addOneMonth();
  };

  const CalendarHeader = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD.');

    return (
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ArrowButton onPress={onPressLeftArrow}>
            <ChevronLeft color={'black'} />
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
  };

  const renderItem = ({ item: date }: { item: Dayjs }) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const textOpacity = isCurrentMonth ? 1 : 0.4;
    const isSelected = dayjs(date).isSame(selectedDate, 'date');

    const onPressDate = () => {
      setSelectedDate(date);
    };

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
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, index) => `column-${index}`}
        data={columns}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={CalendarHeader}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
