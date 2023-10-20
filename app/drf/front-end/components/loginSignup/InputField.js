import React from "react";
import { View, TextInput, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import InputStyles from "./InputStyles";

const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  onFocus,
  errorText,
  secureTextEntry,
  inputMode,
  autoCapitalize,
  autoCorrect,
  name,
  rightComponent,
}) => {
  return (
    <View>
      <View style={[InputStyles.inputWrapper]}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color={errorText ? "red" : "gray"}
            style={InputStyles.iconForm}
          />
        )}
        <TextInput
          style={[InputStyles.input, errorText ? InputStyles.inputError : null]}
          placeholder={placeholder.toUpperCase()}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          inputMode={inputMode}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          name={name}
          underlineColorAndroid="transparent"
        />
        {rightComponent}
      </View>
      {errorText && <Text style={InputStyles.errorText}>{errorText}</Text>}
    </View>
  );
};

export default InputField;
