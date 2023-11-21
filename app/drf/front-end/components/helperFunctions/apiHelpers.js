/*
This is a helper function script, to help more code more modular.
Note: must import AuthContext into components where you wish to use these functions
      AuthContext stores userId and token data.
*/


import { baseEndpoint } from '../../config/config';

// Helper function to return products filtered on category
// Should be able to pass a list of categories
async function filterCategory(categories, authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/products/?categories=${categories}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + String(authTokens.access) // add token if authorization is needed to filter
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      // Returns data to caller to be handled, eg(renderProducts() below)
      return data;
    } else {
      throw new Error('Something went wrong!');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Something went wrong!');
  }
}

// Helper function to get user data with JWT authorization
async function getUserData(userId, authTokens) {
    try {
      const response = await fetch(`${baseEndpoint}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access) 
        },
      });
  
      if (response.status === 200) {
        const userData = await response.json();
        return userData; // Return the data to the caller
      } else {
        throw new Error('Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Something went wrong!');
    }
  }

  // Helper function to retrieve all product listings
  async function getProductList (authTokens) {
    try {
      const response = await fetch(`${baseEndpoint}/products/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access) 
        },
      });
  
      if (response.status === 200) {
        const productData = await response.json();
        return productData; // Return the data to the caller
        // if unauthorized access attempt, logout user
      }else if(response.statusText === 'Unauthorized'){
        logoutUser() 
      }else {
        throw new Error('Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Something went wrong!');
    }
  }

// Helper function to retrieve all product listings
async function getUserProductList (authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/my-products/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access) 
      },
    });

    if (response.status === 200) {
      const productData = await response.json();
      return productData; // Return the data to the caller
      // if unauthorized access attempt, logout user
    }else if(response.statusText === 'Unauthorized'){
      logoutUser() 
    }else {
      throw new Error('Something went wrong!');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Something went wrong!');
  }
}

// A sample function to handle returned data from API call
function renderProducts(data) {
// Example function to render the products
// You can customize this based on your needs
data.forEach(product => {
  console.log('Product Title:', product.title);
  console.log('Product Content:', product.content);
  // Add your rendering logic here (e.g., append to a list or update the DOM)
});
}

//function for updating user data
async function updateUserData(userId, authTokens, updatedData) {
  try {
    
    const response = await fetch(`${baseEndpoint}/users/${userId}/`, {
      method: 'PATCH', // Using PATCH for partial updates
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
      body: JSON.stringify(updatedData),
    });

    if (response.status === 200) {
      const userData = await response.json();
      return userData; // Return the updated data to the caller
    } else {
      throw new Error('Something went wrong!');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Something went wrong!');
  }
}

// Export all the functions
export {
  filterCategory,
  getUserData,
  getProductList,
  updateUserData,
  getUserProductList,

};
