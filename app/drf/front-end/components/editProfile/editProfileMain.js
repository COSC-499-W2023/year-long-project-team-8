import React, {useEffect, useState} from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, BackHandler } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import styles from "./editProfileStyles";

const EditProfilePage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleBackPress = () => {
      goBack();
      return true; // Prevent default behavior (exit the app)
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(true);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image source={require("../../assets/back_arrow.png")} style={styles.backArrow} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nameTextContainer}>
        <Text style={styles.firstName}>First Name</Text>
        <Text style={styles.lastName}>Last Name</Text>
      </View>
      <View style={styles.nameInputContainer}>
        <TextInput style={styles.firstNameInput}/>
        <TextInput style={styles.lastNameInput}/>
      </View>
      <View style={styles.phoneNumberTextContainer}>
        <Text style={styles.countryCode}>Country</Text>
        <Text style={styles.phoneNumber}>Phone Number </Text>
      </View>
        <View style={styles.phoneNumberInputContainer}>
            {/*}
<DropDownPicker
  items={[
    { label: 'USA', value: '+1' },

  ]}
  defaultValue="+1"
  containerStyle={styles.countryCodePickerContainer}
  style={styles.countryCodePicker}
  itemStyle={styles.countryCodePickerItem}
  dropDownStyle={styles.countryCodePickerDropDown}
  onChangeItem={(item) => console.log(item.label, item.value)}

  // Additional props
  open={open}
  setOpen={setOpen}
  setValue={setValue}
  value={value}
/>



          <TextInput style={styles.phoneNumberInput}/>
          */}


        </View>
    </SafeAreaView>
  );
};

export default EditProfilePage;
