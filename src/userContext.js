import { createContext, useContext, useState } from "react";

const init = {
  name: "Nish",
  age: 24,
};

export const userContext = createContext(init);

export function useContextCustom() {
  return useContext(userContext);
}

const UserProvider = ({ children }) => {
  const [data, setData] = useState(init);
  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export default UserProvider;
// Create a User Context in react application, which is a module (in a separate file) and exposes two things,
// 1. An context component
// 2. A useContext hook for that context, which is kind of context aware, If it is used in any part of the application, 
//    which is not inside the provider. It should throw errors while developing only.
