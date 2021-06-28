import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ROUTES } from "../constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isInvalid = email === "" || password === "";
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signIn(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Login - Craftilo";
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <main className="md:w-1/4">
        <div className="w-full shadow-md rounded-md p-8 bg-white border border-gray-primary">
          <form onSubmit={handleSubmit}>
            <header className="flex items-center space-x-2 mb-2">
              <img src="logo.png" alt="" className="w-6" />
              <h1 className="text-2xl">Craftilo</h1>
            </header>

            <h2 className="text-xl font-semibold">Login</h2>

            {error && <p className="mt-3 text-md text-red-primary">{error}</p>}

            <section className="flex flex-col">
              <label className="mt-3" htmlFor="email">
                Email
              </label>
              <input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                className="p-1 px-2 mt-1.5 border border-gray-primary rounded focus:outline-none"
                id="email"
                type="email"
              />

              <label className="mt-3" htmlFor="password">
                Password
              </label>
              <input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                className="p-1 px-2 mt-1.5 border border-gray-primary rounded focus:outline-none"
                id="password"
                type="password"
              />

              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-primary rounded text-white px-2.5 py-1 mt-4 focus:outline-none`}
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </section>
          </form>
          <hr className="mt-4 border-gray-primary" />
          <p className="text-center mt-2">
            Don't have an account yet?{" "}
            <Link to={ROUTES.SIGN_UP} className="text-primary font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
