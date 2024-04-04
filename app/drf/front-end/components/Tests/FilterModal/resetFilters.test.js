import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterModal from '../../homePage/FilterModal';
import { SliderContext } from '../../../context/MapContext';

describe('FilterModal', () => {
  it('resets filters when reset button is pressed and applies them on apply button press', () => {
    const setDistanceFilter = jest.fn();
    const setRatingFilter = jest.fn();
    const setAllergensFilter = jest.fn();
    const updateSortOption = jest.fn();
    const onClose = jest.fn();

    const sliderValue = 10;
    const setSliderValue = jest.fn();

    const { getByTestId } = render(
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

    fireEvent.press(getByTestId('resetButton'));

    expect(setSliderValue).toHaveBeenCalledWith(25);

    fireEvent.press(getByTestId('applyButton'));

    expect(setDistanceFilter).toHaveBeenCalledWith(10);
    expect(setRatingFilter).toHaveBeenCalledWith(0);
    expect(setAllergensFilter).toHaveBeenCalledWith([]);
    expect(updateSortOption).toHaveBeenCalledWith('Date');
    expect(onClose).toHaveBeenCalled();
  });
});
