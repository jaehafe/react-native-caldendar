import * as React from 'react';
import { FlatList, StyleSheet, View, Text, Pressable, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { Check } from 'lucide-react-native';

import useCalendar from '@/hooks/useCalendar';
import useTodoList, { TodoItemType } from '@/hooks/useTodoList';
import Calendar from '@/components/Calendar/Calendar';
import Margin from '@/components/Calendar/Margin';
import AddTodoInput from '@/components/Calendar/AddTodoInput';
import { ITEM_WIDTH } from '@/utils';

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
  const { filteredTodoList, input, setInput, addTodo, removeTodo, toggleTodo, resetInput } = useTodoList({
    selectedDate,
  });

  const flatListRef = React.useRef<any>(null);
  const onPressLeftArrow = () => subtractOneMonth();
  const onPressRightArrow = () => addOneMonth();

  const renderItem = ({ item: todo }: { item: TodoItemType }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert('삭제하시겠어요?', '', [
        {
          style: 'cancel',
          text: '아니오',
        },
        {
          text: '네',
          onPress: () => removeTodo(todo.id),
        },
      ]);
    };
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          width: ITEM_WIDTH,
          flexDirection: 'row',
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: '#a6a6a6',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 14, color: '#595959' }}>{todo.content}</Text>

        <Check color={isSuccess ? '#595959' : '#bfbfbf'} size={14} />
      </Pressable>
    );
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };
  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };

  const onFocus = () => {
    scrollToEnd();
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showDatePicker={showDatePicker}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
      />
      <Margin height={15} />

      <View style={{ width: 4, height: 4, borderRadius: 10 / 2, backgroundColor: '#a3a3a3' }}>
        <Margin height={20} />
      </View>

      <AddTodoInput
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        onPressAdd={onPressAdd}
        placeholder={`${dayjs(selectedDate).format('MM.D')}에 추가할 Todo`}
        value={input}
        onChangeText={setInput}
      />

      <FlatList
        ref={flatListRef}
        data={filteredTodoList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 50 }} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wrapper: {
    width: columnSize,
    height: columnSize,
    justifyContent: 'center',
    alignItems: 'center',
  },

  safeAreaWrapper: {
    flex: 1,
  },
  CalenderHeaderWrapper: {
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },

  currentText: {
    fontSize: 20,
    color: '#404040',
  },
});
