import { distanceBetween } from '../../locationServices/distanceFromUser';

describe('distanceBetween', () => {
  it('should correctly calculate the distance between two points', () => {

    // University of British Columbia
    const userLocation = { latitude: 49.9394, longitude: -119.3948 };

    // Kelowna city hall
    const postLat = 49.8880;
    const postLong = -119.4961;

    const distance = distanceBetween(userLocation, postLat, postLong);

    // within .5 km of accuracy each direction
    expect(distance).toBeGreaterThanOrEqual(8.5);
    expect(distance).toBeLessThanOrEqual(9.5);
  });
});