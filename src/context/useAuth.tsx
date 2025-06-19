import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Hook
const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;