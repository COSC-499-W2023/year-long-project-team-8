import { getUserData } from '../../helperFunctions/apiHelpers';
import fetchMock from 'fetch-mock';
import { baseEndpoint } from "../../../config/config";

describe('getUserData', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches user data correctly', async () => {
    const mockUserId = '1';
    const mockAuthTokens = { access: 'mockToken' };
    const mockUserData = { id: '1', name: 'Test User' };

    fetchMock.get(`${baseEndpoint}/users/${mockUserId}/`, {
      status: 200,
      body: mockUserData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(mockAuthTokens.access),
      },
    });

    const result = await getUserData(mockUserId, mockAuthTokens);

    expect(fetchMock.called(`${baseEndpoint}/users/${mockUserId}/`)).toBe(true);
    expect(result).toEqual(mockUserData);
  });
});