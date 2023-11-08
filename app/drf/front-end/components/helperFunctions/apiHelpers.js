const baseEndpoint = "http://localhost:8000/api";

async function filterCategory(categories, authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/products/?categories=${categories}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization':'Bearer ' + String(authTokens.access) // add token if authorization is needed to filter
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      // TO DO: do something with the data, e.g., return it or call another function
      return data;
    } else {
      throw new Error('Something went wrong!');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Something went wrong!');
  }
}

async function getUserData(userId, authTokens) {
    try {
      const response = await fetch(`${baseEndpoint}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access) // Use authTokens from the context
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

function renderProducts(data) {
  // Example function to render the products
  // You can customize this based on your needs
  data.forEach(product => {
    console.log('Product Title:', product.title);
    console.log('Product Content:', product.content);
    // Add your rendering logic here (e.g., append to a list or update the DOM)
  });
}

export {
  filterCategory,
  getUserData
};
