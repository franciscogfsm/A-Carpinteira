import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For security, you should use environment variables for the admin password
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Senha incorreta");
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center font-body">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg border border-brown-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-display font-bold text-brown-900">
            Acesso Administrativo
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-brown-300 placeholder-gray-500 text-brown-800 focus:outline-none focus:ring-green-800 focus:border-green-800 focus:z-10 sm:text-sm bg-cream-50"
              placeholder="Senha"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
