import { createContext, useState } from "react";
import { AuthContextType } from "../types/types";

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const sessionStorageToken = sessionStorage.getItem("accessToken")
    ? sessionStorage.getItem("accessToken")
    : null;
  const [accessToken, setAccessToken] = useState<string | null>(sessionStorageToken);

  const signin = (token: string, callback: VoidFunction) => {
    sessionStorage.setItem("accessToken", token);
    setAccessToken(token);
    callback();
  };

  const signout = (callback: VoidFunction) => {
    sessionStorage.removeItem("accessToken");
    setAccessToken(null);
    callback();
  };

  const value = { accessToken, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
