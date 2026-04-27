// context/UserContext.jsx
import { createContext, useEffect, useState } from "react";
import { fetchContextData } from '../utils.js'

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userVars, setUserVars] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      console.log("UserContext: acquiring user id")
      let id = localStorage.getItem("pseudo_user_id");
      const userContextData = await fetchContextData(id);
      
      console.log("UserContext:", userContextData)
      setUserVars(userContextData)
    }
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider value={userVars}>
      {children}
    </UserContext.Provider>
  );
}
