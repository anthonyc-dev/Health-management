// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext({});

// export const AuthContextProviderDoctor = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Mock check for user authentication status; replace with real authentication check
//   const checkAuthentication = () => {
//     const userToken = localStorage.getItem("doctorToken");
//     setIsAuthenticated(!!userToken);
//   };

//   const login = () => {
//     // Set user as authenticated (e.g., store token in localStorage)
//     localStorage.setItem("doctorToken", "Doctor_token");
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     // Remove user authentication
//     localStorage.removeItem("doctorToken");
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
