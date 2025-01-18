import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import {
  AuthContextType,
  AuthContextProviderProps,
  UserList,
} from "../Components/Shared/Models/User";

export let AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  
  let [userData, setUserData] = useState<UserList | null>(null);

  let saveUserData = () => {
    const encodedToken = localStorage.getItem("userToken");
    if (encodedToken) {
      const decodedToken = jwtDecode<UserList>(encodedToken);
      setUserData(decodedToken);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ saveUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
