// UserContext.js
import React, { createContext, useState } from "react";

// Create Context Object
export const UserContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const UserContextProvider = props => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
