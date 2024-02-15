import React, { useState, useEffect, useRef } from 'react';
import {ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { categoryIcons } from "../Categories";
import { allergens } from '../Allergens';
import DatePicker from './DatePicker'; 
import TitleInput from './TitleInput'; 
import DescriptionInput from './DescriptionInput'; 
import CategoriesSelector from './CategoriesSelector'; 
import AllergensSelector from './AllergensSelector'; 
import SubmitButton from './SubmitButton'; 
import CancelButton from './CancelButton'; 
import ImagePickerComponent from './ImagePickerComponent';
import styles from './styles';

const EditPost = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();

  
    // Extract the post from the route parameters
    const { post } = route.params;
  
    // Define state variables for the post attributes
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [bestBefore, setBestBefore] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(post.best_before));
    const [images, setImages] = useState(post.images || []);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const backArrowIcon = require('../../assets/icons/back-arrow.png');

    // Function to handle date change
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || bestBefore;
      setDatePickerVisible(Platform.OS === 'ios');
      setSelectedDate(currentDate);

    // Format the date and update bestBefore state
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      setBestBefore(formattedDate);
    };
    

    // Function to show the date picker
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };

    useEffect(() => {
      // Update state with the new post's information whenever the route parameters change
      setTitle(post.title);
      setContent(post.content);
      setSelectedCategories(post.categories ? post.categories.split(',').map(category => category.trim()) : []);
      setSelectedAllergens(post.allergens ? post.allergens.split(',').map(allergen => allergen.trim()) : []);
      if (post.best_before) {
        const date = new Date(post.best_before); // Corrected line: create a Date object
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        setBestBefore(formattedDate);
      
    }
  
    }, [post, route.params]);

    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={handleCancel}>
            <Image source={backArrowIcon} style={{ width: 25, height: 25, marginLeft: 20 }} />
          </TouchableOpacity>
        ),
      });
    }, [navigation, handleCancel]);
    
  const availableCategories = Object.keys(categoryIcons);
  const availableAllergens = allergens;

  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category],
    );
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
      return () => {
        // This function will be called when the screen goes out of focus
        // Reset the fields to their initial state
        setTitle('');
        setContent('');
        setSelectedCategories([]);
        setSelectedAllergens([]);
      };
    }, [])
  );

  // TODO: Handle post update submission
  const handleUpdatePost = async () => {
    console.log("update post")
  };

  
  const handleCancel = () => {
    // Reset title, content, categories, allergens, and best before date
    setTitle(post.title);
    setContent(post.content);
    setSelectedCategories(post.categories ? post.categories.split(',').map(category => category.trim()) : []);
    setSelectedAllergens(post.allergens ? post.allergens.split(',').map(allergen => allergen.trim()) : []);
    
    // Reset best before date
    const bestBeforeDate = new Date(post.best_before);
    setBestBefore(bestBeforeDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }));
    setSelectedDate(bestBeforeDate);
  
    // Reset images
    setImages(post.images || []);
  
    navigation.goBack();
  };

  const handleReset = () => {
    // Reset title, content, categories, allergens, and best before date
    setTitle(post.title);
    setContent(post.content);
    setSelectedCategories(post.categories ? post.categories.split(',').map(category => category.trim()) : []);
    setSelectedAllergens(post.allergens ? post.allergens.split(',').map(allergen => allergen.trim()) : []);
    
    // Reset best before date
    const bestBeforeDate = new Date(post.best_before);
    setBestBefore(bestBeforeDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }));
    setSelectedDate(bestBeforeDate);
  
    // Reset images
    setImages(post.images || []);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>

            {/*Title*/}
            <TitleInput title={title} setTitle={setTitle} />

            {/*Description */}
            <DescriptionInput content={content} setContent={setContent} />

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
            <SubmitButton handleUpdatePost={handleUpdatePost} />

            {/*Cancel*/}
            <CancelButton handleCancel={handleReset} />

        </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditPost;
