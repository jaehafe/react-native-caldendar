import * as React from 'react';
import { Plus } from 'lucide-react-native';
import {
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { ITEM_WIDTH } from '@/utils';

interface AddTodoInputProps {
  placeholder?: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  onPressAdd: VoidFunction;
  onSubmitEditing: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined;
  onFocus: any;
}

export default function AddTodoInput({
  placeholder,
  value,
  onChangeText,
  onPressAdd,
  onSubmitEditing,
  onFocus,
}: AddTodoInputProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flexDirection: 'row', width: ITEM_WIDTH, alignItems: 'center', alignSelf: 'center' }}>
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={{ padding: 5, flex: 1 }}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={false} // submit을 한 이후 blur false
            onFocus={onFocus}
          />

          <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
            <Plus color="black" size={18} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
