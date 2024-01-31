import React from "react";
import { View, TextInput, Text } from "react-native";
import PropTypes from "prop-types";
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
  isErrorIcon, 
}) => {
  return (
    <View>
      <View style={[InputStyles.inputWrapper]}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color={isErrorIcon ? "red" : "gray"} // Use isErrorIcon to determine color
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

InputField.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  errorText: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  inputMode: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  name: PropTypes.string,
  rightComponent: PropTypes.node,
};

export default InputField;
