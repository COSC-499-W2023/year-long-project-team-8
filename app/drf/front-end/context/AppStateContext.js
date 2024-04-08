import { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};

export const AppStateProvider = ({ children }) => {
  const [postCreated, setPostCreated] = useState(false);
  const [profilePicUpdated, setProfilePicUpdated] = useState(false);

  const updatePostCreated = () => {
    setPostCreated((prevPostCreated) => !prevPostCreated);
  };
  const updateProfilePic = () => {
    setProfilePicUpdated((prevPicCreated) => !prevPicCreated);
  };
  const value = {
    postCreated,
    updatePostCreated,
    profilePicUpdated,
    updateProfilePic,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
