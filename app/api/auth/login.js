// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/FirebaseConfig";
// import { generateToken } from "../../../utils/jwtUtils";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { email, password } = req.body;

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Determine role from Firebase (Firestore, Realtime Database, etc.)
//       const userRole = "admin"; // Example, fetch from Firestore

//       const token = generateToken({ uid: user.uid, role: userRole });

//       res.status(200).json({ token });
//     } catch (error) {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
