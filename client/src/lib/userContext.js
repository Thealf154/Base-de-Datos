import { createContext } from "react";

export const UserContext = createContext({
    username: '',
    address: '',
    role: '',
    phone: '',
    setUserName: () => {},
    setRole: () => {},
    setPhone: () => {},
    setAdress: () => {}
});