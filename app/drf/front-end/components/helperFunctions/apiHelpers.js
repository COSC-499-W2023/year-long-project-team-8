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

// Helper function for password reset
async function changePassword(email, current_password, new_password, authTokens){
  try {
    const response = await fetch(`${baseEndpoint}/auth/change-password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({ email, current_password, new_password }),
    });

    if (response.ok) {
      console.log('Password changed successful api help');
    } else{
      
      console.error('Error in change password API helper:', response);
    }
  } catch (error) {
    console.error('Network error in change password API helper:', error);
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
        })
      );
    }
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

async function getChatList(authTokens) {
  try {
    const response = await fetch(`${baseEndpoint}/chat/list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    });

    if (!response.ok) {
      console.log('Access token for chat list', authTokens.access);
      throw new Error('Failed to fetch chat list');
    }

    const data = await response.json();
    console.log("Data for getChatList", data);
    //return enrichedChatList;
    return data;
  } catch (error) {
    throw error;
  }
}
//Helper function to get chat messages
async function getChatMessages(authTokens, chatId) {
  console.log(chatId);
  try {
    const response = await fetch(`${baseEndpoint}/chat/${chatId}/`, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Map the chat data to a more suitable format
      const messages = data.map(message => ({
        id: message.id,
        sender: message.sender,
        receiver: message.receiver,
        message: message.message,
        timestamp: message.timestamp,
      }));
      return {
        messages: messages,
        sender: data[0].sender, 
        receiver: data[0].receiver, 
      };   
    } else {
      throw new Error("Error fetching chat messages");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Helper function to send a chat message
async function sendChatMessage(userId, authTokens, newMessage, receiver, product) {
  try {
    const response = await fetch(`${baseEndpoint}/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify({ 
      sender: userId, 
      receiver: receiver, 
      product: product,           
      message: newMessage, }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error sending chat message API");
    }
    } catch (error) {
      console.error("Error:", error);
      throw error;
  }
}
async function getProductById(authTokens, productId) {
  try {
    const response = await fetch(`${baseEndpoint}/products/${productId}/`, {
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
      throw new Error("Unauthorized!");
    } else {
      throw new Error("Something went wrong getting post by id!");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong getting post by id!!");
  }
}

async function updateProfilePicture(userId, authTokens, imageFile) {
  try {
    // Extract the file extension from the URI
    const fileExtension = imageFile.uri.split(".").pop();
    let mimeType = "image/jpeg"; // Default MIME type

    // Determine the MIME type based on the file extension
    switch (fileExtension.toLowerCase()) {
      case "png":
        mimeType = "image/png";
        break;
      case "jpg":
      case "jpeg":
        mimeType = "image/jpeg";
        break;
      case "gif":
        mimeType = "image/gif";
        break;

      // Add more cases for other file types if necessary
    }

    const formData = new FormData();
    formData.append("profile_picture", {
      uri: imageFile.uri,
      type: mimeType, // Set the determined MIME type
      name: `profile_picture_${userId}.${fileExtension}`, // Use the actual file extension
    });

    const response = await fetch(`${baseEndpoint}/users/${userId}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authTokens.access}`,
      },
      body: formData,
    });

    if (response.ok) {
      const userData = await response.json();
      return userData; // Return the updated user data
    } else {
      // Handle non-200 responses
      const errorText = await response.text();
      throw new Error(`Failed to update profile picture: ${errorText}`);
    }
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw new Error("Something went wrong updating Profile Picture!");
  }
}

//TODO: Fix for fetching only products for that user
async function getProductListById(authTokens, userId) {
  try {
    const response = await fetch(`${baseEndpoint}/products/?owner=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    if (response.status === 200) {
      const productData = await response.json();
      console.log("product data:", productData);
      return productData;
    } else {
      // Handle errors
      throw new Error("Failed to fetch user products");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function updateProduct(productData, imageFiles, authTokens, productId) {
  try {
    const formData = new FormData();

    // Append product data as fields in the FormData
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    // Append image files to the FormData
    if (imageFiles) {
      await Promise.all(
        imageFiles.map(async (fileUri, index) => {
          // Check if the URI is a local file URI
          if (fileUri.startsWith('file://')) {
            const uniqueFilename = `image_${index}_${Math.random().toString(36).substring(7)}.jpg`;
            const fileContent = await FileSystem.readAsStringAsync(fileUri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            formData.append('images', {
              uri: fileUri,
              type: 'image/jpeg', 
              name: uniqueFilename,
              data: fileContent, 
            });
          } else {
            // Download the image and get the local URI
            const localUri = await downloadImage(fileUri);
            const uniqueFilename = `image_${index}_${Math.random().toString(36).substring(7)}.jpg`;
            const fileContent = await FileSystem.readAsStringAsync(localUri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            formData.append('images', {
              uri: localUri,
              type: 'image/jpeg', 
              name: uniqueFilename,
              data: fileContent, 
            });
          }
        })
      );
    }

    const response = await fetch(`${baseEndpoint}/products/${productId}/`, {
      method: "PATCH",
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


async function downloadImage(url) {
  try {
    const { uri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + 'downloadedImage.jpg');
    return uri;
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
}


async function deleteProduct(authTokens, productId) {
  try {
    const response = await fetch(`${baseEndpoint}/products/${productId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    if (response.status === 204) {
      console.log("successful delete");
    } else {
      // Handle errors or provide feedback to the user
      const responseBody = await response.text();
      console.error("Error:", responseBody);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong deleting product");
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
  getChatList,
  getChatMessages,
  sendChatMessage,
  getProductListById,
  updateProfilePicture,
  updateProduct,
  deleteProduct,
  getProductById,
  changePassword,
};
