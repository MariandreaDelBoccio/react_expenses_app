import React, { createContext, useState } from "react";
import type { AuthContextType } from "../types/types";
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged, type User } from "firebase/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, changeLoading] = useState(true);

  const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        resolve(user)
      })

      return unsubscribe;
    })
  }

  getCurrentUser().then((user) => {
    setUser(user)
    changeLoading(false)
  })
  

  return (
    <AuthContext.Provider value={{user}}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider};