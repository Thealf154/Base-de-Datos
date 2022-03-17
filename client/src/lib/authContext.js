import { createContext, useState } from "react";

export const AuthContext = createContext({
    accessToken: '',
    signin: () => { },
    signout: () => { }
});

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    const signin = (token, callback) => {
        sessionStorage.setItem('accessToken', token);
        setAccessToken(token);
        callback();
    }

    const signout = (callback) => {
        sessionStorage.removeItem('accessToken');
        setAccessToken(null);
        callback();
    }

    const value = { accessToken, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}