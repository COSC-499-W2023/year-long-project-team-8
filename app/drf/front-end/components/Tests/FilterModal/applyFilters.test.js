import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterModal from '../../homePage/FilterModal';
import { SliderContext } from '../../../context/MapContext';

describe('FilterModal - applyFilters', () => {
  it('applies filters with the set values when the apply button is pressed', () => {
    const setDistanceFilter = jest.fn();
    const setRatingFilter = jest.fn();
    const setAllergensFilter = jest.fn();
    const updateSortOption = jest.fn();
    const onClose = jest.fn();

    const sliderValue = 10;
    const setSliderValue = jest.fn();

    const { getByTestId, getByText } = render(
      <SliderContext.Provider value={{ sliderValue, setSliderValue }}>
        <FilterModal
          isVisible={true}
          onClose={onClose}
          setDistanceFilter={setDistanceFilter}
          setRatingFilter={setRatingFilter}
          setAllergensFilter={setAllergensFilter}
          updateSortOption={updateSortOption}
        />
      </SliderContext.Provider>
    );


    const distanceSlider = getByTestId('distanceSlider');
    fireEvent(distanceSlider, 'valueChange', 15);

    const peanutAllergenButton = getByTestId('allergen-Peanuts');
    fireEvent.press(peanutAllergenButton);

    fireEvent.press(getByTestId('applyButton'));

    expect(setDistanceFilter).toHaveBeenCalledWith(10);
    expect(setRatingFilter).toHaveBeenCalledWith(0);
    expect(setAllergensFilter).toHaveBeenCalledWith(['Peanuts']);
    expect(updateSortOption).toHaveBeenCalledWith('Date');
    expect(onClose).toHaveBeenCalled();
  });
});
