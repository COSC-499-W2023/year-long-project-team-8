import React, { useState, useEffect, useRef, useContext } from "react";
import {
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { categoryIcons } from "../Categories";
import { allergens } from "../Allergens";
import DatePicker from "./DatePicker";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import CategoriesSelector from "./CategoriesSelector";
import AllergensSelector from "./AllergensSelector";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import ImagePickerComponent from "./ImagePickerComponent";
import styles from "./styles";
import CustomAlertModal from "../CustomAlertModal";
import { updateProduct } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";

const EditPost = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const { post } = route.params;
  const { authTokens } = useContext(AuthContext);

  // state variables for the post attributes
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [bestBefore, setBestBefore] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(post.best_before));
  const [images, setImages] = useState([]);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isContentValid, setIsContentValid] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const backArrowIcon = require("../../assets/icons/back-arrow.png");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [location, setLocation] = useState("");
  const autoCompleteRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

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

  // Function to show the date picker
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  useEffect(() => {
    if (autoCompleteRef.current && post.location) {
      autoCompleteRef.current.setAddressText(post.location);
    }
  }, [post]);
  useEffect(() => {
    if (autoCompleteRef.current && post.location) {
      autoCompleteRef.current.setAddressText(post.location);
    }
  }, []);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setLocation(post.location);
    setLatitude(post.latitude);
    setLongitude(post.longitude);
    setSelectedCategories(
      post.categories
        ? post.categories.split(",").map((category) => category.trim())
        : []
    );
    setSelectedAllergens(
      post.allergens
        ? post.allergens.split(",").map((allergen) => allergen.trim())
        : []
    );
    if (post.best_before) {
      const date = new Date(post.best_before);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      setBestBefore(formattedDate);
      setImages(post.images.map((img) => img.image));
      console.log(post.images.map((img) => img));
    }
  }, [post, route.params]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleCancel}>
          <Image
            source={backArrowIcon}
            style={{ width: 25, height: 25, marginLeft: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleCancel]);

  const availableCategories = Object.keys(categoryIcons);
  const availableAllergens = allergens;

  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        // Prevent deselecting if this is the last selected category
        if (prevCategories.length === 1) {
          setAlertMessage("At least one category must be selected");
          setIsAlertVisible(true);
          return prevCategories;
        }
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

  useFocusEffect(
    React.useCallback(() => {
      const scrollToTop = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
      };

      scrollToTop();

      return () => {
        // Reset the fields to their initial state
        setTitle("");
        setContent("");
        setLatitude("");
        setLongitude("");
        setLocation("");
        setSelectedAllergens([]);
        setImages([]);
        setIsContentValid(true);
        setIsTitleValid(true);
      };
    }, [])
  );

  const handleUpdatePost = async () => {
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

    if (!isValid) {
      setAlertMessage("Fill in the missing fields");
      setIsAlertVisible(true);
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      return;
    }

    let newPost;
    if (latitude && longitude) {
      newPost = {
        title: title,
        content: content,
        categories: selectedCategories.join(", "),
        allergens: selectedAllergens.join(", "),
        best_before: selectedDate.toISOString().split("T")[0],
        latitude: latitude,
        longitude: longitude,
        location: location,
      };
    } else {
      newPost = {
        title: title,
        content: content,
        categories: selectedCategories.join(", "),
        allergens: selectedAllergens.join(", "),
        best_before: selectedDate.toISOString().split("T")[0],
      };
    }

    console.log("new images", images);
    console.log(post.id);

    try {
      const updatedProduct = await updateProduct(
        newPost,
        images,
        authTokens,
        post.id
      );
      console.log("Updated Product:", updatedProduct);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    // Reset title, content, categories, allergens, and best before date
    setTitle(post.title);
    setContent(post.content);
    setLocation(post.location);
    setLatitude(post.latitude);
    setLongitude(post.longitude);
    setSelectedCategories(
      post.categories
        ? post.categories.split(",").map((category) => category.trim())
        : []
    );
    setSelectedAllergens(
      post.allergens
        ? post.allergens.split(",").map((allergen) => allergen.trim())
        : []
    );

    // Reset best before date
    const bestBeforeDate = new Date(post.best_before);
    setBestBefore(
      bestBeforeDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
    setSelectedDate(bestBeforeDate);

    // Reset images
    setImages(post.images.map((img) => img.image));

    setIsContentValid(true);
    setIsTitleValid(true);
    scrollViewRef.current.scrollTo({ y: 0, animated: true });

    if (autoCompleteRef.current && post.location) {
      autoCompleteRef.current.setAddressText(location);
    } else {
      autoCompleteRef.current.setAddressText("");
    }

    navigation.goBack();
  };

  const handleReset = () => {
    // Reset title, content, categories, allergens, and best before date
    setTitle(post.title);
    setContent(post.content);
    setLocation(post.location);
    setLatitude(post.latitude);
    setLongitude(post.longitude);
    setSelectedCategories(
      post.categories
        ? post.categories.split(",").map((category) => category.trim())
        : []
    );
    setSelectedAllergens(
      post.allergens
        ? post.allergens.split(",").map((allergen) => allergen.trim())
        : []
    );

    // Reset best before date
    const bestBeforeDate = new Date(post.best_before);
    setBestBefore(
      bestBeforeDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
    setSelectedDate(bestBeforeDate);

    // Reset images
    setImages(post.images.map((img) => img.image));

    setIsContentValid(true);
    setIsTitleValid(true);
    if (autoCompleteRef.current && post.location) {
      autoCompleteRef.current.setAddressText(post.location);
    } else {
      autoCompleteRef.current.setAddressText("");
    }
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const handleAddressSelection = (data, details = null) => {
    console.log("onpress clicked");
    if (details) {
      const { formatted_address } = details;
      const { geometry } = details;
      const { location } = geometry;
      const { lat, lng } = location;
      setLatitude(lat);
      setLongitude(lng);
      setLocation(formatted_address);
      console.log("formatted address: ", formatted_address);
      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
      console.log("DETAILS", details);

      // You can store lat and lng in state variables or pass them to your form submission function
    }
  };

  if (isLoading) {
    // Display loading indicator while preparing the component
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" style={styles.loader} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        style={styles.scrollContainer}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
      >
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
        <View>
          <Text style={styles.header}>Pick Up Location</Text>
          <GooglePlacesAutocomplete
            ref={autoCompleteRef}
            // defaultValue={location}
            placeholder="Enter your address"
            onPress={handleAddressSelection}
            fetchDetails
            query={{
              key: GOOGLE_API_KEY, //THIS API COSTS MONEY SO DON'T LEAK IT
              language: "en",
              components: "country:ca", // Restrict to Canada
            }}
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
            listViewDisplayed="auto"
            disableScroll={true} // Uncomment this line if necessary
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
            handleUpdatePost={handleUpdatePost}
            title={"UPDATE POST"}
          />

          {/*Cancel*/}
          <CancelButton handleCancel={handleReset} />

          {/* Custom Alert Modal */}
          <CustomAlertModal
            isVisible={isAlertVisible}
            message={alertMessage}
            onClose={() => setIsAlertVisible(false)}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditPost;
