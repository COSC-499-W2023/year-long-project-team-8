import { isPhoneValid, isNameValid, phoneFormatted } from '../../editProfile/editProfileJSX';

describe('EditProfileForm validation', () => {
  it('validates phone number correctly', () => {
    expect(isPhoneValid('1234567890')).toBe(true);
    expect(isPhoneValid('')).toBe(true);
    expect(isPhoneValid('123456789')).toBe(false);
    expect(isPhoneValid('12345678901')).toBe(false);
  });

  it('validates name correctly', () => {
    expect(isNameValid('John Doe')).toBe(true);
    expect(isNameValid('John')).toBe(true);
    expect(isNameValid('John1')).toBe(false);
    expect(isNameValid('John_Doe')).toBe(false);
  });

  it('formats phone number correctly', () => {
    expect(phoneFormatted('1234567890')).toBe('(123) 456 - 7890');
    expect(phoneFormatted('')).toBe('');
    expect(phoneFormatted('123456789')).toBe('123456789');
  });
});