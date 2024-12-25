import { ReactNode } from "react";

export interface LoginForm {
  username: string;
  password: string;
}
export interface AuthContextType {
  saveUserData: () => void;
}

export interface UserList {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  birthDate: string;
  address: Address;
  role: string;
}

export interface Address {
  country: string;
}

//   Context
export interface AuthContextType {
  userData: UserList | null;
  saveUserData: () => void;
}
export interface AuthContextTypeUser {
  userData: UserList | null;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}
