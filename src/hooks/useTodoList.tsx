import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface useTodoListProps {
  selectedDate: Dayjs;
}

export interface TodoItemType {
  id: number;
  content: string;
  date: Dayjs;
  isSuccess: boolean;
}

const defaultTodoList = [
  { id: 1, content: 'react', date: dayjs(), isSuccess: true },
  { id: 2, content: 'docker', date: dayjs(), isSuccess: true },
  { id: 3, content: 'aws', date: dayjs(), isSuccess: false },
  { id: 4, content: 'Java', date: dayjs(), isSuccess: true },
  { id: 5, content: 'React-Native', date: dayjs(), isSuccess: false },
  { id: 6, content: 'tamagui', date: dayjs(), isSuccess: false },
];

export default function useTodoList({ selectedDate }: useTodoListProps) {
  const [todoList, setTodoList] = React.useState(defaultTodoList);
  const [input, setInput] = React.useState('');

  const addTodo = () => {
    const len = todoList.length;
    const lastId = len === 0 ? 0 : todoList[len - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id: lastId + 1,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];

    setTodoList(newTodoList);
  };

  const removeTodo = (todoId: number) => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
  };

  const toggleTodo = (todoId: number) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id !== todoId) return todo;

      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      };
    });

    setTodoList(newTodoList);
  };

  const resetInput = () => {
    setInput('');
  };

  const filteredTodoList = todoList.filter((todo) => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, 'date');
    return isSameDate;
  });

  return {
    filteredTodoList,
    input,
    setInput,
    addTodo,
    removeTodo,
    toggleTodo,
    resetInput,
  };
}
