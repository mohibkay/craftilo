import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ROUTES } from "../constants";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = css`
  display: block;
  margin: 0 auto;
  margin-bottom: 15px;
  border-color: #2ec4b6;
`;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isInvalid =
    email === "" || password === "" || confirmPassword === "" || loading;
  const { signUp } = useAuth();
  const history = useHistory();
  const color = "#2ec4b6";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setError("Failed to create account");
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Sign Up - Craftilo";
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

            <h2 className="text-xl font-semibold">Sign Up</h2>

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

              <label className="mt-3" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                className="p-1 px-2 mt-1.5 border border-gray-primary rounded focus:outline-none"
                id="confirm-password"
                type="password"
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-primary h-8 rounded text-white px-2.5 py-1 mt-4 focus:outline-none ${
                  isInvalid && "cursor-not-allowed"
                } ${loading && "bg-white border border-primary"}`}
              >
                {loading ? (
                  <PropagateLoader
                    loading={loading}
                    color={color}
                    css={override}
                  />
                ) : (
                  "Sign Up"
                )}
              </button>
            </section>
          </form>
          <hr className="mt-4 border-gray-primary" />
          <p className="text-center mt-2">
            Already signed up?{" "}
            <Link to={ROUTES.LOGIN} className="text-primary font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
