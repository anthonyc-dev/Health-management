// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext({});

// export const AuthContextProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Mock check for user authentication status; replace with real authentication check
//   const checkAuthentication = () => {
//     const userToken = localStorage.getItem("userToken");
//     setIsAuthenticated(!!userToken);
//   };

//   const login = () => {
//     // Set user as authenticated (e.g., store token in localStorage)
//     localStorage.setItem("userToken", "your_token_here");
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     // Remove user authentication
//     localStorage.removeItem("userToken");
//     setIsAuthenticated(false);
//   };

//   useEffect(() => {
//     checkAuthentication();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
