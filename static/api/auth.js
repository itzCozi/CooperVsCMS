import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

export default async function (req, res) {
  const { email, password } = req.body;

  try {
    const auth = getAuth(); // Assuming Firebase is already initialized somewhere else
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    res.json({ success: true, user: userCredential.user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
