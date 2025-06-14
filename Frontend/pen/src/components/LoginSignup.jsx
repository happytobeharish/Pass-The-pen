import { useState } from "react";
import { login, signup } from "../Api/authApi.";
import { useAuth } from "../context/AuthContext";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: doLogin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault(); 
    const payload = { username, password };
    const data = isLogin ? await login(payload) : await signup(payload);
    doLogin(data);
    setUsername("");
    setPassword("");
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full border mb-2 p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border mb-2 p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 mt-2"
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </button>
    </div>
  );
}