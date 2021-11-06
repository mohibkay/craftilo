import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ROUTES, guestLoginCred } from "../constants";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Header from "../components/layout/Header";

const override = css`
  display: block;
  margin: 0 auto;
  margin-bottom: 15px;
  border-color: #2ec4b6;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isInvalid = email === "" || password === "" || loading;
  const { signIn } = useAuth();
  const history = useHistory();
  const color = "#2ec4b6";

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await signIn(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleLogin();
  };

  const handleGuestLogin = () => {
    setEmail(guestLoginCred.email);
    setPassword(guestLoginCred.password);
  };

  useEffect(() => {
    document.title = "Login - Craftilo";
  }, []);

  return (
    <>
      <Header />
      <div
        className="flex flex-col md:flex-row space-y-12 md:space-y-0 items-center md:space-x-6 w-screen justify-center"
        style={{ height: "calc(100vh - 52px" }}
      >
        <section className="px-8 md:px-0 -mt-16 md:mt-8 flex">
          <img
            className="w-full md:w-11/12"
            src="/images/hero.svg"
            alt="hero"
          />
        </section>
        <main className="w-11/12 md:w-1/4">
          <div className="w-full shadow-md rounded-md p-8 bg-white border border-gray-primary">
            <form onSubmit={handleSubmit}>
              <header className="flex items-center space-x-2 mb-2">
                <img src="logo.png" alt="" className="w-6" />
                <h1 className="text-2xl font-semibold">Craftilo</h1>
              </header>

              <h2 className="text-xl font-semibold">Login</h2>

              {error && (
                <p className="mt-3 text-md text-red-primary">{error}</p>
              )}

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
                    "Login"
                  )}
                </button>
              </section>
              <hr className="mt-4 border-gray-primary" />
              <p className="text-center mt-2">
                Don't have an account yet?{" "}
                <Link
                  to={ROUTES.SIGN_UP}
                  className="text-primary font-semibold"
                >
                  Sign Up
                </Link>
              </p>
              <p className="text-center mt-0.5">OR</p>
              <button
                onClick={handleGuestLogin}
                className="w-full border py-0.5 focus:outline-none border-primary rounded my-3"
              >
                Guest Login
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
