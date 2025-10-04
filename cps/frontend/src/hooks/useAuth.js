import { useAuthContext } from "../providers/AuthProvider.jsx";

export const useAuth = () => {
  return useAuthContext();
};
