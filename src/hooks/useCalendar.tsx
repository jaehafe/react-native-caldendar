import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface useCalendarProps {
  now: Dayjs;
}

export default function useCalendar({ now }: useCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(now);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(dayjs(date));
    hideDatePicker();
  };

  const subtractOneMonth = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'month');
    setSelectedDate(newSelectedDate);
  };
  const addOneMonth = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, 'month');
    setSelectedDate(newSelectedDate);
  };

  return {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtractOneMonth,
    addOneMonth,
  };
}
