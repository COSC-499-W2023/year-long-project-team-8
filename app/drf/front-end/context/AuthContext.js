import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { jwtDecode } from "jwt-decode";
import { baseEndpoint } from "../config/config";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const AuthContext = createContext();

// Define parameters for context to hold - also need to add to context data below to persist the data
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);
  const [access, setAccessToken] = useState(null);
  const [refresh, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Persists auth data wherever it is imported and in scope
  const loadAuthData = async () => {
    try {
      const authTokensData = await AsyncStorage.getItem("authTokens");
      if (authTokensData) {
        const authTokensJSON = await JSON.parse(authTokensData);
        const tokenString = JSON.stringify(authTokensData);
        console.log("Token to be saved:", authTokensJSON);
        console.log("Token string:", tokenString);
        setAuthTokens(authTokensJSON);

        // Check if authTokensJSON.access exists before decoding
        if (authTokensJSON.access) {
          const decodedToken = jwtDecode(authTokensJSON.access);
          console.log("decoded token: ", decodedToken);
          const userId = decodedToken.user_id;
          const userEmail = decodedToken.email;
          console.log("User ID:", userId);
          console.log("User email:", userEmail);
          setUserId(userId);
        } else {
          setUserId(null);
        }
      } else {
        setAuthTokens(null);
        setUser(null);
        setUserId(null); // Make sure to reset userId when no tokens are available
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading auth data:", error);
    }
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  // Function to log in user, sets user data
  let loginUser = async (email, password) => {
    let response = await fetch(`${baseEndpoint}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      // Use jwtDecode to decode the access token to extract encrypted user information
      setUserId(jwtDecode(data.access).user_id);
      AsyncStorage.setItem("authTokens", JSON.stringify(data));
      AsyncStorage.setItem("access", JSON.stringify(data.access));
      AsyncStorage.setItem("refresh", JSON.stringify(data.refresh));
    } else {
      alert("Something went wrong!");
    }
  };

  // Function to log out user, removing all user data
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    AsyncStorage.removeItem("authTokens");
    AsyncStorage.removeItem("access");
    AsyncStorage.removeItem("access_token");
    AsyncStorage.removeItem("refresh");
    AsyncStorage.removeItem("user_id");
    // navigation.navigate('Landing');
  };

  // Call to refresh Token endpoint to update the access token
  let updateToken = async () => {
    let response = await fetch(`${baseEndpoint}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${authTokens.refresh}`
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    console.log(
      "Request Payload:",
      JSON.stringify({ refresh: authTokens?.refresh })
    );
    console.log(response);

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access).user_id);
      AsyncStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  // Data held within context, accessible wherever Context is in scope and imported
  let contextData = {
    user: user,
    userId: userId,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  // Update token on a time interval - call to refresh token endpoint and reset access token
  useEffect(() => {
    if (loading) {
      updateToken();
    }

    //let thirtyMin = 1000 * 60 * 30
    let thirtyMin = 1000 * 60 * 3000000;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, thirtyMin);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
