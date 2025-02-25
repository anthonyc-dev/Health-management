// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "Username" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Replace with your own user authentication logic
//         const { username, password } = credentials;

//         // Mocked users for demo
//         const users = [
//           { id: 1, username: "admin", password: "admin123", role: "admin" },
//           { id: 2, username: "doctor", password: "doctor123", role: "doctor" },
//         ];

//         const user = users.find(
//           (user) => user.username === username && user.password === password
//         );

//         if (user) {
//           return { id: user.id, username: user.username, role: user.role };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//   },
//   secret: "YOUR_SECRET_KEY",
// });
