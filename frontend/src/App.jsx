import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RagChatInterface from "./components/RagChatInterface";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [view, setView] = useState("login"); // "login" | "signup"

  function handleLogin(userData, authToken) {
    setUser(userData);
    setToken(authToken);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  if (!user) {  
    return view === "login" ? (
      <Login onLogin={handleLogin} switchToSignup={() => setView("signup")} />
    ) : (
      <Signup onLogin={handleLogin} switchToLogin={() => setView("login")} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <RagChatInterface user={user} token={token} onLogout={handleLogout} />
    </div>
  );
}
