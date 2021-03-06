import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, Navigate, Link } from "react-router-dom";

export default function Login({
  currentAccount,
  setCurrentAccount,
  setProfiles,
  setTasks,
}) {
  let navi = useNavigate()
  // This is the state for the controlled form
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  // This event handler controls the submit functonality.
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // The form data s posted to the backend.
      const reqBody = {
        email,
        password,
      }
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/account/login`,
        reqBody
      )

      // The token is saved in localstorage.
      const { token } = response.data
      localStorage.setItem("jwt", token)
      // The token is decoded.
      const decoded = jwt_decode(token)
      // The Account is set in App's state to be the decoded token.
      setCurrentAccount(decoded)
      const options = {
        headers: {
          Authorization: token,
        },
      }
      axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/account/${decoded.id}`,options)
        .then((response) => {
          setProfiles(response.data.profiles)
          setTasks(response.data.tasks)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setMsg(err.response.data.msg)
        } else {
          navi("/notfound", { replace: true })
        }
      }
    }
  }

  // A navigate component is conditionally rendered if the current account is valid.
  if (currentAccount) {
    return <Navigate to="/profileselection" />
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

          <div className="pt-6 h-20">
            <label htmlFor="password"></label>
            <input
              className="rounded-full font-semibold shadow-lg shadow-indigo-500/40 text-blue-500"
              type="password"
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
              className="text-white p-0 font-semibold dark:text-white rounded-full p-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-pink-400 hover:to-yellow-400 shadow-lg shadow-indigo-500/40 w-48 hover:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out"
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
