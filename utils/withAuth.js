// import { useRouter } from "next/navigation";
// import { verifyToken } from "./jwtUtils";

// const withAuth = (WrappedComponent, requiredRole) => {
//   return (props) => {
//     const router = useRouter();
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push("/login");
//       return null;
//     }

//     const decoded = verifyToken(token);
//     if (!decoded) {
//       router.push("/login");
//       return null;
//     }

//     if (decoded.role !== requiredRole) {
//       router.push("/unauthorized");
//       return null;
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;
