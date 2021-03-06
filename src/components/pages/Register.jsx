import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, Navigate, Link } from "react-router-dom";

export default function Register({ currentAccount, setCurrentAccount }) {
  // This is the state for the controlled form.
  let navi = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [msg, setMsg] = useState("")

  // This event handler handles the submit.
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // The form data is posted to the backend.
      const reqBody = {
        name,
        email,
        password,
      }

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/account/register`,
        reqBody
      )

      // The token is saved in local storage.
      const { token } = response.data
      localStorage.setItem("jwt", token)
      // The token is decoded
      const decoded = jwt_decode(token)
      // The Account is set in App's state to be the decoded token.
      setCurrentAccount(decoded)
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

  // A navigate component is conditionally rendered.
  // If the current account is valid, the details page is rendered.
  if (currentAccount) {
    return <Navigate to="/details" />
  }

  return (
    <main>
      <div>
        <h1 className="text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white pt-32 h-48">
          Create Account
        </h1>
        <p className="text-white tracking-tight leading-6 text-2xl pt-10">
          Enter your Organization Name, Email, and Password to sign up.
          <Link to="/login" className="text-blue-900 hover:text-white">
            {"  "}
            Already have an account with us?
          </Link>
        </p>
        <p className="text-white tracking-tight leading-6 text-2xl">{msg}</p>

        <form onSubmit={handleSubmit}>
          <div className="pt-16 h-24">
            <label htmlFor="name"></label>
            <input
              className="rounded-full font-semibold shadow-lg shadow-indigo-500/40 text-blue-500"
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Organization Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br></br>
          <div className="pt-10 h-22">
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
          <br></br>
          <div className="pt-7 h-20">
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
          <br></br>

          <h1 className="text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white p-8">
            Are you ready to take on today's challenges with excitement?
          </h1>

          <button
            type="submit"
            className=" text-white p-0 font-semibold rounded-full p-2.5 shadow-lg shadow-indigo-500/40 hover:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out bg-gradient-to-r from-blue-600 to-blue-800 hover:from-pink-400 hover:to-yellow-400"
          >
            Register
          </button>

          <h1 className="p-20"></h1>
        </form>
      </div>
    </main>
  )
}
