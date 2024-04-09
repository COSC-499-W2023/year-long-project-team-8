import { calculateTimeRemaining } from '../../savedPosts/Item';

describe('calculateTimeRemaining', () => {
  it('calculates time remaining correctly', () => {
    const mockExpiryDate = new Date();
    mockExpiryDate.setHours(mockExpiryDate.getHours() + 1);

    const result = calculateTimeRemaining(mockExpiryDate);

    expect(result).toEqual('59 minutes remaining');
  });
});

describe('calculateTimeRemaining', () => {
  it('calculates time remaining correctly', () => {
    const mockExpiryDate = new Date();
    mockExpiryDate.setHours(mockExpiryDate.getHours());

    const result = calculateTimeRemaining(mockExpiryDate);

    expect(result).toEqual('Expired');
  });
});

describe('calculateTimeRemaining', () => {
  it('calculates time remaining correctly', () => {
    const mockExpiryDate = new Date();
    mockExpiryDate.setHours(mockExpiryDate.getHours() + 24);

    const result = calculateTimeRemaining(mockExpiryDate);

    expect(result).toEqual('1 day remaining');
  });
});