import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Article Web</h1>
          <p className="text-blue-600">Admin Access Required</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login to Dashboard
            </button>
          </form>
          
          <div className="text-center text-blue-500 text-sm mt-6">
            Use any credentials for demo
          </div>
        </div>
        
        <div className="text-center text-blue-400 text-sm mt-6">
          © 2024 My Article Web
        </div>
      </div>
    </div>
  );
}