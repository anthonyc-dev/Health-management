// "use client";

// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const username = e.target.username.value;
//     const password = e.target.password.value;

//     await signIn("credentials", {
//       username,
//       password,
//       redirect: true,
//       callbackUrl: username === "admin" ? "/adminSide" : "/doctorSide",
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input type="text" name="username" />
//       </label>
//       <label>
//         Password:
//         <input type="password" name="password" />
//       </label>
//       <button type="submit">Log in</button>
//     </form>
//   );
// }
