import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Navigate, Link } from "react-router-dom";

export default function Login({ currentAccount, setCurrentAccount }) {
  // state for the controlled form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // post form data to the backend
      const reqBody = {
        email,
        password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/account/login`,
        reqBody
      );

      // save the token in localstorage
      const { token } = response.data;
      localStorage.setItem("jwt", token);
      // decode the token
      const decoded = jwt_decode(token);
      // set the Account in App's state to be the decoded token
      setCurrentAccount(decoded);
    } catch (err) {
      console.warn(err);
      if (err.response) {
        if (err.response.status === 400) {
          setMsg(err.response.data.msg);
        }
      }
    }
  };

  // conditionally render a navigate component
  if (currentAccount) {
    return <Navigate to="/details" />;
  }

  return (
      <main>
          <div>
            <h1 className="text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white pt-40">
              Welcome Back!
            </h1>
            <p className="text-white tracking-tight leading-6 text-2xl p-8">
              Login to your Account
            </p>
            <p> {msg}</p>
            <form onSubmit={handleSubmit}>
              <div className="pt-10 h-24">
                <label htmlFor="email"></label>
                <input
                  className="rounded-full font-semibold shadow-lg shadow-indigo-500/40 text-blue-500"
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="pt-6 h-24">
                <label htmlFor="password"></label>
                <input
                  className="rounded-full font-semibold shadow-lg shadow-indigo-500/40 text-blue-500"
                  type="text"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="pt-10 h-24">
                <button
                  type="submit"
                  className="hover:bg-white hover:text-blue-500 text-white p-0 font-semibold dark:text-white rounded-full p-3 bg-blue-600 shadow-lg shadow-indigo-500/40 w-48 hover:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out"
                >
                  {" "}
                  Login{" "}
                </button>
              </div>

              <p className="text-white tracking-tight leading-6 text-2xl pt-16 h-24">
                Don't have an account yet? No worries!
                <Link to="/register" className="text-blue-800 hover:text-white">
                  {"  "}
                  Become a member.
                </Link>
              </p>

              <h1 className="p-40"></h1>
            </form>
          </div>
        </main>
    )
}
