import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import {
  AuthContextProviderProps,
  AuthContextType,
  User,
} from "../Shared/Models/User";

export let AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  let [userData, setUserData] = useState<User | null>(null);
  let saveUserData = () => {
    const encodedToken = localStorage.getItem("userToken");
    if (encodedToken) {
      const decodedToken = jwtDecode<User>(encodedToken);
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
