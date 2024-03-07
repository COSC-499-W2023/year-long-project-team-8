import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { categoryIcons } from "../Categories";
import { allergens } from "../Allergens";
import DatePicker from "../editPost/DatePicker";
import TitleInput from "../editPost/TitleInput";
import DescriptionInput from "../editPost/DescriptionInput";
import CategoriesSelector from "../editPost/CategoriesSelector";
import AllergensSelector from "../editPost/AllergensSelector";
import SubmitButton from "../editPost/SubmitButton";
import CancelButton from "../editPost/CancelButton";
import ImagePickerComponent from "../editPost/ImagePickerComponent";
import styles from "../editPost/styles";
import CustomAlertModal from "../CustomAlertModal";
import { createProductImages } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext"; // Import AuthContext
import { useAppState } from "../../context/AppStateContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AddListing = ({ navigation, onPostCreation }) => {
  // state variables for the post attributes
  const scrollViewRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [images, setImages] = useState([]);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [bestBefore, setBestBefore] = useState(
    tomorrow.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isContentValid, setIsContentValid] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const { authTokens, userId } = useContext(AuthContext);
  const { updatePostCreated } = useAppState();

  // Set tomorrow's date as the default selected date
  useEffect(() => {
    setSelectedDate(tomorrow);
  }, []);

  // Function to show the date picker
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const availableCategories = Object.keys(categoryIcons);
  const availableAllergens = allergens;

  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const toggleAllergen = (allergen) => {
    setSelectedAllergens((prevAllergens) => {
      if (!prevAllergens) {
        return [allergen];
      }
      return prevAllergens.includes(allergen)
        ? prevAllergens.filter((a) => a !== allergen)
        : [...prevAllergens, allergen];
    });
  };

  // Function to handle date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bestBefore;
    setDatePickerVisible(Platform.OS === "ios");
    setSelectedDate(currentDate);

    // Format the date and update bestBefore state
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setBestBefore(formattedDate);
  };

  //Form submittion logic
  const handlePost = async () => {
    let isValid = true;

    if (!title.trim()) {
      setIsTitleValid(false);
      isValid = false;
    } else {
      setIsTitleValid(true);
    }

    if (!content.trim()) {
      setIsContentValid(false);
      isValid = false;
    } else {
      setIsContentValid(true);
    }

    if (selectedCategories.length === 0) {
      setAlertMessage("Please select at least one category");
      setIsAlertVisible(true);
      isValid = false;
    }

    if (images.length === 0) {
      setAlertMessage("Please upload at least one image");
      setIsAlertVisible(true);
      isValid = false;
    }

    if (!isValid) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      return;
    }

    const formData = {
      title: title,
      content: content,
      categories: selectedCategories,
      allergens: selectedAllergens,
      best_before: selectedDate.toISOString().split("T")[0],
      owner: userId,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      await createProductImages(formData, images, authTokens);
      await updatePostCreated();
      console.log("Form Data:", JSON.stringify(formData, null, 2));
      console.log("Image Data:", JSON.stringify(images, null, 2));
      handleReset();
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error creating product images:", error);
    }
  };

  // Function to reset the form
  const handleReset = () => {
    // Reset title, content, categories, allergens, and best before date
    setTitle("");
    setContent("");
    setSelectedCategories([]);
    setSelectedAllergens([]);

    // Reset best before date to tomorrow
    setSelectedDate(tomorrow);
    setBestBefore(
      tomorrow.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );

    // Reset images
    setImages([]);

    setIsContentValid(true);
    setIsTitleValid(true);
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const handleAddressSelection = (data, details = null) => {
    if (details) {
      const { geometry } = details;
      const { location } = geometry;
      const { lat, lng } = location;
      setLatitude(lat);
      setLongitude(lng);
      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
      // You can store lat and lng in state variables or pass them to your form submission function
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Enter Address"
          onPress={handleAddressSelection}
          // onPress={(data, details = null) => {
          //   // Handle selection of address here
          //   console.log(data, details);
          // }}
          query={{
            key: "AIzaSyBB5vOjixk-P19lYhkkiO7EVYfRu-4yp60", //THIS API COSTS MONEY SO DON'T LEAK IT
            language: "en",
            components: "country:ca", // Restrict to Canada
          }}
          fetchDetails
          styles={{
            textInputContainer: {
              width: "100%",
              backgroundColor: "rgba(0,0,0,0)",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
        <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>
          {/*Title*/}
          <TitleInput
            title={title}
            setTitle={setTitle}
            isValid={isTitleValid}
            setIsValid={setIsTitleValid}
          />

          {/*Description */}
          <DescriptionInput
            content={content}
            setContent={setContent}
            isValid={isContentValid}
            setIsValid={setIsContentValid}
          />

          {/* Categories */}
          <CategoriesSelector
            availableCategories={availableCategories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
          />

          {/*Allergens*/}
          <AllergensSelector
            availableAllergens={availableAllergens}
            selectedAllergens={selectedAllergens}
            toggleAllergen={toggleAllergen}
          />

          {/*Date*/}
          <DatePicker
            bestBefore={bestBefore}
            setBestBefore={setBestBefore}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            showDatePicker={showDatePicker}
            isDatePickerVisible={isDatePickerVisible}
            minimumDate={tomorrow}
          />

          {/*Images*/}
          <ImagePickerComponent
            images={images}
            onImagesUpdated={(newImages) => setImages(newImages)}
          />

          {/*Submit*/}
          <SubmitButton
            handleUpdatePost={handlePost}
            title={"PASS THE PLATE"}
          />

          {/*Cancel*/}
          <CancelButton handleCancel={handleReset} />

          {/* Custom Alert Modal */}
          <CustomAlertModal
            isVisible={isAlertVisible}
            message={alertMessage}
            onClose={() => setIsAlertVisible(false)}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddListing;
