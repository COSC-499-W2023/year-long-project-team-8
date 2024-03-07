import React from "react";
import { View, TextInput, Text } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import InputStyles from "./InputStyles.js";
import CustomText from "../CustomText.js";

const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
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
      <View
        style={[
          InputStyles.inputWrapper,
          errorText ? InputStyles.inputWrapperError : null,
        ]}
      >
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
          placeholderTextColor="#808080"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          inputMode={inputMode}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          name={name}
          underlineColorAndroid="transparent"
        />
        {rightComponent}
      </View>
      {errorText && (
        <CustomText style={InputStyles.errorText}>{errorText}</CustomText>
      )}
    </View>
  );
};

InputField.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  errorText: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  inputMode: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  name: PropTypes.string,
  rightComponent: PropTypes.node,
  isErrorIcon: PropTypes.bool,
};

export default InputField;
