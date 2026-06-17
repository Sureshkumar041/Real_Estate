import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userDetail, setUserDetail] = useState(null);

    return (
        <AuthContext.Provider
            value={{ userDetail, setUserDetail }}
        >
            {children}
        </AuthContext.Provider>
    );
};

