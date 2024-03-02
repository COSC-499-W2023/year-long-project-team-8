import React, { useState, useEffect, useRef } from 'react';
import {ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator, View} from 'react-native';
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
import CustomAlertModal from '../CustomAlertModal';

const EditPost = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const { post } = route.params;
  
    // state variables for the post attributes
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
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isContentValid, setIsContentValid] = useState(true);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true); 
    const backArrowIcon = require('../../assets/icons/back-arrow.png');

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false); 
      }, 700); 
  
      return () => clearTimeout(timer);
    }, []);

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
      setTitle(post.title);
      setContent(post.content);
      setSelectedCategories(post.categories ? post.categories.split(',').map(category => category.trim()) : []);
      setSelectedAllergens(post.allergens ? post.allergens.split(',').map(allergen => allergen.trim()) : []);
      if (post.best_before) {
        const date = new Date(post.best_before); 
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        setBestBefore(formattedDate);
        setImages(post.images);
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
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        // Prevent deselecting if this is the last selected category
        if (prevCategories.length === 1) {
          setAlertMessage('At least one category must be selected');
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
        setTitle('');
        setContent('');
        setSelectedCategories([]);
        setSelectedAllergens([]);
        setImages([]);
        setIsContentValid(true);
        setIsTitleValid(true);
      };
    }, [])
  );

  // TODO: Handle post update submission
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
      setAlertMessage('Fill in the missing fields');
      setIsAlertVisible(true);
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      return;
    }
  
    const newPost = {
      title: title,
      content: content,
      categories: selectedCategories.join(', '), 
      allergens: selectedAllergens.join(', '), 
      bestBefore: bestBefore, 
      images: images 
    };
  
    console.log("Updated Post:", newPost);
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

    setIsContentValid(true);
    setIsTitleValid(true);
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
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

    setIsContentValid(true);
    setIsTitleValid(true);
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  if (isLoading) {
    // Display loading indicator while preparing the component
    return (
      <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="orange" style={styles.loader}/>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>

            {/*Title*/}
            <TitleInput title={title} setTitle={setTitle} isValid={isTitleValid} setIsValid={setIsTitleValid}/>

            {/*Description */}
            <DescriptionInput content={content} setContent={setContent} isValid={isContentValid} setIsValid={setIsContentValid}/>

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
            <SubmitButton handleUpdatePost={handleUpdatePost} title={"UPDATE POST"}/>

            {/*Cancel*/}
            <CancelButton handleCancel={handleReset} />

            {/* Custom Alert Modal */}
            <CustomAlertModal
              isVisible={isAlertVisible}
              message={alertMessage}
              onClose={() => setIsAlertVisible(false)}
            />

        </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditPost;
