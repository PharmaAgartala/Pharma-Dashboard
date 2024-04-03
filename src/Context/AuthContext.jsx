import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const authValue = localStorage.getItem("auth");
        return authValue ? JSON.parse(authValue) : false;
    });

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]); 

    return (
        <AppContext.Provider value={{ auth, setAuth }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
