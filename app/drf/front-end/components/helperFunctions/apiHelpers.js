/*
This is a helper function script, to help more code more modular.
Note: must import AuthContext into components where you wish to use these functions
      AuthContext stores userId and token data.
*/

import { baseEndpoint } from "../../config/config";
import * as FileSystem from "expo-file-system";
// Helper function to return products filtered on category
// Should be able to pass a list of categories
async function filterCategory(categories, authTokens) {
  try {
    const response = await fetch(
      `${baseEndpoint}/products/?categories=${categories}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access), // add token if authorization is needed to filter
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      // Returns data to caller to be handled, eg(renderProducts() below)
      return data;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong!");
  }
}

// Helper function to get user data with JWT authorization
async function getUserData(userId, authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/users/${userId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    if (response.status === 200) {
      const userData = await response.json();
      return userData; // Return the data to the caller
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong!");
  }
}
// Helper function to retrieve all product listings
async function getProductList(authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    if (response.status === 200) {
      const productData = await response.json();
      return productData; // Return the data to the caller
      // if unauthorized access attempt, logout user
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong!");
  }
}

// Helper function to retrieve all product listings
async function getUserProductList(authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/my-products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    if (response.status === 200) {
      const productData = await response.json();
      return productData; // Return the data to the caller
      // if unauthorized access attempt, logout user
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    } else {
      throw new Error(
        `Something went wrong! File: apiHelpers.js - getUserProductList()`
      );
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong!");
  }
}

// A sample function to handle returned data from API call
function renderProducts(data) {
  // Example function to render the products
  // You can customize this based on your needs
  data.forEach((product) => {
    console.log("Product Title:", product.title);
    console.log("Product Content:", product.content);
    // Add your rendering logic here (e.g., append to a list or update the DOM)
  });
}

//function for updating user data
async function updateUserData(userId, authTokens, updatedData) {
  try {
    const response = await fetch(`${baseEndpoint}/users/${userId}/`, {
      method: "PATCH", // Using PATCH for partial updates
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(updatedData),
    });

    if (response.status === 200) {
      const userData = await response.json();
      return userData; // Return the updated data to the caller
    } else {
      throw new Error(
        `Something went wrong! File: apiHelpers.js - updateUserData()`
      );
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong!");
  }
}

// Helper function to return products based on a keyword search query
async function productSearch(query, authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/products/?search=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access), // add token if authorization is needed to filter
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      // Returns data to caller to be handled, eg(renderProducts() below)
      return data;
    } else {
      throw new Error(
        "Something went wrong! File: apiHelpers.js - productSearch()"
      );
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong!");
  }
}

// currently not supporting images
async function createProduct(productData, authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(productData),
    });

    if (response.status === 200) {
      const data = await response.json();
      // Return the created product data
      return data;
    } else {
      // Handle errors or provide feedback to the user
      const errorData = await response.json();
      console.error("Error:", errorData);
      throw new Error("Failed to create product");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong");
  }
}

// get images from upload
const imageFiles = [
  /* array of File objects */
];

async function createProductImages(productData, imageFiles, authTokens) {
  try {
    const formData = new FormData();

    // Append product data as fields in the FormData
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });
    console.log("in function form Data:", JSON.stringify(formData, null, 2));

    // Append image files to the FormData
    if (imageFiles) {
      await Promise.all(
        imageFiles.map(async (fileUri, index) => {
          // Generate a unique filename using a combination of index and a unique identifier
          const uniqueFilename = `image_${index}_${Math.random()
            .toString(36)
            .substring(7)}.jpg`;
          //const uniqueFilename = `image_${index}.jpg`;

          // Convert local URI to file content
          const fileContent =
            Platform.OS === "ios"
              ? await FileSystem.readAsStringAsync(fileUri, {
                  encoding: FileSystem.EncodingType.Base64,
                })
              : await FileSystem.readAsStringAsync(fileUri, {
                  encoding: FileSystem.EncodingType.UTF8,
                });

          formData.append("images", {
            uri: fileUri,
            type: "image/jpeg", // Adjust the type if needed
            name: uniqueFilename,
            data: fileContent, // Add the file content here
          });

          console.log(`Image ${index} - URI: ${fileUri}`);
          console.log(`Image ${index} - Name: ${uniqueFilename}`);
        })
      );
    }
    console.log("in function form Data:", formData);
    const response = await fetch(`${baseEndpoint}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      // Return the created product data
      return data;
    } else {
      // Handle errors or provide feedback to the user
      const errorData = await response.json();
      console.error("Error:", errorData);
      throw new Error("Failed to create product");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong creating post with images");
  }
}
// Helper function to get chat messages
async function getChatMessages(authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/chat/`, {
      headers: {
        Authorization: `Bearer ${authTokens?.access}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      console.log("AUth data", authTokens)
      throw new Error("Error fetching chat messages");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Helper function to send a chat message
async function sendChatMessage(userId, authTokens, newMessage) {
  try {
    const response = await fetch(`${baseEndpoint}/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify({ 
      sender: userId, 
      receiver: 6,  // 6 is a placeholder
      product: 1,           // 1 is a placeholder product
      message: newMessage, }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error sending chat message");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Export all the functions
export {
  filterCategory,
  getUserData,
  getProductList,
  updateUserData,
  getUserProductList,
  productSearch,
  createProductImages,
  getChatMessages,
  sendChatMessage,
};
