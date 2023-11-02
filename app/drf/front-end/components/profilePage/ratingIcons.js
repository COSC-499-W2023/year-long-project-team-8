import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating, onStarPress }) => {
    const maxRating = 5;
    const starElements = [];

    for (let i = 1; i <= maxRating; i++) {
        const isHalfStar = i - 0.5 <= rating && rating < i;
        const isFilledStar = i <= rating;

        starElements.push(
                <Icon
                    name={ isHalfStar ? 'star-half-full' : isFilledStar ? 'star' : 'star-o'}
                    color={'#F8B951'}
                    size={30}
                    marginRight={3}
                    marginLeft={3}
                    key={i}
                />
        );
    }

    return (
        <View style={{flexDirection: 'row'}}>
            {starElements}
        </View>
    );
}

export default StarRating;